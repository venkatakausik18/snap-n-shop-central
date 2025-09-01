import { Star, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  discount?: number;
  isBestseller?: boolean;
  isWishlisted?: boolean;
}

const ProductCard = ({
  title,
  price,
  originalPrice,
  rating,
  reviews,
  image,
  discount,
  isBestseller,
  isWishlisted = false,
}: ProductCardProps) => {
  const discountPercentage = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : discount;

  return (
    <Card className="product-card group overflow-hidden border-border/50 hover:border-primary/20">
      <div className="relative">
        {/* Product Image */}
        <div className="aspect-square overflow-hidden bg-muted/20">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isBestseller && (
            <Badge className="bg-success text-success-foreground">
              Bestseller
            </Badge>
          )}
          {discountPercentage && discountPercentage > 0 && (
            <Badge className="bg-secondary text-secondary-foreground">
              {discountPercentage}% OFF
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-8 w-8 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <Heart 
            className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} 
          />
        </Button>

        {/* Quick Add to Cart */}
        <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button className="w-full h-8 text-xs btn-brand">
            <ShoppingCart className="h-3 w-3 mr-1" />
            Add to Cart
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Product Title */}
        <h3 className="font-medium text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium ml-1">{rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">({reviews.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-bold text-foreground">
            ₹{price.toLocaleString()}
          </span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Delivery Info */}
        <div className="text-xs text-success font-medium">
          Free Delivery
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;