import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  showText?: boolean;
  size?: number;
}

const StarRating = ({ rating, showText = true, size = 16 }: StarRatingProps) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={
            star <= rating
              ? "fill-yellow-500 text-yellow-500"
              : "fill-gray-300 text-gray-300"
          }
        />
      ))}
      {showText && (
        <span className="ml-1 text-sm text-gray-600">({rating}/5)</span>
      )}
    </div>
  );
};

export default StarRating;
