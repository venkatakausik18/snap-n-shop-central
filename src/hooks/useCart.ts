import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

export interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  price: number;
  selected_variant?: string;
  selected_color?: string;
  selected_size?: string;
  created_at: string;
  updated_at: string;
  // Product details joined from products table
  product?: {
    title: string;
    images: string[];
    brand: string;
    stock_quantity: number;
  };
}

export const useCart = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Generate or get session ID for guest users
  const getSessionId = () => {
    let sessionId = localStorage.getItem('cart_session_id');
    if (!sessionId) {
      sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(2)}`;
      localStorage.setItem('cart_session_id', sessionId);
    }
    return sessionId;
  };

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('cart_items')
        .select(`
          *,
          product:products(
            title,
            images,
            brand,
            stock_quantity
          )
        `);

      if (user) {
        query = query.eq('user_id', user.id);
      } else {
        const sessionId = getSessionId();
        query = query.eq('session_id', sessionId);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;

      setCartItems(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch cart items');
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (
    productId: string,
    price: number,
    quantity: number = 1,
    options?: {
      selectedVariant?: string;
      selectedColor?: string;
      selectedSize?: string;
    }
  ) => {
    try {
      // Check if item already exists in cart
      const existingItem = cartItems.find(
        item => 
          item.product_id === productId &&
          item.selected_variant === options?.selectedVariant &&
          item.selected_color === options?.selectedColor &&
          item.selected_size === options?.selectedSize
      );

      if (existingItem) {
        // Update quantity if item exists
        await updateCartItemQuantity(existingItem.id, existingItem.quantity + quantity);
        return;
      }

      const cartItemData: any = {
        product_id: productId,
        quantity,
        price,
        selected_variant: options?.selectedVariant || null,
        selected_color: options?.selectedColor || null,
        selected_size: options?.selectedSize || null,
      };

      if (user) {
        cartItemData.user_id = user.id;
      } else {
        cartItemData.session_id = getSessionId();
      }

      const { error } = await supabase
        .from('cart_items')
        .insert([cartItemData]);

      if (error) throw error;

      await fetchCartItems();
      
      toast({
        title: "Added to cart!",
        description: "Product has been added to your cart.",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add to cart';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const updateCartItemQuantity = async (cartItemId: string, newQuantity: number) => {
    try {
      if (newQuantity <= 0) {
        await removeFromCart(cartItemId);
        return;
      }

      const { error } = await supabase
        .from('cart_items')
        .update({ quantity: newQuantity, updated_at: new Date().toISOString() })
        .eq('id', cartItemId);

      if (error) throw error;

      await fetchCartItems();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update cart item';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', cartItemId);

      if (error) throw error;

      await fetchCartItems();
      
      toast({
        title: "Removed from cart",
        description: "Product has been removed from your cart.",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to remove from cart';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const clearCart = async () => {
    try {
      let query = supabase.from('cart_items').delete();

      if (user) {
        query = query.eq('user_id', user.id);
      } else {
        const sessionId = getSessionId();
        query = query.eq('session_id', sessionId);
      }

      const { error } = await query;

      if (error) throw error;

      setCartItems([]);
      
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart.",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to clear cart';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  // Merge guest cart with user cart when user logs in
  const mergeGuestCart = async () => {
    if (!user) return;

    const sessionId = localStorage.getItem('cart_session_id');
    if (!sessionId) return;

    try {
      // Get guest cart items
      const { data: guestItems, error: fetchError } = await supabase
        .from('cart_items')
        .select('*')
        .eq('session_id', sessionId);

      if (fetchError || !guestItems?.length) return;

      // Update guest items to belong to the user
      const { error: updateError } = await supabase
        .from('cart_items')
        .update({ 
          user_id: user.id, 
          session_id: null,
          updated_at: new Date().toISOString()
        })
        .eq('session_id', sessionId);

      if (updateError) throw updateError;

      // Clear session ID as we've merged the cart
      localStorage.removeItem('cart_session_id');
      
      await fetchCartItems();
    } catch (err) {
      console.error('Error merging guest cart:', err);
    }
  };

  // Calculate totals
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    fetchCartItems();
  }, [user]);

  useEffect(() => {
    if (user) {
      mergeGuestCart();
    }
  }, [user]);

  return {
    cartItems,
    loading,
    error,
    cartTotal,
    cartItemCount,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
    refetch: fetchCartItems,
  };
};