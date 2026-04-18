import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Equipment from "./pages/Equipment";
import EquipmentBuy from "./pages/EquipmentBuy";
import EquipmentSell from "./pages/EquipmentSell";
import EquipmentRent from "./pages/EquipmentRent";
import Bazaar from "./pages/Bazaar";
import Recruitment from "./pages/Recruitment";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/equipment" element={<Equipment />} />
      <Route path="/equipment/buy" element={<EquipmentBuy />} />
      <Route path="/equipment/sell" element={<EquipmentSell />} />
      <Route path="/equipment/rent" element={<EquipmentRent />} />
      <Route path="/bazaar" element={<Bazaar />} />
      <Route path="/recruitment" element={<Recruitment />} />
    </Routes>
  );
}