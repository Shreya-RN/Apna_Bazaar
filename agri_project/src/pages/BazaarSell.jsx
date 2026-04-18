import { useEffect, useMemo, useState } from "react";
import TopBar from "../components/TopBar";
import VoiceButton from "../components/VoiceButton";
import { useLanguage } from "../context/LanguageContext";
import { marketPrices } from "../data/marketPrices";
import "./BazaarSell.css";

function getPriceStatus(price, modal) {
  if (!price || !modal) return "";
  const num = Number(price);

  if (num < modal * 0.9) return "Below Market";
  if (num > modal * 1.1) return "Premium Price";
  return "Fair Price";
}

export default function BazaarSell() {
  const [show, setShow] = useState(false);
  const { t } = useLanguage();

  const [selectedProductName, setSelectedProductName] = useState("Potato");
  const [sellerPrice, setSellerPrice] = useState("");

  const selectedProduct = useMemo(
    () => marketPrices.find((item) => item.name === selectedProductName),
    [selectedProductName]
  );

  const priceStatus = getPriceStatus(sellerPrice, selectedProduct?.modal);

  const bazaarSellReadText = `
    ${t.personalBazaar}.
    Sell your product.
    Select product, check market minimum, modal and maximum price,
    then enter your selling price, location, contact and description.
  `;

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bazaar-sell-page">
      <div className={`bazaar-sell-shell liquid-shell iphone-glass ${show ? "show" : ""}`}>
        <TopBar title={t.personalBazaar} />

        <div className={`bazaar-sell-title-wrap slide-up delay-1 ${show ? "show" : ""}`}>
          <div className="bazaar-sell-title">Sell Your Product</div>
        </div>

        <div className={`voice-row slide-up delay-2 ${show ? "show" : ""}`}>
          <VoiceButton textToRead={bazaarSellReadText} />
        </div>

        <div className={`bazaar-sell-board liquid-board iphone-glass slide-up delay-3 ${show ? "show" : ""}`}>
          <div className="glass-orb orb-1" />
          <div className="glass-orb orb-2" />

          <div className="bazaar-sell-grid">
            <div className="glass-input-group">
              <label>Image</label>
              <input type="file" accept="image/*" />
            </div>

            <div className="glass-input-group">
              <label>Product</label>
              <select
                value={selectedProductName}
                onChange={(e) => setSelectedProductName(e.target.value)}
              >
                {marketPrices.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="glass-input-group">
              <label>Category</label>
              <input type="text" value={selectedProduct?.category || ""} readOnly />
            </div>

            <div className="glass-input-group">
              <label>Unit</label>
              <input type="text" value={selectedProduct?.unit || ""} readOnly />
            </div>

            <div className="glass-input-group">
              <label>Quantity Available</label>
              <input type="text" placeholder="e.g. 100 kg" />
            </div>

            <div className="glass-input-group">
              <label>Location</label>
              <input type="text" placeholder="Enter village / mandi / area" />
            </div>

            <div className="glass-input-group">
              <label>Market Min Price</label>
              <input type="text" value={selectedProduct ? `₹${selectedProduct.min}/${selectedProduct.unit}` : ""} readOnly />
            </div>

            <div className="glass-input-group">
              <label>Market Modal Price</label>
              <input type="text" value={selectedProduct ? `₹${selectedProduct.modal}/${selectedProduct.unit}` : ""} readOnly />
            </div>

            <div className="glass-input-group">
              <label>Market Max Price</label>
              <input type="text" value={selectedProduct ? `₹${selectedProduct.max}/${selectedProduct.unit}` : ""} readOnly />
            </div>

            <div className="glass-input-group">
              <label>Your Price</label>
              <input
                type="number"
                placeholder="Enter your selling price"
                value={sellerPrice}
                onChange={(e) => setSellerPrice(e.target.value)}
              />
            </div>

            <div className="glass-input-group">
              <label>Contact</label>
              <input type="text" placeholder="Enter contact number" />
            </div>
          </div>

          <div className="market-status-row">
            {sellerPrice ? (
              <div className={`price-status-pill ${priceStatus.toLowerCase().replace(/\s/g, "-")}`}>
                {priceStatus}
              </div>
            ) : (
              <div className="price-status-pill neutral">Price status will appear here</div>
            )}
          </div>

          <div className="glass-input-group full-width">
            <label>Description</label>
            <textarea
              placeholder="Mention freshness, quality, harvest date, and extra delivery details"
              rows="5"
            />
          </div>

          <div className="bazaar-sell-actions">
            <button className="glass-action-btn primary-glass-btn">Post Product</button>
            <button className="glass-action-btn secondary-glass-btn">Save Draft</button>
          </div>
        </div>
      </div>
    </div>
  );
}