import { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import VoiceButton from "../components/VoiceButton";
import { useLanguage } from "../context/LanguageContext";
import "./EquipmentRent.css";

const rentalItems = [
  { name: "Mini Tractor", price: "₹1500 / day", location: "Village Center" },
  { name: "Water Pump", price: "₹400 / day", location: "South Field Road" },
  { name: "Power Tiller", price: "₹900 / day", location: "Market Side" },
  { name: "Sprayer Machine", price: "₹250 / day", location: "Main Bazaar" },
];

export default function EquipmentRent() {
  const [show, setShow] = useState(false);
  const [activeSection, setActiveSection] = useState("give");
  const { t } = useLanguage();

  const rentReadText = `
    ${t.equipment}. ${t.rent}.
    Two sections available.
    Give equipment for rent.
    Or look for rental products.
  `;

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="rent-page">
      <div className={`rent-shell liquid-shell iphone-glass ${show ? "show" : ""}`}>
        <TopBar title={t.equipment} />

        <div className={`rent-title-wrap slide-up delay-1 ${show ? "show" : ""}`}>
          <div className="rent-title">{t.rent}</div>
        </div>

        <div className={`voice-row slide-up delay-2 ${show ? "show" : ""}`}>
          <VoiceButton textToRead={rentReadText} />
        </div>

        <div className={`rent-switch-row slide-up delay-3 ${show ? "show" : ""}`}>
          <button
            className={activeSection === "give" ? "rent-switch-btn active" : "rent-switch-btn"}
            onClick={() => setActiveSection("give")}
          >
            Give for Rent
          </button>

          <button
            className={activeSection === "look" ? "rent-switch-btn active" : "rent-switch-btn"}
            onClick={() => setActiveSection("look")}
          >
            Looking for Rental Products
          </button>
        </div>

        {activeSection === "give" ? (
          <div className={`rent-board liquid-board iphone-glass slide-up delay-4 ${show ? "show" : ""}`}>
            <div className="glass-orb orb-1" />
            <div className="glass-orb orb-2" />

            <div className="rent-form-grid">
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
                <label>Rental Price</label>
                <input type="text" placeholder="Enter rent per day / week" />
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
                placeholder="Describe condition, usage, availability, and extra details"
                rows="5"
              />
            </div>

            <div className="rent-actions">
              <button className="glass-action-btn primary-glass-btn">Post for Rent</button>
              <button className="glass-action-btn secondary-glass-btn">Save Draft</button>
            </div>
          </div>
        ) : (
          <div className={`rent-board liquid-board iphone-glass slide-up delay-4 ${show ? "show" : ""}`}>
            <div className="rent-tools-row">
              <button className="small-action-btn">Sort</button>
              <button className="small-action-btn">Filter</button>
            </div>

            <div className="rent-options-list">
              {rentalItems.map((item, index) => (
                <div
                  key={item.name}
                  className={`rent-option-card liquid-list-card iphone-glass slide-up delay-${index + 5} ${show ? "show" : ""}`}
                >
                  <div className="rent-option-left">
                    <h3>{item.name}</h3>
                    <p>{item.location}</p>
                  </div>

                  <div className="rent-option-right">
                    <span>{item.price}</span>
                    <button className="glass-action-btn primary-glass-btn">Rent Now</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}