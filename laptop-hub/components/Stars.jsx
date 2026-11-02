import { Star } from "lucide-react";

export default function Stars({ rating = 5, size = 13, showValue = false, className = "" }) {
  const rounded = Math.round(rating);

  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <span
        className="inline-flex items-center gap-0.5 text-amber-400"
        aria-label={`Rated ${rating} out of 5`}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            style={{ width: size, height: size }}
            fill={star <= rounded ? "currentColor" : "none"}
            strokeWidth={1.8}
            className={star <= rounded ? "" : "text-slate-300"}
            aria-hidden="true"
          />
        ))}
      </span>
      {showValue ? (
        <span className="text-xs font-semibold text-slate-500">{rating.toFixed(1)}</span>
      ) : null}
    </span>
  );
}
