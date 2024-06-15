import { useState } from "react";
import AuthPage from "../AuthPage/AuthPage";
import HomePage from "../HomePage/HomePage";
import { Routes, Route } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { Toaster } from "react-hot-toast";
import { getUser } from "../../utilities/users-service";
import LandingPage from "../LandingPage/LandingPage";
import ClosetRoutes from "../../components/ClosetRoutes/ClosetRoutes";

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <>
      <Toaster />
      <main className="min-h-screen min-w-screen bg-stone-300">
        {user ? (
          <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route path="/closet/*" element={<ClosetRoutes />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<AuthPage setUser={setUser} />} />
            <Route path="/login" element={<AuthPage setUser={setUser} />} />
          </Routes>
        )}
      </main>
    </>
  );
}

export default App;
