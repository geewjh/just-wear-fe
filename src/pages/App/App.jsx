import { useState } from "react";
import AuthPage from "../AuthPage/AuthPage";
import HomePage from "../HomePage/HomePage";
import { Routes, Route } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { Toaster } from "react-hot-toast";
import { getUser } from "../../utilities/users-service";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <>
      <main className="">
        {user ? (
          <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              <Route path="/home" element={<HomePage />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<AuthPage setUser={setUser} />}>
              <Toaster />
              <Route path="register" element={<SignUpForm />} />
              <Route path="login" element={<LoginForm />} />
            </Route>
          </Routes>
        )}
      </main>
    </>
  );
}

export default App;
