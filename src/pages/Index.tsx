import { ArrowRight, Truck, Shield, Headphones, Gift, Zap, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import heroImage from "@/assets/hero-shopping.jpg";

const Index = () => {
  // Sample product data
  const featuredProducts = [
    {
      id: "1",
      title: "Apple iPhone 15 Pro Max (256GB) - Natural Titanium",
      price: 134900,
      originalPrice: 159900,
      rating: 4.5,
      reviews: 2847,
      image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop",
      isBestseller: true,
    },
    {
      id: "2", 
      title: "Samsung Galaxy S24 Ultra 5G (Titanium Gray, 256GB)",
      price: 124999,
      originalPrice: 139999,
      rating: 4.4,
      reviews: 1923,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    },
    {
      id: "3",
      title: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
      price: 29990,
      originalPrice: 34990,
      rating: 4.6,
      reviews: 3245,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      isBestseller: true,
    },
    {
      id: "4",
      title: "MacBook Air M2 (13-inch, 8GB RAM, 256GB SSD) - Midnight",
      price: 109900,
      originalPrice: 119900,
      rating: 4.7,
      reviews: 1567,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    },
  ];

  const categories = [
    {
      title: "Electronics",
      subtitle: "Smartphones, Laptops & More",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=100&h=100&fit=crop",
      offers: ["Up to 40% Off", "No Cost EMI available"],
      gradient: "from-blue-500/10 to-blue-600/5"
    },
    {
      title: "Fashion",
      subtitle: "Clothing, Shoes & Accessories", 
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop",
      offers: ["Min 50% Off", "Buy 2 Get 1 Free"],
      gradient: "from-pink-500/10 to-pink-600/5"
    },
    {
      title: "Home & Kitchen",
      subtitle: "Furniture, Appliances & Decor",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop",
      offers: ["Up to 60% Off", "Free Installation"],
      gradient: "from-green-500/10 to-green-600/5"
    },
    {
      title: "Beauty & Personal Care",
      subtitle: "Skincare, Makeup & Wellness",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&h=100&fit=crop",
      offers: ["Flat 30% Off", "Free Beauty Kit"],
      gradient: "from-purple-500/10 to-purple-600/5"
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient text-white overflow-hidden">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Badge className="bg-secondary text-secondary-foreground mb-4">
                🎉 New Year Sale - Limited Time!
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Discover Amazing 
                <span className="text-secondary"> Products</span> at 
                <span className="text-secondary"> Unbeatable</span> Prices
              </h1>
              <p className="text-xl mb-8 text-white/90 leading-relaxed">
                Shop from millions of products across electronics, fashion, home & more. 
                Get fast delivery, easy returns, and the best deals online.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="btn-hero text-lg px-8 py-6">
                  <Link to="/products">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary">
                  Download App
                </Button>
              </div>
            </div>
            <div className="animate-slide-up">
              <img
                src={heroImage}
                alt="Shopping Experience"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Truck className="h-6 w-6 text-success" />
              </div>
              <h3 className="font-semibold mb-1">Free Delivery</h3>
              <p className="text-sm text-muted-foreground">On orders above ₹499</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Secure Payment</h3>
              <p className="text-sm text-muted-foreground">100% secure checkout</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Headphones className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-1">24/7 Support</h3>
              <p className="text-sm text-muted-foreground">Always here to help</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Gift className="h-6 w-6 text-warning" />
              </div>
              <h3 className="font-semibold mb-1">Easy Returns</h3>
              <p className="text-sm text-muted-foreground">7-day return policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our wide range of categories and find exactly what you're looking for
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="animate-bounce-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CategoryCard {...category} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 flex items-center">
                <Zap className="h-8 w-8 text-secondary mr-3" />
                Trending Products
              </h2>
              <p className="text-lg text-muted-foreground">
                Most popular items this week
              </p>
            </div>
            <Button asChild variant="outline" className="hidden md:flex">
              <Link to="/products">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <ProductCard {...product} />
              </div>
            ))}
          </div>
          <div className="text-center mt-8 md:hidden">
            <Button asChild variant="outline">
              <Link to="/products">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Deal of the Day */}
      <section className="py-16 bg-gradient-to-r from-secondary/10 to-primary/10">
        <div className="container mx-auto px-4">
          <div className="bg-card rounded-2xl p-8 lg:p-12 shadow-lg">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <Badge className="bg-secondary text-secondary-foreground mb-4">
                  ⚡ Deal of the Day
                </Badge>
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  Save up to <span className="text-secondary">70%</span> on Electronics
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Limited time offer on top brands. Don't miss out on these incredible savings!
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-sm text-muted-foreground">Hours</div>
                  </div>
                  <div className="text-2xl">:</div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">34</div>
                    <div className="text-sm text-muted-foreground">Minutes</div>
                  </div>
                  <div className="text-2xl">:</div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">56</div>
                    <div className="text-sm text-muted-foreground">Seconds</div>
                  </div>
                </div>
                <Button asChild size="lg" className="btn-hero">
                  <Link to="/deals">
                    Shop Deal Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <div className="text-center">
                <img
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=400&fit=crop"
                  alt="Deal of the Day"
                  className="w-full max-w-md mx-auto rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
