import { useState } from "react";
import AuthPage from "../AuthPage/AuthPage";
import HomePage from "../HomePage/HomePage";
import { Routes } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <main className="bg-neutral-content text-4xl font-bold">
        {user ? (
          <Routes>
            <HomePage />
          </Routes>
        ) : (
          <AuthPage />
        )}
      </main>
    </>
  );
}

export default App;
