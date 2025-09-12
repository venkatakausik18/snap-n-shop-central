import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useReviews, CreateReviewData } from "@/hooks/useReviews";
import { useAuth } from "@/hooks/useAuth";

interface ReviewFormProps {
  productId: string;
  onReviewSubmitted?: () => void;
  existingReview?: any;
  orderItemId?: string;
}

const ReviewForm = ({ productId, onReviewSubmitted, existingReview, orderItemId }: ReviewFormProps) => {
  const { user } = useAuth();
  const { createReview, updateReview, loading } = useReviews();
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [title, setTitle] = useState(existingReview?.title || "");
  const [comment, setComment] = useState(existingReview?.comment || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      return;
    }

    if (rating === 0) {
      return;
    }

    try {
      const reviewData: CreateReviewData = {
        product_id: productId,
        rating,
        title: title.trim() || undefined,
        comment: comment.trim() || undefined,
        order_item_id: orderItemId,
      };

      if (existingReview) {
        await updateReview(existingReview.id, reviewData);
      } else {
        await createReview(reviewData);
      }

      // Reset form
      setRating(0);
      setTitle("");
      setComment("");

      onReviewSubmitted?.();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Please sign in to write a review.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{existingReview ? "Edit Your Review" : "Write a Review"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating */}
          <div>
            <Label>Rating *</Label>
            <div className="flex items-center space-x-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="p-1"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= (hoveredRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <Label htmlFor="title">Review Title (Optional)</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summarize your experience..."
              maxLength={100}
            />
          </div>

          {/* Comment */}
          <div>
            <Label htmlFor="comment">Your Review (Optional)</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share details about your experience with this product..."
              rows={4}
              maxLength={1000}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {comment.length}/1000 characters
            </p>
          </div>

          {orderItemId && (
            <div className="bg-success/10 p-3 rounded-lg">
              <p className="text-sm text-success-foreground">
                ✓ Verified Purchase - This review will be marked as a verified purchase
              </p>
            </div>
          )}

          <Button type="submit" disabled={loading || rating === 0} className="w-full">
            {loading ? "Submitting..." : existingReview ? "Update Review" : "Submit Review"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;