import { Search, ShoppingCart, User, Menu, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span>📱 Download App</span>
              <span>🚚 Free Delivery</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>💬 24x7 Support</span>
              <span>🎯 Track Order</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold">
                <span className="text-primary">snap</span>
                <span className="text-secondary">N</span>
                <span className="text-primary">shop</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                Plus
              </Badge>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search for products, brands and more..."
                className="pl-10 pr-4 h-11 w-full border-2 focus:border-primary"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <Badge 
                variant="secondary" 
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                3
              </Badge>
            </Button>

            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>

            <Button className="btn-brand hidden md:flex">
              Login
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search for products..."
              className="pl-10 pr-4 h-11 w-full border-2 focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-t bg-muted/20">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center space-x-8 overflow-x-auto">
            <Button variant="ghost" size="sm" className="whitespace-nowrap">
              Electronics
            </Button>
            <Button variant="ghost" size="sm" className="whitespace-nowrap">
              Fashion
            </Button>
            <Button variant="ghost" size="sm" className="whitespace-nowrap">
              Home & Kitchen
            </Button>
            <Button variant="ghost" size="sm" className="whitespace-nowrap">
              Beauty
            </Button>
            <Button variant="ghost" size="sm" className="whitespace-nowrap">
              Sports
            </Button>
            <Button variant="ghost" size="sm" className="whitespace-nowrap">
              Books
            </Button>
            <Button variant="ghost" size="sm" className="whitespace-nowrap">
              Automotive
            </Button>
            <Button variant="ghost" size="sm" className="whitespace-nowrap text-secondary font-semibold">
              🔥 Today's Deals
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;