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

  // Comprehensive product database
  const allProducts = [
    // Electronics
    {
      id: "1",
      title: "Apple iPhone 15 Pro Max (256GB) - Natural Titanium",
      price: 134900,
      originalPrice: 159900,
      rating: 4.5,
      reviews: 2847,
      image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop",
      category: "electronics",
      subcategory: "smartphones",
      brand: "Apple",
      keywords: ["iphone", "apple", "smartphone", "mobile", "phone"],
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
      category: "electronics",
      subcategory: "smartphones",
      brand: "Samsung",
      keywords: ["samsung", "galaxy", "smartphone", "mobile", "phone", "android"],
    },
    {
      id: "3",
      title: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
      price: 29990,
      originalPrice: 34990,
      rating: 4.6,
      reviews: 3245,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      category: "electronics",
      subcategory: "audio",
      brand: "Sony",
      keywords: ["headphones", "sony", "wireless", "noise canceling", "audio"],
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
      category: "electronics",
      subcategory: "laptops",
      brand: "Apple",
      keywords: ["macbook", "laptop", "apple", "computer", "m2"],
    },
    {
      id: "5",
      title: "OnePlus 12 5G (Flowy Emerald, 256GB)",
      price: 64999,
      originalPrice: 69999,
      rating: 4.3,
      reviews: 892,
      image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&h=400&fit=crop",
      category: "electronics",
      subcategory: "smartphones",
      brand: "OnePlus",
      keywords: ["oneplus", "smartphone", "mobile", "phone", "android"],
    },
    {
      id: "6",
      title: "Dell XPS 13 Plus Laptop (Intel i7, 16GB RAM, 512GB SSD)",
      price: 149900,
      originalPrice: 169900,
      rating: 4.4,
      reviews: 654,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
      category: "electronics",
      subcategory: "laptops",
      brand: "Dell",
      keywords: ["dell", "laptop", "xps", "computer", "intel"],
    },
    {
      id: "7",
      title: "iPhone 13 Screen Protector - Tempered Glass",
      price: 1299,
      originalPrice: 1999,
      rating: 4.2,
      reviews: 1876,
      image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop",
      category: "electronics",
      subcategory: "accessories",
      brand: "Generic",
      keywords: ["screen protector", "iphone 13", "tempered glass", "protection", "accessory"],
    },
    {
      id: "8",
      title: "Samsung Galaxy S24 Screen Guard - Anti Glare",
      price: 899,
      originalPrice: 1499,
      rating: 4.1,
      reviews: 1234,
      image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop",
      category: "electronics",
      subcategory: "accessories",
      brand: "Generic",
      keywords: ["screen guard", "samsung", "galaxy s24", "anti glare", "protection"],
    },
    
    // Fashion
    {
      id: "9",
      title: "Men's Cotton Casual Shirt - Blue Checkered",
      price: 1299,
      originalPrice: 1999,
      rating: 4.3,
      reviews: 567,
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop",
      category: "fashion",
      subcategory: "mens-clothing",
      brand: "Fashion Hub",
      keywords: ["shirt", "men", "cotton", "casual", "blue", "checkered"],
    },
    {
      id: "10",
      title: "Women's Ethnic Kurti Set - Traditional Design",
      price: 1799,
      originalPrice: 2499,
      rating: 4.5,
      reviews: 890,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
      category: "fashion",
      subcategory: "womens-clothing",
      brand: "Ethnic Wear",
      keywords: ["kurti", "women", "ethnic", "traditional", "indian wear"],
    },
    {
      id: "11",
      title: "Nike Air Max Running Shoes - Black/White",
      price: 7999,
      originalPrice: 9999,
      rating: 4.6,
      reviews: 1234,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      category: "fashion",
      subcategory: "footwear",
      brand: "Nike",
      keywords: ["nike", "shoes", "running", "air max", "sneakers"],
    },
    
    // Home & Kitchen
    {
      id: "12",
      title: "LG 260L Double Door Refrigerator - Silver",
      price: 22999,
      originalPrice: 27999,
      rating: 4.4,
      reviews: 789,
      image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=400&fit=crop",
      category: "home-kitchen",
      subcategory: "appliances",
      brand: "LG",
      keywords: ["refrigerator", "lg", "double door", "fridge", "appliance"],
    },
    {
      id: "13",
      title: "Wooden Dining Table Set - 6 Seater",
      price: 15999,
      originalPrice: 19999,
      rating: 4.3,
      reviews: 456,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
      category: "home-kitchen",
      subcategory: "furniture",
      brand: "WoodCraft",
      keywords: ["dining table", "wooden", "furniture", "6 seater", "home"],
    },
    {
      id: "14",
      title: "Non-Stick Cookware Set - 7 Pieces",
      price: 3499,
      originalPrice: 4999,
      rating: 4.2,
      reviews: 1567,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
      category: "home-kitchen",
      subcategory: "cookware",
      brand: "Kitchen Pro",
      keywords: ["cookware", "non-stick", "kitchen", "cooking", "pots", "pans"],
    },
    
    // Beauty
    {
      id: "15",
      title: "Lakme Absolute Perfect Radiance Foundation",
      price: 1299,
      originalPrice: 1599,
      rating: 4.1,
      reviews: 2345,
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
      category: "beauty",
      subcategory: "makeup",
      brand: "Lakme",
      keywords: ["foundation", "lakme", "makeup", "radiance", "beauty"],
    },
    {
      id: "16",
      title: "Olay Regenerist Anti-Aging Serum",
      price: 2499,
      originalPrice: 2999,
      rating: 4.4,
      reviews: 1890,
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
      category: "beauty",
      subcategory: "skincare",
      brand: "Olay",
      keywords: ["serum", "olay", "anti-aging", "skincare", "regenerist"],
    },
    
    // Sports
    {
      id: "17",
      title: "Yonex Badminton Racquet - Professional Grade",
      price: 4999,
      originalPrice: 6999,
      rating: 4.5,
      reviews: 678,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
      category: "sports",
      subcategory: "equipment",
      brand: "Yonex",
      keywords: ["badminton", "racquet", "yonex", "sports", "equipment"],
    },
    {
      id: "18",
      title: "Adidas Football - FIFA Quality Pro",
      price: 1999,
      originalPrice: 2999,
      rating: 4.3,
      reviews: 1234,
      image: "https://images.unsplash.com/photo-1614631740271-e1e80bc5f4c8?w=400&h=400&fit=crop",
      category: "sports",
      subcategory: "equipment",
      brand: "Adidas",
      keywords: ["football", "adidas", "fifa", "sports", "ball"],
    },
    
    // Books
    {
      id: "19",
      title: "Think and Grow Rich - Napoleon Hill",
      price: 299,
      originalPrice: 499,
      rating: 4.6,
      reviews: 5678,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop",
      category: "books",
      subcategory: "self-help",
      brand: "Generic",
      keywords: ["book", "think and grow rich", "napoleon hill", "self help"],
    },
    {
      id: "20",
      title: "The Alchemist - Paulo Coelho",
      price: 199,
      originalPrice: 399,
      rating: 4.7,
      reviews: 8901,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop",
      category: "books",
      subcategory: "fiction",
      brand: "Generic",
      keywords: ["book", "alchemist", "paulo coelho", "fiction", "novel"],
    },
    
    // Automotive
    {
      id: "21",
      title: "Car Dashboard Camera - Full HD 1080p",
      price: 3999,
      originalPrice: 5999,
      rating: 4.2,
      reviews: 456,
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=400&fit=crop",
      category: "automotive",
      subcategory: "accessories",
      brand: "TechDrive",
      keywords: ["dashboard camera", "car", "automotive", "1080p", "dash cam"],
    }
  ];

  // Filter products based on category
  const filteredProducts = category 
    ? allProducts.filter(product => product.category === category)
    : allProducts;

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
              Showing 1-{filteredProducts.length} of {filteredProducts.length} results
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
              {filteredProducts.map((product) => (
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