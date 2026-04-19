import { useEffect, useMemo, useState } from "react";
import TopBar from "../components/TopBar";
import VoiceButton from "../components/VoiceButton";
import { useLanguage } from "../context/LanguageContext";
import { getMarketPrices } from "../api/marketApi";
import { addBazaarProduct } from "../api/bazaarApi";
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

  const [marketPriceList, setMarketPriceList] = useState([]);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    imageUrl: "",
    productName: "",
    category: "",
    quantity: "",
    unit: "",
    marketMin: "",
    marketModal: "",
    marketMax: "",
    sellerPrice: "",
    location: "",
    contact: "",
    description: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function loadPrices() {
      try {
        const result = await getMarketPrices();
        const list = result.data || [];
        setMarketPriceList(list);

        if (list.length) {
          const first = list[0];
          setForm((prev) => ({
            ...prev,
            productName: first.productName || first.name,
            category: first.category,
            unit: first.unit,
            marketMin: first.minPrice || first.min,
            marketModal: first.modalPrice || first.modal,
            marketMax: first.maxPrice || first.max,
          }));
        }
      } catch {
        setMarketPriceList([]);
      }
    }

    loadPrices();
  }, []);

  const selectedProduct = useMemo(
    () =>
      marketPriceList.find(
        (item) =>
          (item.productName || item.name) === form.productName
      ),
    [marketPriceList, form.productName]
  );

  useEffect(() => {
    if (!selectedProduct) return;

    setForm((prev) => ({
      ...prev,
      category: selectedProduct.category,
      unit: selectedProduct.unit,
      marketMin: selectedProduct.minPrice || selectedProduct.min,
      marketModal: selectedProduct.modalPrice || selectedProduct.modal,
      marketMax: selectedProduct.maxPrice || selectedProduct.max,
    }));
  }, [selectedProduct]);

  const priceStatus = getPriceStatus(form.sellerPrice, form.marketModal);

  const bazaarSellReadText = `
    ${t.personalBazaar}.
    Sell your product.
    Select product, check market minimum, modal and maximum price,
    then enter your selling price, location, contact and description.
  `;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await addBazaarProduct(form);
      setMessage("Product posted successfully");
      setForm((prev) => ({
        ...prev,
        quantity: "",
        sellerPrice: "",
        location: "",
        contact: "",
        description: "",
        imageUrl: "",
      }));
    } catch (error) {
      setMessage(error.message);
    }
  };

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

        <form
          className={`bazaar-sell-board liquid-board iphone-glass slide-up delay-3 ${show ? "show" : ""}`}
          onSubmit={handleSubmit}
        >
          <div className="bazaar-sell-grid">
            <div className="glass-input-group">
              <label>Image URL</label>
              <input name="imageUrl" value={form.imageUrl} onChange={handleChange} />
            </div>

            <div className="glass-input-group">
              <label>Product</label>
              <select
                name="productName"
                value={form.productName}
                onChange={handleChange}
              >
                {marketPriceList.map((item) => (
                  <option key={item.id || item.productName || item.name} value={item.productName || item.name}>
                    {item.productName || item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="glass-input-group">
              <label>Category</label>
              <input name="category" value={form.category} readOnly />
            </div>

            <div className="glass-input-group">
              <label>Unit</label>
              <input name="unit" value={form.unit} readOnly />
            </div>

            <div className="glass-input-group">
              <label>Quantity Available</label>
              <input name="quantity" value={form.quantity} onChange={handleChange} />
            </div>

            <div className="glass-input-group">
              <label>Location</label>
              <input name="location" value={form.location} onChange={handleChange} />
            </div>

            <div className="glass-input-group">
              <label>Market Min Price</label>
              <input value={`₹${form.marketMin}/${form.unit}`} readOnly />
            </div>

            <div className="glass-input-group">
              <label>Market Modal Price</label>
              <input value={`₹${form.marketModal}/${form.unit}`} readOnly />
            </div>

            <div className="glass-input-group">
              <label>Market Max Price</label>
              <input value={`₹${form.marketMax}/${form.unit}`} readOnly />
            </div>

            <div className="glass-input-group">
              <label>Your Price</label>
              <input
                name="sellerPrice"
                type="number"
                value={form.sellerPrice}
                onChange={handleChange}
              />
            </div>

            <div className="glass-input-group">
              <label>Contact</label>
              <input name="contact" value={form.contact} onChange={handleChange} />
            </div>
          </div>

          <div className="market-status-row">
            {form.sellerPrice ? (
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
              name="description"
              rows="5"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          {message ? <div className="profile-message">{message}</div> : null}

          <div className="bazaar-sell-actions">
            <button type="submit" className="glass-action-btn primary-glass-btn">
              Post Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}