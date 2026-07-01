
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "@/lib/types";
import { addToCart } from "@/store/slices/cartSlice";
import { addToFavorites, removeFromFavorites } from "@/store/slices/favoriteSlice";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { RootState } from "@/store";
import { toast } from "@/components/ui/sonner";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const isFavorite = favorites.some(item => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    dispatch(
      addToCart({
        productId: product.id,
        quantity: 1,
        name: product.name,
        price: product.discountedPrice || product.price,
        image: product.images[0],
      })
    );
    toast.success("Added to cart");
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
      toast.success("Removed from favorites");
    } else {
      dispatch(addToFavorites(product));
      toast.success("Added to favorites");
    }
  };

  const discountPercentage = product.discountedPrice 
    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100) 
    : 0;

  return (
    <div 
      className={cn(
        "group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 card-hover",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {discountPercentage > 0 && (
            <Badge className="absolute top-3 left-3 bg-destructive hover:bg-destructive">
              Save {discountPercentage}%
            </Badge>
          )}

          <div className={cn(
            "absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 transition-opacity",
            isHovered ? "opacity-100" : "opacity-0"
          )}>
            <div className="flex gap-2">
              <Button 
                onClick={handleAddToCart}
                className="bg-white text-primary hover:bg-primary hover:text-white"
              >
                Add to Cart
                <ShoppingCart className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline"
                size="icon"
                onClick={handleToggleFavorite}
                className={cn(
                  "bg-white",
                  isFavorite && "text-red-500 hover:text-red-600"
                )}
              >
                <Heart className={cn("h-5 w-5", isFavorite && "fill-current")} />
              </Button>
            </div>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-poppins font-medium text-base mb-1 line-clamp-1">{product.name}</h3>
          
          <div className="flex items-center space-x-1 mb-2">
            {Array(5).fill(0).map((_, i) => (
              <svg 
                key={i} 
                className={cn(
                  "h-4 w-4", 
                  i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"
                )}
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-xs text-muted-foreground">({product.reviews.length})</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {product.discountedPrice ? (
                <>
                  <span className="font-semibold text-primary">
                    ${product.discountedPrice.toFixed(2)}
                  </span>
                  <span className="ml-2 text-sm text-muted-foreground line-through">
                    ${product.price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="font-semibold text-primary">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
            <button 
              className={cn(
                "text-muted-foreground transition-colors",
                isFavorite ? "text-red-500 hover:text-red-600" : "hover:text-primary"
              )}
              onClick={(e) => {
                e.preventDefault();
                handleToggleFavorite(e);
              }}
            >
              <Heart className={cn("h-5 w-5", isFavorite && "fill-current")} />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
