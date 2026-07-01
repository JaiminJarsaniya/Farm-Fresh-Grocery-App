
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { removeFromCart, updateQuantity, clearCart } from "@/store/slices/cartSlice";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/hooks/useAuth";

const Cart = () => {
  const { items, total } = useSelector((state: RootState) => state.cart);
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [promoCode, setPromoCode] = useState("");
  const [isPromoValid, setIsPromoValid] = useState(false);
  const [discount, setDiscount] = useState(0);

  const handleRemoveFromCart = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ productId, quantity: newQuantity }));
    }
  };

  const handleApplyPromoCode = () => {
    // In a real application, this would validate the promo code with an API
    if (promoCode.toLowerCase() === "fresh10") {
      const discountAmount = total * 0.1; // 10% discount
      setDiscount(discountAmount);
      setIsPromoValid(true);
      toast.success("Promo code applied successfully!");
    } else {
      setIsPromoValid(false);
      toast.error("Invalid promo code");
    }
  };

  const handleClearCart = () => {
    if (confirm("Are you sure you want to clear your cart?")) {
      dispatch(clearCart());
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to proceed to checkout");
      navigate("/login?redirect=checkout");
    } else {
      // In a real app, this would navigate to a checkout page
      navigate("/checkout");
    }
  };

  // Calculate shipping cost (free over $50)
  const shippingCost = total > 50 ? 0 : 5.99;
  
  // Calculate final total
  const finalTotal = total + shippingCost - discount;

  return (
    <Layout>
      <SectionHeading title="Your Shopping Cart" />

      {items.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left py-4 px-2">Product</th>
                    <th className="text-right py-4 px-2">Price</th>
                    <th className="text-center py-4 px-2">Quantity</th>
                    <th className="text-right py-4 px-2">Subtotal</th>
                    <th className="py-4 px-2"><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.productId} className="border-b">
                      <td className="py-4 px-2">
                        <div className="flex items-center">
                          <Link to={`/products/${item.productId}`} className="w-16 h-16 rounded overflow-hidden mr-4 flex-shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </Link>
                          <Link to={`/products/${item.productId}`} className="hover:text-primary">
                            {item.name}
                          </Link>
                        </div>
                      </td>
                      <td className="py-4 px-2 text-right">${item.price.toFixed(2)}</td>
                      <td className="py-4 px-2">
                        <div className="flex items-center justify-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="mx-3">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                      <td className="py-4 px-2 text-right font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="py-4 px-2 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveFromCart(item.productId)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => navigate("/products")}>
                Continue Shopping
              </Button>
              <Button variant="outline" onClick={handleClearCart}>
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-medium mb-4">Order Summary</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>
                  {shippingCost === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `$${shippingCost.toFixed(2)}`
                  )}
                </span>
              </div>
              {isPromoValid && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex justify-between text-lg font-semibold mb-6">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
            
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <Button variant="outline" onClick={handleApplyPromoCode}>Apply</Button>
            </div>
            
            {isPromoValid && (
              <div className="bg-green-50 text-green-700 p-3 rounded-md mb-4 text-sm">
                Promo code applied successfully!
              </div>
            )}
            
            <Button 
              className="w-full"
              onClick={handleCheckout}
              disabled={items.length === 0}
            >
              Proceed to Checkout
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>We accept various payment methods including credit cards, PayPal, and Apple Pay.</p>
              <p className="mt-2">Free shipping on orders over $50.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-block p-6 bg-primary/10 rounded-full mb-6">
            <ShoppingCart className="h-12 w-12 text-primary" />
          </div>
          <h3 className="text-2xl font-medium mb-2">Your cart is empty</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Looks like you haven't added any products to your cart yet. 
            Start shopping to fill it with delicious items!
          </p>
          <Button onClick={() => navigate("/products")}>
            Browse Products
          </Button>
        </div>
      )}
    </Layout>
  );
};

export default Cart;
