export default function EmptyState({
  title = "Nothing here yet",
  subtitle = "Try changing your search or filters.",
  action = null,
}) {
  return (
    <div className="empty-state-card liquid-shell iphone-glass">
      <div className="empty-state-icon">◎</div>
      <h3>{title}</h3>
      <p>{subtitle}</p>
      {action}
    </div>
  );
}