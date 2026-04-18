import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("apnabazaar_user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const register = ({ name, age, phone, email, address, password, profilePhoto }) => {
    const users = JSON.parse(localStorage.getItem("apnabazaar_users") || "[]");

    const phoneExists = users.find((u) => u.phone === phone);
    if (phoneExists) {
      return { ok: false, message: "Phone number already registered" };
    }

    if (email) {
      const emailExists = users.find((u) => u.email === email);
      if (emailExists) {
        return { ok: false, message: "Email already registered" };
      }
    }

    const newUser = {
      name,
      age,
      phone,
      email,
      address,
      password,
      profilePhoto: profilePhoto || "",
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem("apnabazaar_users", JSON.stringify(updatedUsers));
    localStorage.setItem("apnabazaar_user", JSON.stringify(newUser));
    setUser(newUser);

    return { ok: true };
  };

  const login = ({ phone, password }) => {
    const users = JSON.parse(localStorage.getItem("apnabazaar_users") || "[]");
    const found = users.find((u) => u.phone === phone && u.password === password);

    if (!found) {
      return { ok: false, message: "Invalid phone number or password" };
    }

    localStorage.setItem("apnabazaar_user", JSON.stringify(found));
    setUser(found);
    return { ok: true };
  };

  const updateProfile = (payload) => {
    if (!user) return { ok: false, message: "No logged in user" };

    const users = JSON.parse(localStorage.getItem("apnabazaar_users") || "[]");

    const phoneTaken = users.find(
      (u) => u.phone === payload.phone && u.phone !== user.phone
    );
    if (phoneTaken) {
      return { ok: false, message: "Phone number already in use" };
    }

    if (payload.email) {
      const emailTaken = users.find(
        (u) => u.email === payload.email && u.phone !== user.phone
      );
      if (emailTaken) {
        return { ok: false, message: "Email already in use" };
      }
    }

    const updatedUser = {
      ...user,
      ...payload,
    };

    const updatedUsers = users.map((u) =>
      u.phone === user.phone ? updatedUser : u
    );

    localStorage.setItem("apnabazaar_users", JSON.stringify(updatedUsers));
    localStorage.setItem("apnabazaar_user", JSON.stringify(updatedUser));
    setUser(updatedUser);

    return { ok: true };
  };

  const logout = () => {
    localStorage.removeItem("apnabazaar_user");
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      register,
      login,
      logout,
      updateProfile,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}