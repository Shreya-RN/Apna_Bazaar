import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

import { getBazaarProducts } from "../api/bazaarApi";

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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { t } = useLanguage();
  const { showToast } = useToast();
  const { addRecentlyViewed } = useRecentlyViewed();

  const [activeSection, setActiveSection] = useState(
    location.pathname === "/bazaar/sell" ? "sell" : "browse"
  );

  useEffect(() => {
    setActiveSection(location.pathname === "/bazaar/sell" ? "sell" : "browse");
  }, [location.pathname]);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  useEffect(() => {
    async function loadProducts() {
      try {
        const result = await getBazaarProducts();
        setProducts(result || []);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const categories = useMemo(() => {
    const values = products.map((p) => p.category).filter(Boolean);
    return ["All", ...new Set(values)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    result = result.map((item) => {
      const seller = Number(item.sellerPrice || item.seller_price || 0);
      const modal = Number(item.marketModal || item.market_modal || 0);
      return { ...item, computedStatus: getPriceStatus(seller, modal) };
    });

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      result = result.filter((item) =>
        `${item.productName} ${item.category} ${item.location}`
          .toLowerCase()
          .includes(q)
      );
    }

    if (categoryFilter !== "All") {
      result = result.filter((item) => item.category === categoryFilter);
    }

    if (statusFilter !== "All") {
      result = result.filter(
        (item) => item.computedStatus === statusFilter
      );
    }

    if (sortBy === "priceLowHigh") {
      result.sort((a, b) => a.sellerPrice - b.sellerPrice);
    } else if (sortBy === "priceHighLow") {
      result.sort((a, b) => b.sellerPrice - a.sellerPrice);
    }

    return result;
  }, [products, searchTerm, sortBy, categoryFilter, statusFilter]);

  return (
    <div className="bazaar-page">
      <div className={`bazaar-shell liquid-shell iphone-glass ${show ? "show" : ""}`}>
        <TopBar title={t.personalBazaar} />

        <div className="bazaar-title">{t.personalBazaar}</div>

        {/* SEARCH + VOICE */}
        <div className="advanced-search-row">
          <input
            className="bazaar-search-input"
            placeholder="Search product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <VoiceSearchButton onResult={setSearchTerm} />
        </div>

        {/* FILTERS */}
        <div className="bazaar-filter-group">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="priceLowHigh">Low → High</option>
            <option value="priceHighLow">High → Low</option>
          </select>

          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>

          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option>All</option>
            <option>Below Market</option>
            <option>Fair Price</option>
            <option>Premium Price</option>
          </select>
        </div>

        {/* MAIN CONTENT */}
        {loading ? (
          <LoadingSkeleton rows={4} />
        ) : filteredProducts.length === 0 ? (
          <EmptyState
            title="No products found"
            subtitle="Try changing filters"
            action={
              <button
                onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter("All");
                  setStatusFilter("All");
                }}
              >
                Reset
              </button>
            }
          />
        ) : (
          <div className="bazaar-products-list">
            {filteredProducts.map((item, index) => {
              const status = item.computedStatus;

              return (
                <div key={index} className="bazaar-product-card">
                  <div>
                    <h3>{item.productName}</h3>
                    <p>{item.location}</p>
                  </div>

                  <div>
                    ₹{item.sellerPrice}/{item.unit}
                  </div>

                  <div>
                    <VerifiedBadge verified />
                    <RatingStars rating={4.6} />
                    <DemandBadge demand="High" />
                    <span>{status}</span>

                    <InlineActions
                      onView={() => {
                        setSelectedProduct(item);
                        setModalOpen(true);

                        addRecentlyViewed({
                          id: item.id,
                          title: item.productName,
                          path: "/bazaar",
                        });

                        showToast("Opened product", "success");
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* MODAL */}
        <DetailsModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title={selectedProduct?.productName}
          fields={[
            { label: "Category", value: selectedProduct?.category },
            { label: "Price", value: selectedProduct?.sellerPrice },
            { label: "Location", value: selectedProduct?.location },
          ]}
          extraContent={
            <MapViewCard
              lat={selectedProduct?.latitude}
              lng={selectedProduct?.longitude}
            />
          }
        />
      </div>
    </div>
  );
}
