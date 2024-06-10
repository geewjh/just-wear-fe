import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import { useLocation } from "react-router-dom";

export default function AuthPage({ setUser }) {
  const location = useLocation();

  return (
    <div>
      <main className="container flex mx-auto h-[90vh] items-center justify-center">
        {location.pathname === "/register" ? (
          <SignUpForm setUser={setUser} />
        ) : location.pathname === "/login" ? (
          <LoginForm setUser={setUser} />
        ) : null}
      </main>
    </div>
  );
}
