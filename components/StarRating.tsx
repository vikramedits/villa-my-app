"use client";

type Props = {
  rating: number;
  max?: number;
  showValue?: boolean;
};

export default function StarRating({
  rating,
  max = 5,
  showValue = true,
}: Props) {
  const safeRating = Math.max(0, Math.min(rating, max));
  const percentage = (safeRating / max) * 100;

  return (
    <div className="flex items-center gap-2">
      <div
        className="relative inline-block text-xl leading-none"
        aria-label={`Rating ${safeRating} out of ${max}`}
        role="img"
      >
        <span className="text-gray-300 select-none">★★★★★</span>
        <span
          className="absolute top-0 left-0 overflow-hidden text-yellow-400"
          style={{ width: `${percentage}%` }}
        >
          ★★★★★
        </span>
      </div>

      {showValue && (
        <span className="text-xs text-gray-600 font-medium">
          {safeRating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
