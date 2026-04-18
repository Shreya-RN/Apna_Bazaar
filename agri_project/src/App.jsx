import { Navigate, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

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

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" replace /> : children;
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/equipment" element={<PrivateRoute><Equipment /></PrivateRoute>} />
      <Route path="/equipment/buy" element={<PrivateRoute><EquipmentBuy /></PrivateRoute>} />
      <Route path="/equipment/sell" element={<PrivateRoute><EquipmentSell /></PrivateRoute>} />
      <Route path="/equipment/rent" element={<PrivateRoute><EquipmentRent /></PrivateRoute>} />
      <Route path="/bazaar" element={<PrivateRoute><Bazaar /></PrivateRoute>} />
      <Route path="/bazaar/sell" element={<PrivateRoute><BazaarSell /></PrivateRoute>} />
      <Route path="/recruitment" element={<PrivateRoute><Recruitment /></PrivateRoute>} />
    </Routes>
  );
}