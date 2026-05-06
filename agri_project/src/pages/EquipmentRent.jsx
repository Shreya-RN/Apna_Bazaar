import { useEffect, useMemo, useState } from "react";
import TopBar from "../components/TopBar";
import VoiceButton from "../components/VoiceButton";
import DetailsModal from "../components/DetailsModal";
import LoadingSkeleton from "../components/LoadingSkeleton";
import EmptyState from "../components/EmptyState";
import VerifiedBadge from "../components/VerifiedBadge";
import RatingStars from "../components/RatingStars";
import DemandBadge from "../components/DemandBadge";
import VoiceSearchButton from "../components/VoiceSearchButton";
import MapViewCard from "../components/MapViewCard";
import InlineActions from "../components/InlineActions";

import { useLanguage } from "../context/LanguageContext";
import { useToast } from "../context/ToastContext";
import { useRecentlyViewed } from "../context/RecentlyViewedContext";

import { addEquipmentListing, getEquipmentListings } from "../api/equipmentApi";
import "./EquipmentRent.css";

export default function EquipmentRent() {
  const [show, setShow] = useState(false);
  const [activeSection, setActiveSection] = useState("give");
  const [rentItems, setRentItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [conditionFilter, setConditionFilter] = useState("All");

  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { t } = useLanguage();
  const { showToast } = useToast();
  const { addRecentlyViewed } = useRecentlyViewed();

  const [form, setForm] = useState({
    listingType: "rent",
    imageUrl: "",
    itemCondition: "Good",
    nameModel: "",
    age: "",
    price: "",
    location: "",
    contact: "",
    description: "",
    latitude: "",
    longitude: "",
  });

  const rentReadText = `
    ${t.equipment}. ${t.rent}.
    Two sections available.
    Give equipment for rent.
    Or look for rental products.
    Search, sort and filter options are available.
  `;

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function loadRentItems() {
      try {
        const result = await getEquipmentListings("rent");
        setRentItems(result || []);
      } catch {
        setRentItems([]);
      } finally {
        setLoading(false);
      }
    }

    loadRentItems();
  }, []);

  const conditions = useMemo(() => {
    const values = rentItems
      .map((item) => item.itemCondition || item.item_condition)
      .filter(Boolean);
    return ["All", ...new Set(values)];
  }, [rentItems]);

  const filteredRentItems = useMemo(() => {
    let result = [...rentItems];

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter((item) => {
        const name = String(item.nameModel || item.name_model || item.name || "").toLowerCase();
        const location = String(item.location || "").toLowerCase();
        const condition = String(item.itemCondition || item.item_condition || "").toLowerCase();
        return name.includes(q) || location.includes(q) || condition.includes(q);
      });
    }

    if (conditionFilter !== "All") {
      result = result.filter(
        (item) => (item.itemCondition || item.item_condition) === conditionFilter
      );
    }

    if (sortBy === "priceLowHigh") {
      result.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
    } else if (sortBy === "priceHighLow") {
      result.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
    } else {
      result.sort((a, b) => Number(b.id || 0) - Number(a.id || 0));
    }

    return result;
  }, [rentItems, searchTerm, sortBy, conditionFilter]);

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
      setMessage("Equipment posted for rent");
      showToast("Equipment posted for rent", "success");

      setForm({
        listingType: "rent",
        imageUrl: "",
        itemCondition: "Good",
        nameModel: "",
        age: "",
        price: "",
        location: "",
        contact: "",
        description: "",
        latitude: "",
        longitude: "",
      });
    } catch (error) {
      setMessage(error.message);
      showToast(error.message || "Failed to post rental equipment", "error");
    }
  };

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
          <form
            className={`rent-board liquid-board iphone-glass slide-up delay-4 ${show ? "show" : ""}`}
            onSubmit={handleSubmit}
          >
            <div className="rent-form-grid">
              <div className="glass-input-group">
                <label>Image URL</label>
                <input
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={handleChange}
                  placeholder="Paste image URL"
                />
              </div>

              <div className="glass-input-group">
                <label>Condition</label>
                <select
                  name="itemCondition"
                  value={form.itemCondition}
                  onChange={handleChange}
                >
                  <option>Excellent</option>
                  <option>Good</option>
                  <option>Average</option>
                  <option>Needs Repair</option>
                </select>
              </div>

              <div className="glass-input-group">
                <label>Name / Model</label>
                <input
                  name="nameModel"
                  value={form.nameModel}
                  onChange={handleChange}
                  placeholder="Enter equipment name/model"
                />
              </div>

              <div className="glass-input-group">
                <label>Age</label>
                <input
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  placeholder="e.g. 2 years"
                />
              </div>

              <div className="glass-input-group">
                <label>Rental Price</label>
                <input
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Enter rent price"
                />
              </div>

              <div className="glass-input-group">
                <label>Location</label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Village / area"
                />
              </div>

              <div className="glass-input-group">
                <label>Contact</label>
                <input
                  name="contact"
                  value={form.contact}
                  onChange={handleChange}
                  placeholder="Contact number"
                />
              </div>

              <div className="glass-input-group">
                <label>Latitude</label>
                <input
                  name="latitude"
                  value={form.latitude}
                  onChange={handleChange}
                  placeholder="Optional latitude"
                />
              </div>

              <div className="glass-input-group">
                <label>Longitude</label>
                <input
                  name="longitude"
                  value={form.longitude}
                  onChange={handleChange}
                  placeholder="Optional longitude"
                />
              </div>
            </div>

            <div className="glass-input-group full-width">
              <label>Description</label>
              <textarea
                name="description"
                rows="5"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe condition, usage, availability and extra details"
              />
            </div>

            {message ? <div className="profile-message">{message}</div> : null}

            <div className="rent-actions">
              <button type="submit" className="glass-action-btn primary-glass-btn">
                Post for Rent
              </button>
            </div>
          </form>
        ) : (
          <div className={`rent-board liquid-board iphone-glass slide-up delay-4 ${show ? "show" : ""}`}>
            <div className="equipment-advanced-toolbar">
              <div className="equipment-search-wrap">
                <div className="advanced-search-row">
                  <input
                    type="text"
                    className="equipment-search-input"
                    placeholder="Search rental equipment..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <VoiceSearchButton onResult={setSearchTerm} />
                </div>
              </div>

              <div className="equipment-filter-group">
                <select
                  className="equipment-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="latest">Latest</option>
                  <option value="priceLowHigh">Price: Low to High</option>
                  <option value="priceHighLow">Price: High to Low</option>
                </select>

                <select
                  className="equipment-select"
                  value={conditionFilter}
                  onChange={(e) => setConditionFilter(e.target.value)}
                >
                  {conditions.map((condition) => (
                    <option key={condition} value={condition}>
                      {condition}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="equipment-results-meta">
              {loading ? "Loading rental equipment..." : `${filteredRentItems.length} rental listing(s) found`}
            </div>

            {loading ? (
              <LoadingSkeleton rows={4} kind="list" />
            ) : filteredRentItems.length === 0 ? (
              <EmptyState
                title="No matching rental equipment found"
                subtitle="Try changing your search or filters."
                action={
                  <button
                    className="glass-action-btn primary-glass-btn"
                    onClick={() => {
                      setSearchTerm("");
                      setConditionFilter("All");
                      setSortBy("latest");
                    }}
                  >
                    Reset Filters
                  </button>
                }
              />
            ) : (
              <div className="rent-options-list">
                {filteredRentItems.map((item, index) => (
                  <div
                    key={item.id || index}
                    className={`rent-option-card liquid-list-card iphone-glass slide-up delay-${Math.min(index + 5, 8)} ${show ? "show" : ""}`}
                  >
                    <div className="rent-option-left">
                      <div className="equipment-card-topline">
                        <h3>{item.nameModel || item.name_model || item.name}</h3>
                        <VerifiedBadge verified={item.verified ?? true} />
                      </div>

                      <p>{item.location}</p>

                      <div className="equipment-badge-row">
                        <span className="equipment-condition-pill">
                          {item.itemCondition || item.item_condition || "Unknown"}
                        </span>
                        <RatingStars rating={item.rating ?? 4.5} />
                        <DemandBadge demand={item.demand || "High"} />
                      </div>
                    </div>

                    <div className="rent-option-right">
                      <span>₹{item.price}</span>

                      <InlineActions
                        primaryLabel="Quick View"
                        secondaryLabel="Contact"
                        onView={() => {
                          setSelectedItem(item);
                          setModalOpen(true);

                          addRecentlyViewed({
                            id: item.id,
                            type: "equipment-rent",
                            title: item.nameModel || item.name_model || item.name,
                            path: "/equipment/rent",
                          });

                          showToast("Opened rental equipment details", "success");
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <DetailsModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title={selectedItem?.nameModel || selectedItem?.name_model || selectedItem?.name || "Rental Equipment"}
          fields={[
            { label: "Condition", value: selectedItem?.itemCondition || selectedItem?.item_condition },
            { label: "Age", value: selectedItem?.age },
            { label: "Rental Price", value: selectedItem ? `₹${selectedItem.price || "—"}` : "" },
            { label: "Location", value: selectedItem?.location },
            { label: "Contact", value: selectedItem?.contact },
            { label: "Description", value: selectedItem?.description },
          ]}
          extraContent={
            <MapViewCard
              lat={
                selectedItem?.latitude !== undefined && selectedItem?.latitude !== ""
                  ? Number(selectedItem.latitude)
                  : undefined
              }
              lng={
                selectedItem?.longitude !== undefined && selectedItem?.longitude !== ""
                  ? Number(selectedItem.longitude)
                  : undefined
              }
              label={selectedItem?.location || "Rental Equipment Location"}
            />
          }
          actions={
            <>
              <button
                className="glass-action-btn secondary-glass-btn"
                onClick={() => setModalOpen(false)}
              >
                Close
              </button>

              <button
                className="glass-action-btn primary-glass-btn"
                onClick={() => showToast("Rent request triggered", "success")}
              >
                Send Rent Request
              </button>
            </>
          }
        />
      </div>
    </div>
  );
}
