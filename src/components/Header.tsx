import { Search, ShoppingCart, User, Menu, Heart } from "lucide-react";
import { Link } from "react-router-dom";
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
            <Link to="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold">
                <span className="text-primary">snap</span>
                <span className="text-secondary">N</span>
                <span className="text-primary">shop</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                Plus
              </Badge>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search for products, brands and more..."
                className="pl-10 pr-4 h-11 w-full border-2 focus:border-primary"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const query = e.currentTarget.value;
                    if (query.trim()) {
                      window.location.href = `/search?q=${encodeURIComponent(query)}`;
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <Button asChild variant="ghost" size="icon" className="relative">
              <Link to="/account/wishlist">
                <Heart className="h-5 w-5" />
              </Link>
            </Button>
            
            <Button asChild variant="ghost" size="icon" className="relative">
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
                <Badge 
                  variant="secondary" 
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  3
                </Badge>
              </Link>
            </Button>

            <Button asChild variant="ghost" size="icon">
              <Link to="/account">
                <User className="h-5 w-5" />
              </Link>
            </Button>

            <Button asChild className="btn-brand hidden md:flex">
              <Link to="/auth">Login</Link>
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
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const query = e.currentTarget.value;
                  if (query.trim()) {
                    window.location.href = `/search?q=${encodeURIComponent(query)}`;
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-t bg-muted/20">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center space-x-8 overflow-x-auto">
            <Button asChild variant="ghost" size="sm" className="whitespace-nowrap">
              <Link to="/category/electronics">Electronics</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="whitespace-nowrap">
              <Link to="/category/fashion">Fashion</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="whitespace-nowrap">
              <Link to="/category/home-kitchen">Home & Kitchen</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="whitespace-nowrap">
              <Link to="/category/beauty">Beauty</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="whitespace-nowrap">
              <Link to="/category/sports">Sports</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="whitespace-nowrap">
              <Link to="/category/books">Books</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="whitespace-nowrap">
              <Link to="/category/automotive">Automotive</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="whitespace-nowrap text-secondary font-semibold">
              <Link to="/deals">🔥 Today's Deals</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;