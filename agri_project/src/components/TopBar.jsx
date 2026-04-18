import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function TopBar({ title, rightExtra = null }) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="shared-topbar">
      <button className="shared-home-pill" onClick={() => navigate("/")}>
        <span className="shared-home-icon">⌂</span>
        <span>{t.home}</span>
      </button>

      <div className="shared-title-pill">{title}</div>

      <div style={{ position: "absolute", right: "22px", top: "14px", display: "flex", gap: "10px", alignItems: "center" }}>
        {rightExtra}

        <button className="shared-profile-btn" aria-label="Profile">
          <span className="shared-profile-head" />
          <span className="shared-profile-body" />
        </button>
      </div>
    </div>
  );
}