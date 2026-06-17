import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
}

export function StarRating({
  rating,
  max = 5,
  size = 14,
  interactive = false,
  onRate,
}: StarRatingProps) {
  return (
    <div className={`flex ${interactive ? "justify-center gap-2" : "gap-0.5"}`}>
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < rating;
        const star = (
          <Star
            key={i}
            size={size}
            className={filled ? "text-amber-400" : "text-muted"}
            fill={filled ? "currentColor" : "none"}
          />
        );

        if (interactive && onRate) {
          return (
            <button
              key={i}
              onClick={() => onRate(i + 1)}
              className="transition-transform hover:scale-110 cursor-pointer"
            >
              {star}
            </button>
          );
        }

        return star;
      })}
    </div>
  );
}
