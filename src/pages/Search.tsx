import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Search as SearchIcon, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import Breadcrumb from "@/components/Breadcrumb";
import { products } from "@/data/products";

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(query);

  // Advanced search function
  const searchProducts = (searchTerm: string) => {
    if (!searchTerm.trim()) return [];
    
    const searchWords = searchTerm.toLowerCase().split(' ');
    
    return products.filter(product => {
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
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {searchResults.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">
                  Try searching with different keywords or browse our categories
                </p>
                <Button asChild variant="outline">
                  <span onClick={() => navigate('/products')}>Browse All Products</span>
                </Button>
              </div>
            )}

            {/* Pagination */}
            {searchResults.length > 0 && (
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
            )}
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