import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Product {
  id: string;
  title: string;
  description?: string;
  brand: string;
  price: number;
  original_price?: number;
  currency: string;
  stock_quantity: number;
  rating: number;
  review_count: number;
  images: string[];
  variants?: string[];
  colors?: string[];
  sizes?: string[];
  features?: string[];
  specifications?: Record<string, any>;
  tags: string[];
  is_featured: boolean;
  is_bestseller: boolean;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  subcategory?: {
    id: string;
    name: string;
    slug: string;
  };
  meta_title?: string;
  meta_description?: string;
}

// Transform database product to Product interface
const transformProduct = (dbProduct: any): Product => {
  return {
    id: dbProduct.id,
    title: dbProduct.title,
    description: dbProduct.description,
    brand: dbProduct.brand,
    price: dbProduct.price,
    original_price: dbProduct.original_price,
    currency: dbProduct.currency,
    stock_quantity: dbProduct.stock_quantity,
    rating: dbProduct.rating,
    review_count: dbProduct.review_count,
    images: dbProduct.images || [],
    variants: dbProduct.variants || [],
    colors: dbProduct.colors || [],
    sizes: dbProduct.sizes || [],
    features: dbProduct.features || [],
    specifications: dbProduct.specifications as Record<string, any> || {},
    tags: dbProduct.tags || [],
    is_featured: dbProduct.is_featured,
    is_bestseller: dbProduct.is_bestseller,
    category: dbProduct.category,
    subcategory: dbProduct.subcategory,
    meta_title: dbProduct.meta_title,
    meta_description: dbProduct.meta_description,
  };
};

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  category_id: string;
}

export const useProducts = (filters?: {
  category?: string;
  subcategory?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
  bestseller?: boolean;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('products')
        .select(`
          *,
          category:categories(id, name, slug),
          subcategory:subcategories(id, name, slug, category_id)
        `)
        .eq('is_active', true);

      // Apply filters
      if (filters?.category) {
        query = query.eq('categories.slug', filters.category);
      }

      if (filters?.subcategory) {
        query = query.eq('subcategories.slug', filters.subcategory);
      }

      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,brand.ilike.%${filters.search}%,tags.cs.{${filters.search}}`);
      }

      if (filters?.minPrice) {
        query = query.gte('price', filters.minPrice);
      }

      if (filters?.maxPrice) {
        query = query.lte('price', filters.maxPrice);
      }

      if (filters?.featured) {
        query = query.eq('is_featured', true);
      }

      if (filters?.bestseller) {
        query = query.eq('is_bestseller', true);
      }

      // Order by featured, bestseller, then rating
      query = query.order('is_featured', { ascending: false })
                  .order('is_bestseller', { ascending: false })
                  .order('rating', { ascending: false });

      const { data, error } = await query;

      if (error) throw error;

      setProducts((data || []).map(transformProduct));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error, refetch: fetchProducts };
};

export const useProduct = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          category:categories(id, name, slug),
          subcategory:subcategories(id, name, slug, category_id)
        `)
        .eq('id', id)
        .eq('is_active', true)
        .single();

      if (error) throw error;

      setProduct(transformProduct(data));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch product');
    } finally {
      setLoading(false);
    }
  };

  return { product, loading, error, refetch: fetchProduct };
};

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;

      setCategories(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  return { categories, loading, error, refetch: fetchCategories };
};

export const useSubcategories = (categorySlug?: string) => {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSubcategories();
  }, [categorySlug]);

  const fetchSubcategories = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('subcategories')
        .select(`
          *,
          category:categories(slug)
        `)
        .eq('is_active', true);

      if (categorySlug) {
        query = query.eq('categories.slug', categorySlug);
      }

      query = query.order('name');

      const { data, error } = await query;

      if (error) throw error;

      setSubcategories(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch subcategories');
    } finally {
      setLoading(false);
    }
  };

  return { subcategories, loading, error, refetch: fetchSubcategories };
};