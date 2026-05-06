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

import { getEquipmentListings } from "../api/equipmentApi";
import "./EquipmentBuy.css";

export default function EquipmentBuy() {
  const [show, setShow] = useState(false);
  const [buyOptions, setBuyOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [conditionFilter, setConditionFilter] = useState("All");

  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { t } = useLanguage();
  const { showToast } = useToast();
  const { addRecentlyViewed } = useRecentlyViewed();

  const buyReadText = `
    ${t.equipment}. ${t.buy}.
    Search, sort and filter are available for equipment buying.
  `;

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function loadBuyItems() {
      try {
        const result = await getEquipmentListings("sell");
        setBuyOptions(result || []);
      } catch {
        setBuyOptions([]);
      } finally {
        setLoading(false);
      }
    }

    loadBuyItems();
  }, []);

  const conditions = useMemo(() => {
    const values = buyOptions
      .map((item) => item.itemCondition || item.item_condition)
      .filter(Boolean);
    return ["All", ...new Set(values)];
  }, [buyOptions]);

  const filteredOptions = useMemo(() => {
    let result = [...buyOptions];

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
  }, [buyOptions, searchTerm, sortBy, conditionFilter]);

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
          <div className="equipment-advanced-toolbar">
            <div className="equipment-search-wrap">
              <div className="advanced-search-row">
                <input
                  type="text"
                  className="equipment-search-input"
                  placeholder="Search equipment, condition, location..."
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
            {loading ? "Loading equipment..." : `${filteredOptions.length} listing(s) found`}
          </div>

          {loading ? (
            <LoadingSkeleton rows={4} kind="list" />
          ) : filteredOptions.length === 0 ? (
            <EmptyState
              title="No matching equipment found"
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
            <div className="buy-options-list">
              {filteredOptions.map((item, index) => (
                <div
                  key={item.id || index}
                  className={`buy-option-card liquid-list-card slide-up delay-${Math.min(index + 3, 8)} ${show ? "show" : ""}`}
                >
                  <div className="equipment-card-main">
                    <div>
                      <div className="equipment-card-topline">
                        <h3>{item.nameModel || item.name_model || item.name || "Equipment"}</h3>
                        <VerifiedBadge verified={item.verified ?? true} />
                      </div>

                      <p>{item.location || "No location"}</p>

                      <div className="equipment-badge-row">
                        <span className="equipment-condition-pill">
                          {item.itemCondition || item.item_condition || "Unknown"}
                        </span>
                        <RatingStars rating={item.rating ?? 4.4} />
                        <DemandBadge demand={item.demand || "Medium"} />
                      </div>
                    </div>

                    <div className="equipment-card-right">
                      <strong>₹{item.price || "—"}</strong>

                      <InlineActions
                        primaryLabel="Quick View"
                        secondaryLabel="Contact"
                        onView={() => {
                          setSelectedItem(item);
                          setModalOpen(true);

                          addRecentlyViewed({
                            id: item.id,
                            type: "equipment-buy",
                            title: item.nameModel || item.name_model || item.name,
                            path: "/equipment/buy",
                          });

                          showToast("Opened equipment details", "success");
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <DetailsModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title={selectedItem?.nameModel || selectedItem?.name_model || selectedItem?.name || "Equipment Details"}
          fields={[
            { label: "Condition", value: selectedItem?.itemCondition || selectedItem?.item_condition },
            { label: "Age", value: selectedItem?.age },
            { label: "Price", value: selectedItem ? `₹${selectedItem.price || "—"}` : "" },
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
              label={selectedItem?.location || "Equipment Location"}
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
                onClick={() => showToast("Proceed action triggered", "success")}
              >
                Proceed
              </button>
            </>
          }
        />
      </div>
    </div>
  );
}
