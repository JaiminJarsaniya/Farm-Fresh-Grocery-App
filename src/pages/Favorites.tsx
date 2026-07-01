
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { removeFromFavorites } from '@/store/slices/favoriteSlice';
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Heart, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Link } from 'react-router-dom';

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);

  const handleRemove = (productId: number) => {
    dispatch(removeFromFavorites(productId));
    toast.success("Removed from favorites");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Favorites</h1>

        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-medium mb-2">No favorites yet</h2>
            <p className="text-muted-foreground mb-6">Start adding some products to your favorites!</p>
            <Button asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Link to={`/products/${product.id}`}>
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-48 object-cover"
                  />
                </Link>
                <div className="p-4">
                  <Link to={`/products/${product.id}`}>
                    <h3 className="font-medium mb-2">{product.name}</h3>
                  </Link>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-semibold">
                      ${(product.discountedPrice || product.price).toFixed(2)}
                    </span>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleRemove(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Favorites;
