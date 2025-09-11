import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Heart, Share2, ShoppingCart, Truck, Shield, RotateCcw, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import Breadcrumb from "@/components/Breadcrumb";
import { toast } from "@/hooks/use-toast";
import { useProduct, useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState("");
  const { addToCart } = useCart();

  // Get product by ID using Supabase
  const { product, loading, error } = useProduct(id || '');
  
  // Get related products
  const { products: relatedProducts } = useProducts({
    category: product?.category.slug,
    subcategory: product?.subcategory?.slug
  });

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading product...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild className="btn-brand">
              <Link to="/products">Browse All Products</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const discount = product.original_price 
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  const breadcrumbItems = [
    { label: product.category.name, href: `/category/${product.category.slug}` },
    ...(product.subcategory ? [{ label: product.subcategory.name, href: `/category/${product.category.slug}` }] : []),
    { label: product.title }
  ];

  // Filter related products (exclude current product)
  const filteredRelatedProducts = relatedProducts
    .filter(p => p.id !== product.id)
    .slice(0, 3);

  // Set initial variant if product has variants
  useEffect(() => {
    if (product?.variants && product.variants.length > 0 && !selectedVariant) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product, selectedVariant]);

  const handleAddToCart = () => {
    if (!product) return;

    const options = {
      selectedVariant: product.variants ? selectedVariant : undefined,
      selectedColor: product.colors && product.colors.length > 0 ? product.colors[0] : undefined,
      selectedSize: product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined,
    };

    addToCart(product.id, product.price, quantity, options);
  };

  const handleAddToWishlist = () => {
    toast({
      title: "Added to wishlist!",
      description: `${product.title} has been added to your wishlist.`,
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg border">
              <img
                src={product.images ? product.images[selectedImage] : (product.images?.[0] || '/placeholder.svg')}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg border-2 overflow-hidden ${
                      selectedImage === index ? 'border-primary' : 'border-border'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              {product.is_bestseller && (
                <Badge className="bg-success text-success-foreground mb-2">
                  Bestseller
                </Badge>
              )}
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 font-medium">{product.rating}</span>
                </div>
                <span className="text-muted-foreground">
                  ({product.review_count?.toLocaleString() || 0} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.original_price && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ₹{product.original_price.toLocaleString()}
                    </span>
                    <Badge className="bg-secondary text-secondary-foreground">
                      {discount}% OFF
                    </Badge>
                  </>
                )}
              </div>
              {product.original_price && (
                <p className="text-sm text-success font-medium">
                  You save ₹{(product.original_price - product.price).toLocaleString()}
                </p>
              )}
            </div>

            {/* Variants */}
            {(product.variants || product.colors) && (
              <div className="space-y-4">
                {product.variants && (
                  <div>
                    <h3 className="font-semibold mb-2">Variants</h3>
                    <div className="flex space-x-2 flex-wrap">
                      {product.variants.map((variant) => (
                        <Button
                          key={variant}
                          variant={selectedVariant === variant ? "default" : "outline"}
                          onClick={() => setSelectedVariant(variant)}
                          className="px-4 mb-2"
                        >
                          {variant}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {product.colors && (
                  <div>
                    <h3 className="font-semibold mb-2">Color</h3>
                    <div className="flex space-x-2 flex-wrap">
                      {product.colors.map((color) => (
                        <Button
                          key={color}
                          variant="outline"
                          className="px-4 mb-2"
                        >
                          {color}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-2">Quantity</h3>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="px-4 py-2 border rounded">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full btn-brand"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToWishlist}
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Wishlist
                </Button>
                <Button variant="outline" size="lg" className="flex-1">
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-success" />
                <span className="text-sm">Free Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm">1 Year Warranty</span>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw className="h-5 w-5 text-warning" />
                <span className="text-sm">7 Day Returns</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-secondary" />
                <span className="text-sm">Genuine Product</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Card className="mb-12">
          <CardContent className="p-0">
            <Tabs defaultValue="features" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
              </TabsList>
              
              <TabsContent value="features" className="p-6">
                <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                {product.features ? (
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-primary">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">No detailed features available for this product.</p>
                )}
              </TabsContent>
              
              <TabsContent value="specifications" className="p-6">
                <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
                {product.specifications ? (
                  <div className="space-y-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b">
                        <span className="font-medium">{key}</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No detailed specifications available for this product.</p>
                )}
              </TabsContent>
              
              <TabsContent value="reviews" className="p-6">
                <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl font-bold">{product.rating}</div>
                    <div>
                      <div className="flex items-center mb-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-5 w-5 ${
                              star <= product.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                       <p className="text-muted-foreground">
                        Based on {product.review_count?.toLocaleString() || 0} reviews
                       </p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Sample reviews */}
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">Rajesh Kumar</span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">2 days ago</span>
                      </div>
                      <p className="text-sm">
                        Excellent phone! Camera quality is outstanding and battery life is great. 
                        Highly recommended for anyone looking for a premium smartphone.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="shipping" className="p-6">
                <h3 className="text-xl font-semibold mb-4">Shipping & Returns</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Shipping Information</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Free delivery on orders above ₹499</li>
                      <li>• Standard delivery: 2-4 business days</li>
                      <li>• Express delivery: 1-2 business days (₹99)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Return Policy</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• 7-day return policy</li>
                      <li>• Items must be in original condition</li>
                      <li>• Free return pickup available</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRelatedProducts.map((relatedProduct) => (
              <ProductCard 
                key={relatedProduct.id} 
                id={relatedProduct.id}
                title={relatedProduct.title}
                price={relatedProduct.price}
                originalPrice={relatedProduct.original_price || undefined}
                rating={relatedProduct.rating || 0}
                reviews={relatedProduct.review_count || 0}
                image={relatedProduct.images?.[0] || '/placeholder.svg'}
                isBestseller={relatedProduct.is_bestseller}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;