export default function SmartSuggestions({ items = [] }) {
  if (!items.length) return null;

  return (
    <div className="home-info-card liquid-shell iphone-glass">
      <h3>Smart Suggestions</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}