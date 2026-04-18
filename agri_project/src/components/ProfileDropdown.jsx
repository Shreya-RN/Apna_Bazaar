import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

export default function ProfileDropdown({ open, onClose }) {
  const { user, logout } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const panelRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (open && panelRef.current && !panelRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="profile-dropdown iphone-glass liquid-shell" ref={panelRef}>
      <div className="profile-dropdown-header">
        <div className="profile-avatar-large">
          {user?.profilePhoto ? (
            <img src={user.profilePhoto} alt="Profile" className="profile-avatar-large-img" />
          ) : (
            (user?.name?.charAt(0) || "U").toUpperCase()
          )}
        </div>

        <div className="profile-meta">
          <h4>{user?.name || "User"}</h4>
          <p>{user?.phone || "No phone"}</p>
          <span className="profile-language-pill">{language}</span>
        </div>
      </div>

      <div className="profile-dropdown-body">
        <button
          className="profile-action-btn"
          onClick={() => {
            navigate("/profile");
            onClose();
          }}
        >
          View / Edit Profile
        </button>

        <button className="profile-action-btn danger" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}