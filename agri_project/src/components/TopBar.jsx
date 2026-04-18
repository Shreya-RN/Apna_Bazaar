import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import ProfileDropdown from "./ProfileDropdown";

export default function TopBar({ title }) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="shared-topbar">
      <button className="shared-home-pill" onClick={() => navigate("/")}>
        <span className="shared-home-icon">⌂</span>
        <span>{t.home}</span>
      </button>

      <div className="shared-title-pill">{title}</div>

      <div className="topbar-right-zone">
        <div className="topbar-user-name">{user?.name || "User"}</div>

        <button
          className="shared-profile-btn"
          aria-label="Profile"
          onClick={() => setProfileOpen((prev) => !prev)}
        >
          <span className="shared-profile-head" />
          <span className="shared-profile-body" />
        </button>

        <ProfileDropdown
          open={profileOpen}
          onClose={() => setProfileOpen(false)}
        />
      </div>
    </div>
  );
}