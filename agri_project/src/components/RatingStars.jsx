export default function RatingStars({ rating = 4.5 }) {
  return (
    <div className="rating-stars">
      <span>★</span>
      <span>{rating}</span>
    </div>
  );
}