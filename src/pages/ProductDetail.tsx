
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { products } from "@/lib/data";
import ProductCard from "@/components/shared/ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Heart, Share2, CheckCircle, Star } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import NotFound from "./NotFound";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  
  const product = products.find(p => p.id === Number(id));
  
  // Find related products (same category)
  const relatedProducts = product 
    ? products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
    : [];

  useEffect(() => {
    // Reset state when product changes
    if (product) {
      setQuantity(1);
      setActiveImage(0);
    }
    
    // Scroll to top when navigating to a new product
    window.scrollTo(0, 0);
  }, [product]);

  if (!product) {
    return <NotFound />;
  }

  const handleAddToCart = () => {
    setIsAdding(true);
    
    // Simulate API delay
    setTimeout(() => {
      dispatch(addToCart({
        productId: product.id,
        name: product.name,
        price: product.discountedPrice || product.price,
        quantity,
        image: product.images[0],
      }));
      
      setIsAdding(false);
    }, 500);
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    } else {
      toast.error(`Sorry, only ${product.stock} items are available`);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleWishlist = () => {
    toast.success("Added to wishlist");
  };

  const handleShare = () => {
    // In a real app, this would open a share dialog
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  };

  return (
    <Layout>
      <div className="mb-6">
        <Link to="/products" className="text-sm text-muted-foreground hover:text-primary">
          ← Back to Products
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product.images[activeImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`w-20 h-20 rounded-md overflow-hidden border-2 ${
                    activeImage === index ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex gap-0.5 mr-2">
              {Array(5).fill(0).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.round(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.reviews.length} reviews)
            </span>
          </div>
          
          <div className="mb-4">
            {product.discountedPrice ? (
              <div className="flex items-center gap-2">
                <span className="text-2xl font-semibold text-primary">
                  ${product.discountedPrice.toFixed(2)}
                </span>
                <span className="text-lg text-muted-foreground line-through">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-2xl font-semibold text-primary">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          
          <Separator className="my-6" />
          
          <div className="prose max-w-none mb-6">
            <p className="text-gray-600">{product.description}</p>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <span className="w-24 text-sm text-muted-foreground">Category:</span>
              <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="text-sm hover:text-primary">
                {product.category}
              </Link>
            </div>
            {product.tags.length > 0 && (
              <div className="flex items-center">
                <span className="w-24 text-sm text-muted-foreground">Tags:</span>
                <div className="flex gap-2 flex-wrap">
                  {product.tags.map((tag, index) => (
                    <Link
                      key={index}
                      to={`/products?tag=${encodeURIComponent(tag)}`}
                      className="text-xs px-2 py-1 bg-gray-100 rounded-full hover:bg-gray-200"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <Separator className="my-6" />
          
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={decrementQuantity}
                disabled={quantity === 1}
              >
                -
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={incrementQuantity}
                disabled={quantity >= product.stock}
              >
                +
              </Button>
            </div>
            
            <Button 
              onClick={handleAddToCart} 
              className="flex-1"
              disabled={isAdding || product.stock === 0}
            >
              {isAdding ? (
                "Adding..."
              ) : product.stock === 0 ? (
                "Out of Stock"
              ) : (
                <>
                  Add to Cart <ShoppingCart className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
            
            <Button variant="outline" size="icon" onClick={handleWishlist}>
              <Heart className="h-5 w-5" />
            </Button>
            
            <Button variant="outline" size="icon" onClick={handleShare}>
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
          
          {product.stock > 0 ? (
            <div className="flex items-center text-sm text-green-600">
              <CheckCircle className="h-4 w-4 mr-1" />
              <span>In stock ({product.stock} available)</span>
            </div>
          ) : (
            <div className="flex items-center text-sm text-red-600">
              <span>Out of stock</span>
            </div>
          )}
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="details">
          <TabsList className="mb-6">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviews.length})</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details">
            <div className="prose max-w-none">
              <h3>Product Description</h3>
              <p>{product.description}</p>
              
              <h3 className="mt-6">Benefits</h3>
              <ul>
                {product.category === "Fresh Fruits" && (
                  <>
                    <li>Rich in essential vitamins and minerals</li>
                    <li>Natural source of dietary fiber</li>
                    <li>Harvested at peak ripeness for maximum flavor</li>
                    <li>No added preservatives or chemicals</li>
                  </>
                )}
                
                {product.category === "Fresh Vegetables" && (
                  <>
                    <li>Organic and locally sourced when possible</li>
                    <li>Excellent source of vital nutrients</li>
                    <li>Harvested at the peak of freshness</li>
                    <li>Sustainably grown with eco-friendly practices</li>
                  </>
                )}
                
                {product.category === "Dry Fruits" && (
                  <>
                    <li>Natural energy boosters</li>
                    <li>Rich in antioxidants and essential nutrients</li>
                    <li>No added sugars or preservatives</li>
                    <li>Carefully selected and quality assured</li>
                  </>
                )}
                
                {product.category === "Snacks" && (
                  <>
                    <li>Made with wholesome ingredients</li>
                    <li>Perfect for on-the-go healthy eating</li>
                    <li>Minimal processing to preserve nutrients</li>
                    <li>Responsibly sourced ingredients</li>
                  </>
                )}
              </ul>
              
              <h3 className="mt-6">Storage Instructions</h3>
              {product.category === "Fresh Fruits" && (
                <p>Store most fruits in the refrigerator to maintain freshness. Some fruits like bananas, stone fruits, and tomatoes are best kept at room temperature until ripe.</p>
              )}
              
              {product.category === "Fresh Vegetables" && (
                <p>Most vegetables stay fresh longest when stored in the refrigerator. Keep in the crisper drawer for optimal humidity levels and longevity.</p>
              )}
              
              {product.category === "Dry Fruits" && (
                <p>Store in an airtight container in a cool, dry place. For extended freshness, refrigeration is recommended.</p>
              )}
              
              {product.category === "Snacks" && (
                <p>Store in a cool, dry place away from direct sunlight. Once opened, seal tightly to maintain freshness.</p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="reviews">
            {product.reviews.length > 0 ? (
              <div className="space-y-6">
                {product.reviews.map((review) => (
                  <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium mr-3">
                          {review.userName.charAt(0)}
                        </div>
                        <span className="font-medium">{review.userName}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="flex gap-0.5 mr-2">
                          {Array(5).fill(0).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="shipping">
            <div className="prose max-w-none">
              <h3>Shipping Information</h3>
              <p>We ship all products within 24 hours of order confirmation (excluding weekends and holidays). Delivery times vary depending on your location:</p>
              <ul>
                <li>Local deliveries: 1-2 business days</li>
                <li>Regional deliveries: 2-3 business days</li>
                <li>National deliveries: 3-5 business days</li>
              </ul>
              
              <h3 className="mt-6">Return Policy</h3>
              <p>We stand behind our products and want you to be completely satisfied with your purchase. If you're not happy with any product for any reason, please contact our customer service team within 24 hours of receiving your delivery.</p>
              <p>For fresh produce:</p>
              <ul>
                <li>If any fresh produce arrives damaged or below our quality standards, we'll refund your purchase or replace the item in your next order.</li>
                <li>Photo evidence of the product quality issue may be required.</li>
              </ul>
              <p>For packaged products:</p>
              <ul>
                <li>Unopened packaged products may be returned within 30 days of purchase.</li>
                <li>If a packaged product is defective or damaged on arrival, we'll provide a full refund or replacement.</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <SectionHeading title="You might also like" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProductDetail;
