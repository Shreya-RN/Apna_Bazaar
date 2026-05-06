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
import InlineActions from "../components/InlineActions";

import { useLanguage } from "../context/LanguageContext";
import { useToast } from "../context/ToastContext";
import { useRecentlyViewed } from "../context/RecentlyViewedContext";

import { addWorkerProfile, getWorkers } from "../api/recruitmentApi";
import "./Recruitment.css";

function extractNumericWage(value) {
  if (!value) return 0;
  const match = String(value).match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function extractNumericExperience(value) {
  if (!value) return 0;
  const match = String(value).match(/\d+/);
  return match ? Number(match[0]) : 0;
}

export default function Recruitment() {
  const [show, setShow] = useState(false);
  const [activeSection, setActiveSection] = useState("hire");
  const [workers, setWorkers] = useState([]);
  const [message, setMessage] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");

  const [selectedWorker, setSelectedWorker] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { t } = useLanguage();
  const { showToast } = useToast();
  const { addRecentlyViewed } = useRecentlyViewed();

  const [form, setForm] = useState({
    profilePhoto: "",
    name: "",
    primarySkill: "",
    secondarySkill: "",
    experience: "",
    preferredWage: "",
    location: "",
    contact: "",
    availability: "Available",
    description: "",
  });

  const recruitmentReadText = `
    ${t.recruitment}.
    Two sections available.
    Hire workers.
    Find work.
    Search, sort and filter options are available.
  `;

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function loadWorkers() {
      try {
        const result = await getWorkers();
        setWorkers(result || []);
      } catch {
        setWorkers([]);
      }
    }

    loadWorkers();
  }, []);

  const availabilityOptions = useMemo(() => {
    const values = workers.map((worker) => worker.availability).filter(Boolean);
    return ["All", ...new Set(values)];
  }, [workers]);

  const filteredWorkers = useMemo(() => {
    let result = [...workers];

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter((worker) => {
        const name = String(worker.name || "").toLowerCase();
        const primarySkill = String(worker.primarySkill || worker.primary_skill || "").toLowerCase();
        const secondarySkill = String(worker.secondarySkill || worker.secondary_skill || "").toLowerCase();
        const location = String(worker.location || "").toLowerCase();

        return (
          name.includes(q) ||
          primarySkill.includes(q) ||
          secondarySkill.includes(q) ||
          location.includes(q)
        );
      });
    }

    if (availabilityFilter !== "All") {
      result = result.filter((worker) => worker.availability === availabilityFilter);
    }

    if (sortBy === "wageLowHigh") {
      result.sort(
        (a, b) =>
          extractNumericWage(a.preferredWage || a.preferred_wage) -
          extractNumericWage(b.preferredWage || b.preferred_wage)
      );
    } else if (sortBy === "wageHighLow") {
      result.sort(
        (a, b) =>
          extractNumericWage(b.preferredWage || b.preferred_wage) -
          extractNumericWage(a.preferredWage || a.preferred_wage)
      );
    } else if (sortBy === "experienceHighLow") {
      result.sort(
        (a, b) =>
          extractNumericExperience(b.experience) -
          extractNumericExperience(a.experience)
      );
    } else {
      result.sort((a, b) => Number(b.id || 0) - Number(a.id || 0));
    }

    return result;
  }, [workers, searchTerm, sortBy, availabilityFilter]);

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
      await addWorkerProfile(form);
      setMessage("Worker profile posted successfully");
      showToast("Worker profile posted successfully", "success");

      setForm({
        profilePhoto: "",
        name: "",
        primarySkill: "",
        secondarySkill: "",
        experience: "",
        preferredWage: "",
        location: "",
        contact: "",
        availability: "Available",
        description: "",
      });
    } catch (error) {
      setMessage(error.message);
      showToast(error.message || "Failed to post worker profile", "error");
    }
  };

  return (
    <div className="recruitment-page">
      <div className={`recruitment-shell liquid-shell iphone-glass ${show ? "show" : ""}`}>
        <TopBar title={t.recruitment} />

        <div className={`recruitment-title-wrap slide-up delay-1 ${show ? "show" : ""}`}>
          <div className="recruitment-title">{t.recruitment}</div>
        </div>

        <div className={`voice-row slide-up delay-2 ${show ? "show" : ""}`}>
          <VoiceButton textToRead={recruitmentReadText} />
        </div>

        <div className={`recruitment-switch-row slide-up delay-3 ${show ? "show" : ""}`}>
          <button
            className={activeSection === "hire" ? "recruitment-switch-btn active" : "recruitment-switch-btn"}
            onClick={() => setActiveSection("hire")}
          >
            Hire Workers
          </button>

          <button
            className={activeSection === "work" ? "recruitment-switch-btn active" : "recruitment-switch-btn"}
            onClick={() => setActiveSection("work")}
          >
            Find Work
          </button>
        </div>

        {activeSection === "hire" ? (
          <div className={`recruitment-board liquid-board iphone-glass slide-up delay-4 ${show ? "show" : ""}`}>
            <div className="recruitment-advanced-toolbar">
              <div className="recruitment-search-wrap">
                <div className="advanced-search-row">
                  <input
                    type="text"
                    className="recruitment-search-input"
                    placeholder="Search name, skill, location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <VoiceSearchButton onResult={setSearchTerm} />
                </div>
              </div>

              <div className="recruitment-filter-group">
                <select
                  className="recruitment-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="latest">Latest</option>
                  <option value="wageLowHigh">Wage: Low to High</option>
                  <option value="wageHighLow">Wage: High to Low</option>
                  <option value="experienceHighLow">Experience: High to Low</option>
                </select>

                <select
                  className="recruitment-select"
                  value={availabilityFilter}
                  onChange={(e) => setAvailabilityFilter(e.target.value)}
                >
                  {availabilityOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="recruitment-results-meta">
              {workers.length === 0 ? "Loading workers..." : `${filteredWorkers.length} worker profile(s) found`}
            </div>

            {workers.length === 0 ? (
              <LoadingSkeleton rows={4} kind="card" />
            ) : filteredWorkers.length === 0 ? (
              <EmptyState
                title="No matching worker profiles found"
                subtitle="Try adjusting skill, wage or availability filters."
                action={
                  <button
                    className="glass-action-btn primary-glass-btn"
                    onClick={() => {
                      setSearchTerm("");
                      setSortBy("latest");
                      setAvailabilityFilter("All");
                    }}
                  >
                    Reset Filters
                  </button>
                }
              />
            ) : (
              <div className="worker-cards-grid">
                {filteredWorkers.map((worker, index) => (
                  <div
                    key={worker.id || index}
                    className={`worker-card liquid-list-card iphone-glass slide-up delay-${Math.min(index + 5, 8)} ${show ? "show" : ""}`}
                  >
                    <div className="worker-avatar">
                      {(worker.name || "U").charAt(0)}
                    </div>

                    <div className="worker-card-content">
                      <div className="worker-head-row">
                        <h3>{worker.name}</h3>
                        <VerifiedBadge verified={worker.verified ?? true} />
                      </div>

                      <p><strong>Skill:</strong> {worker.primarySkill || worker.primary_skill}</p>
                      <p><strong>Experience:</strong> {worker.experience}</p>
                      <p><strong>Wage:</strong> {worker.preferredWage || worker.preferred_wage}</p>
                      <p><strong>Location:</strong> {worker.location}</p>

                      <div className="worker-badge-row">
                        <RatingStars rating={worker.rating ?? 4.7} />
                        <DemandBadge demand={worker.demand || "Medium"} />
                        <span className={`availability-pill ${String(worker.availability || "available").toLowerCase().replace(/\s/g, "-")}`}>
                          {worker.availability}
                        </span>
                      </div>
                    </div>

                    <div className="worker-card-actions">
                      <InlineActions
                        primaryLabel="Quick View"
                        secondaryLabel="Contact"
                        onView={() => {
                          setSelectedWorker(worker);
                          setModalOpen(true);

                          addRecentlyViewed({
                            id: worker.id,
                            type: "worker",
                            title: worker.name,
                            path: "/recruitment",
                          });

                          showToast("Opened worker details", "success");
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <form
            className={`recruitment-board liquid-board iphone-glass slide-up delay-4 ${show ? "show" : ""}`}
            onSubmit={handleSubmit}
          >
            <div className="recruitment-form-grid">
              <div className="glass-input-group">
                <label>Profile Photo URL</label>
                <input name="profilePhoto" value={form.profilePhoto} onChange={handleChange} />
              </div>

              <div className="glass-input-group">
                <label>Name</label>
                <input name="name" value={form.name} onChange={handleChange} />
              </div>

              <div className="glass-input-group">
                <label>Primary Skill</label>
                <input name="primarySkill" value={form.primarySkill} onChange={handleChange} />
              </div>

              <div className="glass-input-group">
                <label>Secondary Skill</label>
                <input name="secondarySkill" value={form.secondarySkill} onChange={handleChange} />
              </div>

              <div className="glass-input-group">
                <label>Experience</label>
                <input name="experience" value={form.experience} onChange={handleChange} />
              </div>

              <div className="glass-input-group">
                <label>Preferred Wage</label>
                <input name="preferredWage" value={form.preferredWage} onChange={handleChange} />
              </div>

              <div className="glass-input-group">
                <label>Location</label>
                <input name="location" value={form.location} onChange={handleChange} />
              </div>

              <div className="glass-input-group">
                <label>Contact</label>
                <input name="contact" value={form.contact} onChange={handleChange} />
              </div>

              <div className="glass-input-group">
                <label>Availability</label>
                <select name="availability" value={form.availability} onChange={handleChange}>
                  <option>Available</option>
                  <option>Part-time</option>
                  <option>Busy</option>
                </select>
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

            <div className="recruitment-actions">
              <button type="submit" className="glass-action-btn primary-glass-btn">
                Post Profile
              </button>
            </div>
          </form>
        )}

        <DetailsModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title={selectedWorker?.name || "Worker Details"}
          fields={[
            { label: "Primary Skill", value: selectedWorker?.primarySkill || selectedWorker?.primary_skill },
            { label: "Secondary Skill", value: selectedWorker?.secondarySkill || selectedWorker?.secondary_skill },
            { label: "Experience", value: selectedWorker?.experience },
            { label: "Preferred Wage", value: selectedWorker?.preferredWage || selectedWorker?.preferred_wage },
            { label: "Location", value: selectedWorker?.location },
            { label: "Contact", value: selectedWorker?.contact },
            { label: "Availability", value: selectedWorker?.availability },
            { label: "Description", value: selectedWorker?.description },
          ]}
          actions={
            <>
              <button className="glass-action-btn secondary-glass-btn" onClick={() => setModalOpen(false)}>
                Close
              </button>
              <button
                className="glass-action-btn primary-glass-btn"
                onClick={() => showToast("Hire request triggered", "success")}
              >
                Send Hire Request
              </button>
            </>
          }
        />
      </div>
    </div>
  );
}
