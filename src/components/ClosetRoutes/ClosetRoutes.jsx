import { Routes, Route } from "react-router-dom";
import ClothesForm from "../ClothesForm/ClothesForm";
import ClosetPage from "../../pages/ClosetPage/ClosetPage";
import FavouritesPage from "../../pages/FavouritesPage/FavouritesPage";

export default function ClosetRoutes() {
  return (
    <Routes>
      <Route index element={<ClosetPage />} />
      <Route path="/clothes/new" element={<ClothesForm />} />
      <Route path="/favourites" element={<FavouritesPage />} />
    </Routes>
  );
}
