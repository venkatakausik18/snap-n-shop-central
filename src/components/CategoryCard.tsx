import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CategoryCardProps {
  title: string;
  subtitle?: string;
  image: string;
  offers?: string[];
  gradient?: string;
}

const CategoryCard = ({ 
  title, 
  subtitle, 
  image, 
  offers = [],
  gradient = "from-primary/10 to-primary/5"
}: CategoryCardProps) => {
  return (
    <Card className="group overflow-hidden border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardContent className="p-0">
        <div className={`relative bg-gradient-to-br ${gradient} p-6 h-full min-h-[200px] flex flex-col justify-between`}>
          {/* Category Image */}
          <div className="absolute top-4 right-4 w-16 h-16 rounded-full overflow-hidden bg-background/20 backdrop-blur-sm">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-foreground mb-1">
              {title}
            </h3>
            {subtitle && (
              <p className="text-sm text-muted-foreground mb-3">
                {subtitle}
              </p>
            )}

            {/* Offers */}
            {offers.length > 0 && (
              <div className="space-y-1 mb-4">
                {offers.slice(0, 2).map((offer, index) => (
                  <div key={index} className="text-xs font-medium text-success">
                    • {offer}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="self-start p-0 h-auto font-semibold text-primary hover:text-primary/80 group"
          >
            Explore
            <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;