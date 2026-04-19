import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    address: "",
    password: "",
    profilePhoto: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setForm((prev) => ({ ...prev, profilePhoto: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(form);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    navigate("/");
  };

  return (
    <div className="auth-page">
      <div className="auth-card liquid-shell iphone-glass">
        <h1>Register</h1>
        <p className="auth-subtext">Create your ApnaBazaar account</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="glass-input-group">
            <label>Profile Photo</label>
            <input type="file" accept="image/*" onChange={handlePhoto} />
            {preview ? <img src={preview} alt="Preview" className="auth-photo-preview" /> : null}
          </div>

          <div className="glass-input-group">
            <label>Name</label>
            <input name="name" type="text" value={form.name} onChange={handleChange} required />
          </div>

          <div className="glass-input-group">
            <label>Age</label>
            <input name="age" type="text" value={form.age} onChange={handleChange} required />
          </div>

          <div className="glass-input-group">
            <label>Phone Number</label>
            <input name="phone" type="text" value={form.phone} onChange={handleChange} required />
          </div>

          <div className="glass-input-group">
            <label>Email (Optional)</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} />
          </div>

          <div className="glass-input-group">
            <label>Address</label>
            <input name="address" type="text" value={form.address} onChange={handleChange} required />
          </div>

          <div className="glass-input-group">
            <label>Password</label>
            <div className="password-wrap">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error ? <div className="auth-error">{error}</div> : null}

          <button type="submit" className="glass-action-btn primary-glass-btn auth-btn">
            Register
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}