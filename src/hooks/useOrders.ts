import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  product_title: string;
  product_image_url?: string;
  selected_variant?: string;
  selected_color?: string;
  selected_size?: string;
  created_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  payment_status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded' | 'partially_refunded';
  subtotal: number;
  tax_amount: number;
  shipping_amount: number;
  discount_amount: number;
  total_amount: number;
  currency: string;
  shipping_first_name: string;
  shipping_last_name: string;
  shipping_address_line_1: string;
  shipping_address_line_2?: string;
  shipping_city: string;
  shipping_state: string;
  shipping_postal_code: string;
  shipping_country: string;
  shipping_phone?: string;
  payment_method?: string;
  payment_reference?: string;
  notes?: string;
  estimated_delivery_date?: string;
  delivered_at?: string;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
}

export interface CreateOrderData {
  subtotal: number;
  tax_amount?: number;
  shipping_amount?: number;
  discount_amount?: number;
  total_amount: number;
  currency?: string;
  shipping_first_name: string;
  shipping_last_name: string;
  shipping_address_line_1: string;
  shipping_address_line_2?: string;
  shipping_city: string;
  shipping_state: string;
  shipping_postal_code: string;
  shipping_country: string;
  shipping_phone?: string;
  payment_method?: string;
  notes?: string;
  items: {
    product_id: string;
    quantity: number;
    unit_price: number;
    product_title: string;
    product_image_url?: string;
    selected_variant?: string;
    selected_color?: string;
    selected_size?: string;
  }[];
}

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchOrders = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      // Fetch orders with order items
      const { data: ordersData, error: ordersError } = await supabase
        .from("orders")
        .select(`
          *,
          order_items (*)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (ordersError) throw ordersError;

      setOrders(ordersData || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch orders");
      toast({
        title: "Error",
        description: "Failed to load orders. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData: CreateOrderData) => {
    if (!user) {
      throw new Error("User must be logged in to create an order");
    }

    setLoading(true);
    setError(null);

    try {
      // Generate order number (simplified version)
      const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

      // Create the order
      const { data: newOrder, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          order_number: orderNumber,
          status: 'pending',
          payment_status: 'pending',
          subtotal: orderData.subtotal,
          tax_amount: orderData.tax_amount || 0,
          shipping_amount: orderData.shipping_amount || 0,
          discount_amount: orderData.discount_amount || 0,
          total_amount: orderData.total_amount,
          currency: orderData.currency || 'INR',
          shipping_first_name: orderData.shipping_first_name,
          shipping_last_name: orderData.shipping_last_name,
          shipping_address_line_1: orderData.shipping_address_line_1,
          shipping_address_line_2: orderData.shipping_address_line_2,
          shipping_city: orderData.shipping_city,
          shipping_state: orderData.shipping_state,
          shipping_postal_code: orderData.shipping_postal_code,
          shipping_country: orderData.shipping_country,
          shipping_phone: orderData.shipping_phone,
          payment_method: orderData.payment_method,
          notes: orderData.notes,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = orderData.items.map(item => ({
        order_id: newOrder.id,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total_price: item.unit_price * item.quantity,
        product_title: item.product_title,
        product_image_url: item.product_image_url,
        selected_variant: item.selected_variant,
        selected_color: item.selected_color,
        selected_size: item.selected_size,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Update payment status to paid (since this is dummy payment)
      const { error: updateError } = await supabase
        .from("orders")
        .update({ 
          payment_status: 'completed',
          status: 'confirmed'
        })
        .eq("id", newOrder.id);

      if (updateError) throw updateError;

      // Refresh orders list
      await fetchOrders();

      return newOrder;
    } catch (err) {
      console.error("Error creating order:", err);
      setError(err instanceof Error ? err.message : "Failed to create order");
      toast({
        title: "Error",
        description: "Failed to create order. Please try again.",
        variant: "destructive",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getOrderById = (orderId: string) => {
    return orders.find(order => order.id === orderId);
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  return {
    orders,
    loading,
    error,
    createOrder,
    getOrderById,
    refetchOrders: fetchOrders,
  };
};