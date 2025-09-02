import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-8">
            <div className="text-8xl font-bold text-primary mb-4">404</div>
            <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Sorry, the page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="btn-brand">
              <Link to="/">
                <Home className="h-5 w-5 mr-2" />
                Go Home
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg">
              <Link to="/products">
                <Search className="h-5 w-5 mr-2" />
                Browse Products
              </Link>
            </Button>
          </div>
          
          <div className="mt-8">
            <Button asChild variant="ghost" onClick={() => window.history.back()}>
              <span className="cursor-pointer">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </span>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
