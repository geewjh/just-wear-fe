import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="h-screen w-full relative">
      <div className="absolute inset-0 flex items-center justify-center p-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white ">
            Welcome to Just Wear 👕
          </h2>
          <p className="mt-4 text-xs text-white/90 leading-relaxed">
            If your clothes could speak, what would they say?
          </p>
          <Link to="/login" className="btn mr-2 mt-4">
            Login
          </Link>
          <Link to="/register" className="btn mt-4">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
