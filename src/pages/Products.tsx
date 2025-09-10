import { useState, useEffect } from "react";
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
import { useProducts, useCategories, Product } from "@/hooks/useProducts";

const Products = () => {
  const { category } = useParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState('relevance');

  // Fetch data using hooks
  const { categories } = useCategories();
  const { products: allProducts, loading, error } = useProducts({
    category: category,
    minPrice: priceRange[0],
    maxPrice: priceRange[1]
  });

  // Find current category
  const currentCategory = categories.find(cat => cat.slug === category);
  const categoryName = currentCategory?.name || 'All Products';

  const breadcrumbItems = [
    ...(category ? [{ label: categoryName, href: `/category/${category}` }] : []),
    { label: category ? "Products" : "All Products" }
  ];

  // Get unique brands from products
  const brands = Array.from(new Set(allProducts.map(p => p.brand))).slice(0, 10);
  const ratings = [4, 3, 2, 1];

  // Apply additional filters
  const filteredProducts = allProducts.filter(product => {
    // Brand filter
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
      return false;
    }
    
    // Rating filter
    if (selectedRatings.length > 0 && !selectedRatings.some(rating => product.rating >= rating)) {
      return false;
    }
    
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return 0; // Would need created_at field
      default:
        return 0; // relevance
    }
  });

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands(prev => [...prev, brand]);
    } else {
      setSelectedBrands(prev => prev.filter(b => b !== brand));
    }
  };

  const handleRatingChange = (rating: number, checked: boolean) => {
    if (checked) {
      setSelectedRatings(prev => [...prev, rating]);
    } else {
      setSelectedRatings(prev => prev.filter(r => r !== rating));
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading products...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <p className="text-destructive mb-4">Error loading products: {error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{categoryName}</h1>
            <p className="text-muted-foreground">
              Showing 1-{sortedProducts.length} of {sortedProducts.length} results
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Select value={sortBy} onValueChange={setSortBy}>
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
                        <Checkbox 
                          id={brand} 
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={(checked) => handleBrandChange(brand, !!checked)}
                        />
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
                        <Checkbox 
                          id={`rating-${rating}`}
                          checked={selectedRatings.includes(rating)}
                          onCheckedChange={(checked) => handleRatingChange(rating, !!checked)}
                        />
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
              {sortedProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  originalPrice={product.original_price}
                  rating={product.rating}
                  reviews={product.review_count}
                  image={product.images[0] || '/placeholder.svg'}
                  isBestseller={product.is_bestseller}
                />
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