export default function LoadingSkeleton({ rows = 3, kind = "list" }) {
  return (
    <div className={`skeleton-wrap skeleton-${kind}`}>
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton-line skeleton-line-lg" />
          <div className="skeleton-line" />
          <div className="skeleton-line skeleton-line-sm" />
        </div>
      ))}
    </div>
  );
}