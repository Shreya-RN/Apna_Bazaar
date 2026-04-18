import { useState } from "react";
import TopBar from "../components/TopBar";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, updateProfile } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    age: user?.age || "",
    phone: user?.phone || "",
    email: user?.email || "",
    address: user?.address || "",
    profilePhoto: user?.profilePhoto || "",
  });

  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(user?.profilePhoto || "");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setForm((prev) => ({
        ...prev,
        profilePhoto: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const result = updateProfile(form);

    if (!result.ok) {
      setMessage(result.message);
      return;
    }

    setMessage("Profile updated successfully");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setMessage("");
    setForm({
      name: user?.name || "",
      age: user?.age || "",
      phone: user?.phone || "",
      email: user?.email || "",
      address: user?.address || "",
      profilePhoto: user?.profilePhoto || "",
    });
    setPreview(user?.profilePhoto || "");
  };

  return (
    <div className="simple-page-wrap">
      <div className="simple-page-shell liquid-shell iphone-glass">
        <TopBar title="Profile" />

        <div className="profile-page-content">
          <div className="profile-page-header iphone-glass liquid-shell">
            <div className="profile-page-avatar">
              {preview ? (
                <img src={preview} alt="Profile" className="profile-page-avatar-img" />
              ) : (
                <span>{user?.name?.charAt(0)?.toUpperCase() || "U"}</span>
              )}
            </div>

            <div className="profile-page-userinfo">
              <h2>{user?.name || "User"}</h2>
              <p>{user?.phone || "No phone"}</p>
              <p>{user?.email || "No email added"}</p>
            </div>
          </div>

          <div className="profile-readonly-card iphone-glass liquid-shell">
            <div className="profile-section-head">
              <h3>Registered Information</h3>

              {!isEditing ? (
                <button
                  className="glass-action-btn primary-glass-btn"
                  onClick={() => {
                    setMessage("");
                    setIsEditing(true);
                  }}
                >
                  Edit Profile
                </button>
              ) : null}
            </div>

            <div className="profile-readonly-grid">
              <p><strong>Name:</strong> {user?.name || "-"}</p>
              <p><strong>Age:</strong> {user?.age || "-"}</p>
              <p><strong>Phone:</strong> {user?.phone || "-"}</p>
              <p><strong>Email:</strong> {user?.email || "-"}</p>
              <p><strong>Address:</strong> {user?.address || "-"}</p>
            </div>
          </div>

          {isEditing ? (
            <form className="profile-page-form iphone-glass liquid-shell" onSubmit={handleSave}>
              <div className="profile-section-head">
                <h3>Edit Profile</h3>
              </div>

              <div className="profile-grid">
                <div className="glass-input-group">
                  <label>Profile Photo</label>
                  <input type="file" accept="image/*" onChange={handlePhoto} />
                </div>

                <div className="glass-input-group">
                  <label>Name</label>
                  <input name="name" value={form.name} onChange={handleChange} />
                </div>

                <div className="glass-input-group">
                  <label>Age</label>
                  <input name="age" value={form.age} onChange={handleChange} />
                </div>

                <div className="glass-input-group">
                  <label>Phone Number</label>
                  <input name="phone" value={form.phone} onChange={handleChange} />
                </div>

                <div className="glass-input-group">
                  <label>Email (Optional)</label>
                  <input name="email" value={form.email} onChange={handleChange} />
                </div>

                <div className="glass-input-group">
                  <label>Address</label>
                  <input name="address" value={form.address} onChange={handleChange} />
                </div>
              </div>

              {message ? <div className="profile-message">{message}</div> : null}

              <div className="profile-page-actions">
                <button type="submit" className="glass-action-btn primary-glass-btn">
                  Save Profile
                </button>

                <button
                  type="button"
                  className="glass-action-btn secondary-glass-btn"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : null}
        </div>
      </div>
    </div>
  );
}