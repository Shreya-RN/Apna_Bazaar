import { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import VoiceButton from "../components/VoiceButton";
import { useLanguage } from "../context/LanguageContext";
import "./EquipmentBuy.css";

export default function EquipmentBuy() {
  const [show, setShow] = useState(false);
  const { t } = useLanguage();

  const buyOptions = [t.buyOption1, t.buyOption2, t.buyOption3, t.buyOption4];

  const buyReadText = `
    ${t.equipment}. ${t.buy}.
    ${t.sort}. ${t.filter}.
    ${t.buyOption1}.
    ${t.buyOption2}.
    ${t.buyOption3}.
    ${t.buyOption4}.
  `;

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="buy-page">
      <div className={`buy-shell liquid-shell ${show ? "show" : ""}`}>
        <TopBar title={t.equipment} />

        <div className={`buy-title-wrap slide-up delay-1 ${show ? "show" : ""}`}>
          <div className="buy-title">{t.buy}</div>
        </div>

        <div className={`voice-row slide-up delay-2 ${show ? "show" : ""}`}>
          <VoiceButton textToRead={buyReadText} />
        </div>

        <div className={`buy-board liquid-board slide-up delay-3 ${show ? "show" : ""}`}>
          <div className="buy-tools-row">
            <button className="small-action-btn">{t.sort}</button>
            <button className="small-action-btn">{t.filter}</button>
          </div>

          <div className="buy-options-list">
            {buyOptions.map((item, index) => (
              <div
                key={item}
                className={`buy-option-card liquid-list-card slide-up delay-${index + 3} ${show ? "show" : ""}`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}