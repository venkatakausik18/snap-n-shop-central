import { useState } from "react";
import { useParams } from "react-router-dom";
import { Filter, Grid, List, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import Breadcrumb from "@/components/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Products = () => {
  const { category } = useParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([0, 100000]);

  // Sample products data
  const products = [
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
    {
      id: "5",
      title: "OnePlus 12 5G (Flowy Emerald, 256GB)",
      price: 64999,
      originalPrice: 69999,
      rating: 4.3,
      reviews: 892,
      image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&h=400&fit=crop",
    },
    {
      id: "6",
      title: "Dell XPS 13 Plus Laptop (Intel i7, 16GB RAM, 512GB SSD)",
      price: 149900,
      originalPrice: 169900,
      rating: 4.4,
      reviews: 654,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
    },
  ];

  const getCategoryName = (slug?: string) => {
    const categoryMap: { [key: string]: string } = {
      'electronics': 'Electronics',
      'fashion': 'Fashion',
      'home-kitchen': 'Home & Kitchen',
      'beauty': 'Beauty & Personal Care',
      'sports': 'Sports',
      'books': 'Books',
      'automotive': 'Automotive'
    };
    return categoryMap[slug || ''] || 'All Products';
  };

  const categoryName = getCategoryName(category);

  const breadcrumbItems = [
    ...(category ? [{ label: categoryName, href: `/category/${category}` }] : []),
    { label: category ? "Products" : "All Products" }
  ];

  const brands = ["Apple", "Samsung", "Sony", "OnePlus", "Dell", "HP"];
  const ratings = [4, 3, 2, 1];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{categoryName}</h1>
            <p className="text-muted-foreground">
              Showing 1-{products.length} of 1,247 results
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Select defaultValue="relevance">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Customer Rating</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Price Range */}
                <div>
                  <h3 className="font-semibold mb-3">Price Range</h3>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={200000}
                    step={1000}
                    className="mb-3"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>₹{priceRange[0].toLocaleString()}</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>

                {/* Brand Filter */}
                <div>
                  <h3 className="font-semibold mb-3">Brand</h3>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox id={brand} />
                        <label htmlFor={brand} className="text-sm cursor-pointer">
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <h3 className="font-semibold mb-3">Customer Rating</h3>
                  <div className="space-y-2">
                    {ratings.map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox id={`rating-${rating}`} />
                        <label htmlFor={`rating-${rating}`} className="text-sm cursor-pointer">
                          {rating}★ & above
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <h3 className="font-semibold mb-3">Availability</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="in-stock" />
                      <label htmlFor="in-stock" className="text-sm cursor-pointer">
                        In Stock
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="free-delivery" />
                      <label htmlFor="free-delivery" className="text-sm cursor-pointer">
                        Free Delivery
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Active Filters */}
            <div className="flex items-center space-x-2 mb-6">
              <Badge variant="secondary" className="flex items-center">
                Electronics
                <button className="ml-2 hover:text-destructive">×</button>
              </Badge>
              <Badge variant="secondary" className="flex items-center">
                ₹0 - ₹100,000
                <button className="ml-2 hover:text-destructive">×</button>
              </Badge>
            </div>

            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-4"
            }>
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2">
                <Button variant="outline" disabled>Previous</Button>
                <Button variant="default">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">...</Button>
                <Button variant="outline">12</Button>
                <Button variant="outline">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;