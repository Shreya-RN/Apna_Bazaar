import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import VoiceButton from "../components/VoiceButton";
import { useLanguage } from "../context/LanguageContext";
import { getEquipmentListings } from "../api/equipmentApi";
import "./Equipment.css";

export default function Equipment() {
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState("buy");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { t } = useLanguage();

  const equipmentReadText = `
    ${t.equipment}.
    ${t.buy}. ${t.sell}. ${t.rent}.
    Available equipment listings are loaded dynamically.
  `;

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function loadItems() {
      try {
        const result = await getEquipmentListings();
       setItems(result || []);
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    }

    loadItems();
  }, []);

  const recommendations = items.slice(0, 2);

  return (
    <div className="equipment-page">
      <div className={`equipment-shell liquid-shell iphone-glass ${show ? "show" : ""}`}>
        <TopBar title={t.equipment} />

        <div className={`equipment-title-wrap slide-up delay-1 ${show ? "show" : ""}`}>
          <div className="equipment-title">{t.equipment}</div>
        </div>

        <div className={`equipment-actions slide-up delay-2 ${show ? "show" : ""}`}>
          <button
            className={activeTab === "buy" ? "equip-btn active" : "equip-btn"}
            onClick={() => {
              setActiveTab("buy");
              navigate("/equipment/buy");
            }}
          >
            {t.buy}
          </button>

          <button
            className={activeTab === "sell" ? "equip-btn active" : "equip-btn"}
            onClick={() => {
              setActiveTab("sell");
              navigate("/equipment/sell");
            }}
          >
            {t.sell}
          </button>

          <button
            className={activeTab === "rent" ? "equip-btn active" : "equip-btn"}
            onClick={() => {
              setActiveTab("rent");
              navigate("/equipment/rent");
            }}
          >
            {t.rent}
          </button>
        </div>

        <div className={`voice-row slide-up delay-3 ${show ? "show" : ""}`}>
          <VoiceButton textToRead={equipmentReadText} />
        </div>

        <div className={`equipment-board liquid-board iphone-glass slide-up delay-4 ${show ? "show" : ""}`}>
          <div className="recommendation-tag">
            {loading ? "Loading..." : t.recommendation}
          </div>

          <div className="recommendation-list">
            {!loading &&
              recommendations.map((item, index) => (
                <div
                  key={item.id || index}
                  className={`recommendation-card liquid-list-card iphone-glass slide-up delay-${index + 5} ${show ? "show" : ""}`}
                >
                  {item.nameModel || item.name_model || item.name || "Equipment"}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
