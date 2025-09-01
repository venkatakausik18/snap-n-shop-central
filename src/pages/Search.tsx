import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search as SearchIcon, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import Breadcrumb from "@/components/Breadcrumb";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(query);

  // Sample search results
  const searchResults = [
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
      title: "OnePlus 12 5G (Flowy Emerald, 256GB)",
      price: 64999,
      originalPrice: 69999,
      rating: 4.3,
      reviews: 892,
      image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&h=400&fit=crop",
    },
  ];

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
            <Button size="lg" className="btn-brand px-8">
              Search
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                Search Results {query && `for "${query}"`}
              </h1>
              <p className="text-muted-foreground">
                Showing {searchResults.length} of 1,247 results
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
                    onClick={() => setSearchQuery(search)}
                  >
                    {search}
                  </Button>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-6 border rounded-lg hover:border-primary transition-colors cursor-pointer">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="font-semibold">Electronics</h3>
                <p className="text-sm text-muted-foreground">Phones, Laptops, Gadgets</p>
              </div>
              
              <div className="text-center p-6 border rounded-lg hover:border-primary transition-colors cursor-pointer">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">👕</span>
                </div>
                <h3 className="font-semibold">Fashion</h3>
                <p className="text-sm text-muted-foreground">Clothes, Shoes, Accessories</p>
              </div>
              
              <div className="text-center p-6 border rounded-lg hover:border-primary transition-colors cursor-pointer">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🏠</span>
                </div>
                <h3 className="font-semibold">Home & Kitchen</h3>
                <p className="text-sm text-muted-foreground">Furniture, Appliances</p>
              </div>
              
              <div className="text-center p-6 border rounded-lg hover:border-primary transition-colors cursor-pointer">
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