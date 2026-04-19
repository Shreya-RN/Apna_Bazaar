import { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import VoiceButton from "../components/VoiceButton";
import { useLanguage } from "../context/LanguageContext";
import { addEquipmentListing } from "../api/equipmentApi";
import "./EquipmentSell.css";

export default function EquipmentSell() {
  const [show, setShow] = useState(false);
  const { t } = useLanguage();
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    listingType: "sell",
    imageUrl: "",
    itemCondition: "Good",
    nameModel: "",
    age: "",
    price: "",
    location: "",
    contact: "",
    description: "",
  });

  const sellReadText = `
    ${t.equipment}. ${t.sell}.
    Add your equipment for selling.
  `;

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
      await addEquipmentListing(form);
      setMessage("Equipment posted successfully");
      setForm({
        listingType: "sell",
        imageUrl: "",
        itemCondition: "Good",
        nameModel: "",
        age: "",
        price: "",
        location: "",
        contact: "",
        description: "",
      });
    } catch (error) {
      setMessage(error.message);
    }
  };

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

        <form
          className={`sell-board liquid-board iphone-glass slide-up delay-3 ${show ? "show" : ""}`}
          onSubmit={handleSubmit}
        >
          <div className="sell-form-grid">
            <div className="glass-input-group">
              <label>Image URL</label>
              <input name="imageUrl" value={form.imageUrl} onChange={handleChange} />
            </div>

            <div className="glass-input-group">
              <label>Condition</label>
              <select name="itemCondition" value={form.itemCondition} onChange={handleChange}>
                <option>Excellent</option>
                <option>Good</option>
                <option>Average</option>
                <option>Needs Repair</option>
              </select>
            </div>

            <div className="glass-input-group">
              <label>Name / Model</label>
              <input name="nameModel" value={form.nameModel} onChange={handleChange} />
            </div>

            <div className="glass-input-group">
              <label>Age</label>
              <input name="age" value={form.age} onChange={handleChange} />
            </div>

            <div className="glass-input-group">
              <label>Price</label>
              <input name="price" value={form.price} onChange={handleChange} />
            </div>

            <div className="glass-input-group">
              <label>Location</label>
              <input name="location" value={form.location} onChange={handleChange} />
            </div>

            <div className="glass-input-group">
              <label>Contact</label>
              <input name="contact" value={form.contact} onChange={handleChange} />
            </div>
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

          <div className="sell-actions">
            <button type="submit" className="glass-action-btn primary-glass-btn">
              Post for Sale
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}