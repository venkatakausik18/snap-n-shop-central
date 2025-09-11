import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import Layout from "@/components/Layout";
import Breadcrumb from "@/components/Breadcrumb";
import { toast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/useCart";

const Cart = () => {
  const { cartItems, loading, cartTotal, cartItemCount, updateCartItemQuantity, removeFromCart } = useCart();
  const [couponCode, setCouponCode] = useState("");

  const breadcrumbItems = [
    { label: "Shopping Cart" }
  ];

  const deliveryFee = cartTotal > 49900 ? 0 : 99;
  const total = cartTotal + deliveryFee;

  const applyCoupon = () => {
    if (couponCode === "SAVE10") {
      toast({
        title: "Coupon applied!",
        description: "You saved ₹500 with coupon code SAVE10.",
      });
    } else {
      toast({
        title: "Invalid coupon",
        description: "Please check your coupon code and try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading your cart...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center max-w-md mx-auto">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button asChild className="btn-brand">
              <Link to="/products">
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">Shopping Cart</h1>
              <span className="text-muted-foreground">
                {cartItemCount} item{cartItemCount !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={item.product?.images?.[0] || '/placeholder.svg'}
                        alt={item.product?.title || 'Product'}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1 space-y-2">
                        <Link 
                          to={`/product/${item.product_id}`}
                          className="text-lg font-medium hover:text-primary transition-colors line-clamp-2"
                        >
                          {item.product?.title || 'Product'}
                        </Link>
                        
                        {(item.selected_variant || item.selected_color || item.selected_size) && (
                          <div className="text-sm text-muted-foreground space-y-1">
                            {item.selected_variant && <p>Variant: {item.selected_variant}</p>}
                            {item.selected_color && <p>Color: {item.selected_color}</p>}
                            {item.selected_size && <p>Size: {item.selected_size}</p>}
                          </div>
                        )}
                        
                        <p className="text-sm text-muted-foreground">
                          Sold by: {item.product?.brand || 'snapNshop'}
                        </p>
                        
                        <div className="flex items-center space-x-3">
                          <span className="text-lg font-bold">
                            ₹{item.price.toLocaleString()}
                          </span>
                        </div>

                        <span className="text-sm text-success font-medium">
                          {(item.product?.stock_quantity || 0) > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>

                      <div className="flex flex-col items-end space-y-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center border rounded-lg">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="px-4 py-2 text-center min-w-[3rem]">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Coupon Code */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Coupon Code</label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <Button variant="outline" onClick={applyCoupon}>
                      Apply
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItemCount} items)</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>
                      {deliveryFee === 0 ? (
                        <span className="text-success">FREE</span>
                      ) : (
                        `₹${deliveryFee}`
                      )}
                    </span>
                  </div>
                  
                  {deliveryFee > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Add ₹{(49900 - cartTotal).toLocaleString()} more for FREE delivery
                    </p>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>

                <Button asChild size="lg" className="w-full btn-brand">
                  <Link to="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button asChild variant="outline" size="lg" className="w-full">
                  <Link to="/products">
                    Continue Shopping
                  </Link>
                </Button>

                {/* Trust Indicators */}
                <div className="pt-4 space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <span>✓</span>
                    <span>Secure checkout with SSL encryption</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>✓</span>
                    <span>Easy returns within 7 days</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>✓</span>
                    <span>100% authentic products</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;