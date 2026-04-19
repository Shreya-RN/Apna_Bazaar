import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PageTransition from "./components/PageTransition";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Equipment from "./pages/Equipment";
import EquipmentBuy from "./pages/EquipmentBuy";
import EquipmentSell from "./pages/EquipmentSell";
import EquipmentRent from "./pages/EquipmentRent";
import Bazaar from "./pages/Bazaar";
import BazaarSell from "./pages/BazaarSell";
import Recruitment from "./pages/Recruitment";

function PublicRoute({ children }) {
  const { isAuthenticated, bootLoading } = useAuth();

  if (bootLoading) {
    return <div style={{ padding: "40px", textAlign: "center" }}>Loading...</div>;
  }

  return isAuthenticated ? <Navigate to="/" replace /> : children;
}

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<PublicRoute><PageTransition><Login /></PageTransition></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><PageTransition><Register /></PageTransition></PublicRoute>} />
        <Route path="/profile" element={<ProtectedRoute><PageTransition><Profile /></PageTransition></ProtectedRoute>} />
        <Route path="/" element={<ProtectedRoute><PageTransition><Home /></PageTransition></ProtectedRoute>} />
        <Route path="/equipment" element={<ProtectedRoute><PageTransition><Equipment /></PageTransition></ProtectedRoute>} />
        <Route path="/equipment/buy" element={<ProtectedRoute><PageTransition><EquipmentBuy /></PageTransition></ProtectedRoute>} />
        <Route path="/equipment/sell" element={<ProtectedRoute><PageTransition><EquipmentSell /></PageTransition></ProtectedRoute>} />
        <Route path="/equipment/rent" element={<ProtectedRoute><PageTransition><EquipmentRent /></PageTransition></ProtectedRoute>} />
        <Route path="/bazaar" element={<ProtectedRoute><PageTransition><Bazaar /></PageTransition></ProtectedRoute>} />
        <Route path="/bazaar/sell" element={<ProtectedRoute><PageTransition><BazaarSell /></PageTransition></ProtectedRoute>} />
        <Route path="/recruitment" element={<ProtectedRoute><PageTransition><Recruitment /></PageTransition></ProtectedRoute>} />
      </Routes>
    </AnimatePresence>
  );
}