import { useState } from "react";
import AuthPage from "../AuthPage/AuthPage";
import HomePage from "../HomePage/HomePage";
import { Routes, Route } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { Toaster } from "react-hot-toast";
import { getUser } from "../../utilities/users-service";

function App() {
  const [user, setUser] = useState(getUser());

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
          <>
            {" "}
            <Toaster />
            <AuthPage setUser={setUser} />
          </>
        )}
      </main>
    </>
  );
}

export default App;
