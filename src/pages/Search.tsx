import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Search as SearchIcon, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import Breadcrumb from "@/components/Breadcrumb";
import { useProducts, useCategories } from "@/hooks/useProducts";

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(query);

  // Use Supabase products hook with search filter
  const { products: searchResults, loading } = useProducts({ 
    search: query.trim() || undefined 
  });
  
  const { categories } = useCategories();

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
                {loading ? "Searching..." : `Showing ${searchResults.length} results`}
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
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="border rounded-lg p-4 animate-pulse">
                    <div className="aspect-square bg-muted rounded-lg mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-4 bg-muted rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {searchResults.map((product) => (
                  <ProductCard 
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    originalPrice={product.original_price || undefined}
                    rating={product.rating || 0}
                    reviews={product.review_count || 0}
                    image={product.images?.[0] || '/placeholder.svg'}
                    isBestseller={product.is_bestseller}
                  />
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
              {categories.slice(0, 4).map((category) => (
                <div 
                  key={category.id}
                  className="text-center p-6 border rounded-lg hover:border-primary transition-colors cursor-pointer"
                  onClick={() => navigate(`/category/${category.slug}`)}
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">
                      {category.name === 'Electronics' ? '📱' : 
                       category.name === 'Fashion' ? '👕' :
                       category.name === 'Home & Kitchen' ? '🏠' :
                       category.name === 'Beauty' ? '💄' : '📦'}
                    </span>
                  </div>
                  <h3 className="font-semibold">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.description || 'Browse products'}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Search;