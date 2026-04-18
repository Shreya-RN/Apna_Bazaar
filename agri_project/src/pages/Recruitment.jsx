import { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import VoiceButton from "../components/VoiceButton";
import { useLanguage } from "../context/LanguageContext";
import "./Recruitment.css";

const workers = [
  {
    name: "Ramesh Kumar",
    skill: "Tractor Driving",
    experience: "4 years",
    wage: "₹700/day",
    location: "Village Center",
    availability: "Available",
  },
  {
    name: "Sita Devi",
    skill: "Harvesting",
    experience: "6 years",
    wage: "₹500/day",
    location: "North Side Farms",
    availability: "Available",
  },
  {
    name: "Bikash Roy",
    skill: "Irrigation Setup",
    experience: "3 years",
    wage: "₹650/day",
    location: "Market Road",
    availability: "Busy",
  },
  {
    name: "Lakshmi",
    skill: "Sorting and Packing",
    experience: "5 years",
    wage: "₹450/day",
    location: "Main Bazaar",
    availability: "Available",
  },
];

export default function Recruitment() {
  const [show, setShow] = useState(false);
  const [activeSection, setActiveSection] = useState("hire");
  const { t } = useLanguage();

  const recruitmentReadText = `
    ${t.recruitment}.
    Two sections available.
    Hire workers.
    Find work.
    Browse skilled workers or create your own work profile.
  `;

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
            <div className="recruitment-tools-row">
              <button className="small-action-btn">Sort</button>
              <button className="small-action-btn">Filter</button>
            </div>

            <div className="worker-cards-grid">
              {workers.map((worker, index) => (
                <div
                  key={worker.name}
                  className={`worker-card liquid-list-card iphone-glass slide-up delay-${index + 5} ${show ? "show" : ""}`}
                >
                  <div className="worker-avatar">{worker.name.charAt(0)}</div>

                  <div className="worker-card-content">
                    <h3>{worker.name}</h3>
                    <p><strong>Skill:</strong> {worker.skill}</p>
                    <p><strong>Experience:</strong> {worker.experience}</p>
                    <p><strong>Wage:</strong> {worker.wage}</p>
                    <p><strong>Location:</strong> {worker.location}</p>
                    <span className={`availability-pill ${worker.availability.toLowerCase()}`}>
                      {worker.availability}
                    </span>
                  </div>

                  <div className="worker-card-actions">
                    <button className="glass-action-btn primary-glass-btn">Hire</button>
                    <button className="glass-action-btn secondary-glass-btn">Contact</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={`recruitment-board liquid-board iphone-glass slide-up delay-4 ${show ? "show" : ""}`}>
            <div className="glass-orb orb-1" />
            <div className="glass-orb orb-2" />

            <div className="recruitment-form-grid">
              <div className="glass-input-group">
                <label>Profile Photo</label>
                <input type="file" accept="image/*" />
              </div>

              <div className="glass-input-group">
                <label>Name</label>
                <input type="text" placeholder="Enter your name" />
              </div>

              <div className="glass-input-group">
                <label>Primary Skill</label>
                <input type="text" placeholder="e.g. Tractor Driving" />
              </div>

              <div className="glass-input-group">
                <label>Secondary Skill</label>
                <input type="text" placeholder="e.g. Harvesting" />
              </div>

              <div className="glass-input-group">
                <label>Experience</label>
                <input type="text" placeholder="e.g. 3 years" />
              </div>

              <div className="glass-input-group">
                <label>Preferred Wage</label>
                <input type="text" placeholder="e.g. ₹500/day" />
              </div>

              <div className="glass-input-group">
                <label>Location</label>
                <input type="text" placeholder="Enter village / area" />
              </div>

              <div className="glass-input-group">
                <label>Contact</label>
                <input type="text" placeholder="Enter contact number" />
              </div>

              <div className="glass-input-group">
                <label>Availability</label>
                <select>
                  <option>Available</option>
                  <option>Part-time</option>
                  <option>Busy</option>
                </select>
              </div>
            </div>

            <div className="glass-input-group full-width">
              <label>Description</label>
              <textarea
                placeholder="Describe your skills, work type, and experience"
                rows="5"
              />
            </div>

            <div className="recruitment-actions">
              <button className="glass-action-btn primary-glass-btn">Post Profile</button>
              <button className="glass-action-btn secondary-glass-btn">Save Draft</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}