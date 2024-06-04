import { useState } from "react";
import AuthPage from "../AuthPage/AuthPage";
import HomePage from "../HomePage/HomePage";
import { Routes, Route } from "react-router-dom";

function App() {
  const [user, setUser] = useState(true);

  return (
    <>
      <main className="bg-neutral-content text-4xl font-bold">
        {user ? (
          <Routes>
            <Route path="/home" element={<HomePage />} />
          </Routes>
        ) : (
          <AuthPage />
        )}
      </main>
    </>
  );
}

export default App;
