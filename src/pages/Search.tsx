import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Search as SearchIcon, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import Breadcrumb from "@/components/Breadcrumb";

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(query);

  // Comprehensive search database (same as Products page)
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

  // Advanced search function
  const searchProducts = (searchTerm: string) => {
    if (!searchTerm.trim()) return [];
    
    const searchWords = searchTerm.toLowerCase().split(' ');
    
    return allProducts.filter(product => {
      const searchableText = [
        product.title,
        product.category,
        product.subcategory,
        product.brand,
        ...product.keywords
      ].join(' ').toLowerCase();
      
      // Score-based matching for better relevance
      let score = 0;
      
      // Exact title match gets highest score
      if (product.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        score += 100;
      }
      
      // Brand match
      if (product.brand.toLowerCase().includes(searchTerm.toLowerCase())) {
        score += 50;
      }
      
      // Keyword matches
      searchWords.forEach(word => {
        if (product.keywords.some(keyword => keyword.includes(word))) {
          score += 30;
        }
        if (searchableText.includes(word)) {
          score += 10;
        }
      });
      
      return score > 0;
    }).sort((a, b) => {
      // Sort by relevance score (calculated above)
      const aScore = calculateRelevanceScore(a, searchTerm);
      const bScore = calculateRelevanceScore(b, searchTerm);
      return bScore - aScore;
    });
  };

  const calculateRelevanceScore = (product: any, searchTerm: string) => {
    const searchWords = searchTerm.toLowerCase().split(' ');
    const searchableText = [
      product.title,
      product.category,
      product.subcategory,
      product.brand,
      ...product.keywords
    ].join(' ').toLowerCase();
    
    let score = 0;
    
    if (product.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      score += 100;
    }
    
    if (product.brand.toLowerCase().includes(searchTerm.toLowerCase())) {
      score += 50;
    }
    
    searchWords.forEach(word => {
      if (product.keywords.some(keyword => keyword.includes(word))) {
        score += 30;
      }
      if (searchableText.includes(word)) {
        score += 10;
      }
    });
    
    return score;
  };

  const searchResults = query ? searchProducts(query) : [];

  const popularSearches = [
    "iPhone 15", "Samsung Galaxy", "Laptop", "Headphones", "Smart Watch",
    "Air Conditioner", "Refrigerator", "Gaming Chair", "Bluetooth Speaker"
  ];

  const breadcrumbItems = [
    { label: `Search results for "${query}"` }
  ];

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />
        
        {/* Search Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for products, brands and more..."
                className="pl-12 pr-4 h-12 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              size="lg" 
              className="btn-brand px-8"
              onClick={() => navigate(`/search?q=${encodeURIComponent(searchQuery)}`)}
            >
              Search
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                Search Results {query && `for "${query}"`}
              </h1>
              <p className="text-muted-foreground">
                Showing {searchResults.length} of {searchResults.length} results
              </p>
            </div>
            
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
          </div>
        </div>

        {query ? (
          <>
            {/* Active Search Query */}
            <div className="flex items-center space-x-2 mb-6">
              <Badge variant="secondary" className="flex items-center space-x-2 px-3 py-1">
                <span>Search: {query}</span>
                <button className="hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            </div>

            {/* Search Results */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {searchResults.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center">
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
          </>
        ) : (
          /* No Search Query - Show Popular Searches */
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What are you looking for?</h2>
              <p className="text-lg text-muted-foreground">
                Start typing to search or explore popular categories below
              </p>
            </div>

            {/* Popular Searches */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-4">Popular Searches</h3>
              <div className="flex flex-wrap gap-3">
                {popularSearches.map((search, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="rounded-full"
                    onClick={() => navigate(`/search?q=${encodeURIComponent(search)}`)}
                  >
                    {search}
                  </Button>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div 
                className="text-center p-6 border rounded-lg hover:border-primary transition-colors cursor-pointer"
                onClick={() => navigate('/category/electronics')}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="font-semibold">Electronics</h3>
                <p className="text-sm text-muted-foreground">Phones, Laptops, Gadgets</p>
              </div>
              
              <div 
                className="text-center p-6 border rounded-lg hover:border-primary transition-colors cursor-pointer"
                onClick={() => navigate('/category/fashion')}
              >
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">👕</span>
                </div>
                <h3 className="font-semibold">Fashion</h3>
                <p className="text-sm text-muted-foreground">Clothes, Shoes, Accessories</p>
              </div>
              
              <div 
                className="text-center p-6 border rounded-lg hover:border-primary transition-colors cursor-pointer"
                onClick={() => navigate('/category/home-kitchen')}
              >
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🏠</span>
                </div>
                <h3 className="font-semibold">Home & Kitchen</h3>
                <p className="text-sm text-muted-foreground">Furniture, Appliances</p>
              </div>
              
              <div 
                className="text-center p-6 border rounded-lg hover:border-primary transition-colors cursor-pointer"
                onClick={() => navigate('/category/beauty')}
              >
                <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">💄</span>
                </div>
                <h3 className="font-semibold">Beauty</h3>
                <p className="text-sm text-muted-foreground">Skincare, Makeup</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Search;