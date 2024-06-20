import { Routes, Route } from "react-router-dom";
import ClothesForm from "../ClothesForm/ClothesForm";
import ClosetPage from "../../pages/ClosetPage/ClosetPage";
import EditClothesForm from "../EditClothesForm/EditClothesForm";

export default function ClosetRoutes() {
  return (
    <Routes>
      <Route index element={<ClosetPage />} />
      <Route path="/clothes/new" element={<ClothesForm />} />
      <Route path="/edit/clothes/:clothesID" element={<EditClothesForm />} />
    </Routes>
  );
}
