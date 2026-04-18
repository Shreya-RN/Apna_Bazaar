import { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import VoiceButton from "../components/VoiceButton";
import { useLanguage } from "../context/LanguageContext";
import "./EquipmentSell.css";

export default function EquipmentSell() {
  const [show, setShow] = useState(false);
  const { t } = useLanguage();

  const sellReadText = `
    ${t.equipment}. ${t.sell}.
    Add your equipment for selling.
    Upload image, select condition, enter name or model, age, price, location, contact, and description.
  `;

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="sell-page">
      <div className={`sell-shell liquid-shell iphone-glass ${show ? "show" : ""}`}>
        <TopBar title={t.equipment} />

        <div className={`sell-title-wrap slide-up delay-1 ${show ? "show" : ""}`}>
          <div className="sell-title">{t.sell}</div>
        </div>

        <div className={`voice-row slide-up delay-2 ${show ? "show" : ""}`}>
          <VoiceButton textToRead={sellReadText} />
        </div>

        <div className={`sell-board liquid-board iphone-glass slide-up delay-3 ${show ? "show" : ""}`}>
          <div className="glass-orb orb-1" />
          <div className="glass-orb orb-2" />

          <div className="sell-form-grid">
            <div className="glass-input-group">
              <label>Image</label>
              <input type="file" accept="image/*" />
            </div>

            <div className="glass-input-group">
              <label>Condition</label>
              <select>
                <option>Excellent</option>
                <option>Good</option>
                <option>Average</option>
                <option>Needs Repair</option>
              </select>
            </div>

            <div className="glass-input-group">
              <label>Name / Model</label>
              <input type="text" placeholder="Enter equipment name or model" />
            </div>

            <div className="glass-input-group">
              <label>Age</label>
              <input type="text" placeholder="e.g. 2 years" />
            </div>

            <div className="glass-input-group">
              <label>Price</label>
              <input type="text" placeholder="Enter selling price" />
            </div>

            <div className="glass-input-group">
              <label>Location</label>
              <input type="text" placeholder="Enter village / area" />
            </div>

            <div className="glass-input-group">
              <label>Contact</label>
              <input type="text" placeholder="Enter contact number" />
            </div>
          </div>

          <div className="glass-input-group full-width">
            <label>Description</label>
            <textarea
              placeholder="Describe the equipment condition, usage, model details, and any extra information"
              rows="5"
            />
          </div>

          <div className="sell-actions">
            <button className="glass-action-btn primary-glass-btn">Post for Sale</button>
            <button className="glass-action-btn secondary-glass-btn">Save Draft</button>
          </div>
        </div>
      </div>
    </div>
  );
}