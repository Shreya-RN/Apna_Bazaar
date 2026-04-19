import { createContext, useContext, useMemo, useState } from "react";

const RecentlyViewedContext = createContext();

export function RecentlyViewedProvider({ children }) {
  const [items, setItems] = useState(() => {
    const raw = localStorage.getItem("apnabazaar_recently_viewed");
    return raw ? JSON.parse(raw) : [];
  });

  const addRecentlyViewed = (item) => {
    if (!item?.id) return;

    const next = [
      item,
      ...items.filter((entry) => !(entry.id === item.id && entry.type === item.type)),
    ].slice(0, 8);

    setItems(next);
    localStorage.setItem("apnabazaar_recently_viewed", JSON.stringify(next));
  };

  const value = useMemo(
    () => ({ recentlyViewed: items, addRecentlyViewed }),
    [items]
  );

  return (
    <RecentlyViewedContext.Provider value={value}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  return useContext(RecentlyViewedContext);
}