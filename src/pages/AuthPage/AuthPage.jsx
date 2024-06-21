import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function AuthPage({ setUser }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div>
      <main className="container flex mx-auto h-[90vh] items-center justify-center">
        {location.pathname === "/register" ? (
          <SignUpForm setUser={setUser} />
        ) : location.pathname === "/login" ? (
          <LoginForm setUser={setUser} />
        ) : null}

        <button
          onClick={() => navigate("/")}
          className="absolute top-10 left-14 text-4xl text-white font-bold hover:text-zinc-400 transition duration-150 ease-in-out flex items-center gap-2"
        >
          <IoIosArrowRoundBack />
        </button>
      </main>
    </div>
  );
}
