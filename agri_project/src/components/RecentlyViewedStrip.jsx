import { useNavigate } from "react-router-dom";
import { useRecentlyViewed } from "../context/RecentlyViewedContext";

export default function RecentlyViewedStrip() {
  const { recentlyViewed } = useRecentlyViewed();
  const navigate = useNavigate();

  if (!recentlyViewed.length) return null;

  return (
    <div className="recent-strip liquid-shell iphone-glass">
      <div className="recent-strip-title">Recently Viewed</div>
      <div className="recent-strip-track">
        {recentlyViewed.map((item) => (
          <button
            key={`${item.type}-${item.id}`}
            className="recent-chip"
            onClick={() => item.path && navigate(item.path)}
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
}