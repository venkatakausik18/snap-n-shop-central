import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export interface Review {
  id: string;
  user_id: string;
  product_id: string;
  rating: number;
  title?: string;
  comment?: string;
  is_approved: boolean;
  is_verified_purchase: boolean;
  helpful_votes: number;
  order_item_id?: string;
  created_at: string;
  updated_at: string;
  profiles?: {
    first_name?: string;
    last_name?: string;
    email?: string;
  };
}

export interface CreateReviewData {
  product_id: string;
  rating: number;
  title?: string;
  comment?: string;
  order_item_id?: string;
}

export const useReviews = (productId?: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchReviews = async (targetProductId?: string) => {
    const reviewProductId = targetProductId || productId;
    if (!reviewProductId) return;

    setLoading(true);
    setError(null);

    try {
      const { data: reviewsData, error: reviewsError } = await supabase
        .from("reviews")
        .select("*")
        .eq("product_id", reviewProductId)
        .eq("is_approved", true)
        .order("created_at", { ascending: false });

      if (reviewsError) throw reviewsError;

      setReviews(reviewsData || []);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  const createReview = async (reviewData: CreateReviewData) => {
    if (!user) {
      throw new Error("User must be logged in to create a review");
    }

    setLoading(true);
    setError(null);

    try {
      const { data: newReview, error: reviewError } = await supabase
        .from("reviews")
        .insert({
          user_id: user.id,
          product_id: reviewData.product_id,
          rating: reviewData.rating,
          title: reviewData.title,
          comment: reviewData.comment,
          order_item_id: reviewData.order_item_id,
          is_verified_purchase: !!reviewData.order_item_id,
        })
        .select()
        .single();

      if (reviewError) throw reviewError;

      toast({
        title: "Review Submitted!",
        description: "Your review has been submitted and will be visible once approved.",
      });

      // Refresh reviews
      await fetchReviews();

      return newReview;
    } catch (err) {
      console.error("Error creating review:", err);
      setError(err instanceof Error ? err.message : "Failed to create review");
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateReview = async (reviewId: string, updates: Partial<CreateReviewData>) => {
    if (!user) {
      throw new Error("User must be logged in to update a review");
    }

    setLoading(true);
    setError(null);

    try {
      const { data: updatedReview, error: updateError } = await supabase
        .from("reviews")
        .update(updates)
        .eq("id", reviewId)
        .eq("user_id", user.id)
        .select()
        .single();

      if (updateError) throw updateError;

      toast({
        title: "Review Updated!",
        description: "Your review has been updated successfully.",
      });

      // Refresh reviews
      await fetchReviews();

      return updatedReview;
    } catch (err) {
      console.error("Error updating review:", err);
      setError(err instanceof Error ? err.message : "Failed to update review");
      toast({
        title: "Error",
        description: "Failed to update review. Please try again.",
        variant: "destructive",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (reviewId: string) => {
    if (!user) {
      throw new Error("User must be logged in to delete a review");
    }

    setLoading(true);
    setError(null);

    try {
      const { error: deleteError } = await supabase
        .from("reviews")
        .delete()
        .eq("id", reviewId)
        .eq("user_id", user.id);

      if (deleteError) throw deleteError;

      toast({
        title: "Review Deleted!",
        description: "Your review has been deleted successfully.",
      });

      // Refresh reviews
      await fetchReviews();
    } catch (err) {
      console.error("Error deleting review:", err);
      setError(err instanceof Error ? err.message : "Failed to delete review");
      toast({
        title: "Error",
        description: "Failed to delete review. Please try again.",
        variant: "destructive",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getUserReview = (reviewProductId: string) => {
    if (!user) return null;
    return reviews.find(review => 
      review.user_id === user.id && review.product_id === reviewProductId
    );
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return Number((sum / reviews.length).toFixed(1));
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating as keyof typeof distribution]++;
    });
    return distribution;
  };

  useEffect(() => {
    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  return {
    reviews,
    loading,
    error,
    createReview,
    updateReview,
    deleteReview,
    getUserReview,
    getAverageRating,
    getRatingDistribution,
    refetchReviews: fetchReviews,
  };
};