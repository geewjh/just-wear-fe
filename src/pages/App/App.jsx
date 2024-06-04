import { useState } from "react";
import AuthPage from "../AuthPage/AuthPage";
import HomePage from "../HomePage/HomePage";
import { Routes, Route } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <main className="">
        {user ? (
          <>
            <NavBar />
            <Routes>
              <Route path="/home" element={<HomePage />} />
            </Routes>
          </>
        ) : (
          <AuthPage />
        )}
      </main>
    </>
  );
}

export default App;
