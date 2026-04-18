import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import VoiceButton from "../components/VoiceButton";
import { useLanguage } from "../context/LanguageContext";
import { marketPrices } from "../data/marketPrices";
import "./Bazaar.css";

function getPriceStatus(price, modal) {
  if (!price || !modal) return "";
  const num = Number(price);

  if (num < modal * 0.9) return "Below Market";
  if (num > modal * 1.1) return "Premium Price";
  return "Fair Price";
}

export default function Bazaar() {
  const [show, setShow] = useState(false);
  const [activeSection, setActiveSection] = useState("browse");
  const navigate = useNavigate();
  const { t } = useLanguage();

  const sampleProducts = marketPrices.slice(0, 4).map((item) => ({
    ...item,
    sellerPrice: item.modal,
    status: getPriceStatus(item.modal, item.modal),
    location: "Local Market",
    seller: "Village Farmer",
  }));

  const bazaarReadText = `
    ${t.personalBazaar}.
    Two sections available.
    Sell your product.
    Browse market products.
    Market price guidance is available for vegetables and grains.
  `;

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bazaar-page">
      <div className={`bazaar-shell liquid-shell iphone-glass ${show ? "show" : ""}`}>
        <TopBar title={t.personalBazaar} />

        <div className={`bazaar-title-wrap slide-up delay-1 ${show ? "show" : ""}`}>
          <div className="bazaar-title">{t.personalBazaar}</div>
        </div>

        <div className={`voice-row slide-up delay-2 ${show ? "show" : ""}`}>
          <VoiceButton textToRead={bazaarReadText} />
        </div>

        <div className={`bazaar-switch-row slide-up delay-3 ${show ? "show" : ""}`}>
          <button
            className={activeSection === "sell" ? "bazaar-switch-btn active" : "bazaar-switch-btn"}
            onClick={() => {
              setActiveSection("sell");
              navigate("/bazaar/sell");
            }}
          >
            Sell Your Product
          </button>

          <button
            className={activeSection === "browse" ? "bazaar-switch-btn active" : "bazaar-switch-btn"}
            onClick={() => setActiveSection("browse")}
          >
            Browse Market Products
          </button>
        </div>

        <div className={`bazaar-board liquid-board iphone-glass slide-up delay-4 ${show ? "show" : ""}`}>
          <div className="bazaar-tools-row">
            <button className="small-action-btn">Sort</button>
            <button className="small-action-btn">Filter</button>
          </div>

          <div className="bazaar-products-list">
            {sampleProducts.map((item, index) => (
              <div
                key={item.name}
                className={`bazaar-product-card liquid-list-card iphone-glass slide-up delay-${index + 5} ${show ? "show" : ""}`}
              >
                <div className="bazaar-product-left">
                  <h3>{item.name}</h3>
                  <p>{item.category}</p>
                  <p>{item.location}</p>
                </div>

                <div className="bazaar-product-middle">
                  <span>Market: ₹{item.modal}/{item.unit}</span>
                  <span>Your Price: ₹{item.sellerPrice}/{item.unit}</span>
                </div>

                <div className="bazaar-product-right">
                  <span className={`price-status-pill ${item.status.toLowerCase().replace(/\s/g, "-")}`}>
                    {item.status}
                  </span>
                  <button className="glass-action-btn primary-glass-btn">View</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}