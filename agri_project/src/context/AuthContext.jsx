import { createContext, useContext, useEffect, useState } from "react";
import {
  loginUser,
  registerUser,
  getProfile,
  logoutUser,
} from "../api/authApi";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 CHECK SESSION ON LOAD
  useEffect(() => {
    async function loadUser() {
      try {
        const res = await getProfile();
        setUser(res.user || null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  // 🔐 LOGIN
  const login = async (formData) => {
    try {
      const res = await loginUser(formData);
      setUser(res.user);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.message || "Login failed",
      };
    }
  };

  // 📝 REGISTER
  const register = async (formData) => {
    try {
      const res = await registerUser(formData);
      setUser(res.user);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.message || "Registration failed",
      };
    }
  };

  // 🚪 LOGOUT
  const logout = async () => {
    try {
      await logoutUser();
    } catch {
      // even if backend fails, clear frontend
    } finally {
      setUser(null);
    }
  };

  // 🔒 PROTECT ROUTES
  const isAuthenticated = !!user;

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}