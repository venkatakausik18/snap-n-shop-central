import { Star, Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  isBestseller?: boolean;
}

const ProductCard = ({ 
  id, 
  title, 
  price, 
  originalPrice, 
  rating, 
  reviews, 
  image, 
  isBestseller 
}: ProductCardProps) => {
  const discount = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: "Added to cart!",
      description: `${title} has been added to your cart.`,
    });
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: "Added to wishlist!",
      description: `${title} has been added to your wishlist.`,
    });
  };

  return (
    <Link to={`/product/${id}`}>
      <Card className="group overflow-hidden border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 product-card">
        <CardContent className="p-0">
          <div className="relative">
            {/* Product Image */}
            <div className="aspect-square overflow-hidden bg-muted/20">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col space-y-2">
              {isBestseller && (
                <Badge className="bg-success text-success-foreground">
                  Bestseller
                </Badge>
              )}
              {discount > 0 && (
                <Badge className="bg-secondary text-secondary-foreground">
                  {discount}% OFF
                </Badge>
              )}
            </div>

            {/* Wishlist Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background"
              onClick={handleAddToWishlist}
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          {/* Product Info */}
          <div className="p-4 space-y-3">
            <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium ml-1">{rating}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                ({reviews.toLocaleString()})
              </span>
            </div>

            {/* Price */}
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold">
                  ₹{price.toLocaleString()}
                </span>
                {originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ₹{originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {originalPrice && (
                <p className="text-xs text-success font-medium">
                  Save ₹{(originalPrice - price).toLocaleString()}
                </p>
              )}
            </div>

            {/* Add to Cart Button */}
            <Button
              size="sm"
              className="w-full btn-brand opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;