import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import VoiceButton from "../components/VoiceButton";
import { useLanguage } from "../context/LanguageContext";
import "./Equipment.css";

export default function Equipment() {
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState("buy");
  const navigate = useNavigate();
  const { t } = useLanguage();

  const equipmentReadText = `
    ${t.equipment}.
    ${t.buy}. ${t.sell}. ${t.rent}.
    ${t.recommendation}.
    ${t.rec1}.
    ${t.rec2}.
  `;

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
          <div className="recommendation-tag">{t.recommendation}</div>

          <div className="recommendation-list">
            <div className={`recommendation-card liquid-list-card iphone-glass slide-up delay-5 ${show ? "show" : ""}`}>
              {t.rec1}
            </div>
            <div className={`recommendation-card liquid-list-card iphone-glass slide-up delay-6 ${show ? "show" : ""}`}>
              {t.rec2}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}