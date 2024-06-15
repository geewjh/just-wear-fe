import { useState } from "react";
import toast from "react-hot-toast";
import { loginService } from "../../utilities/users-service";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function LoginForm({ setUser }) {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const user = await loginService(loginData);
      setUser(user);
      if (user !== null && user !== undefined) {
        toast.success("successfully logged in!");
        navigate("/home");
      } else {
        navigate("/login");
      }
    } catch (error) {
      toast.error(`${error.message}`);
    }
  }

  return (
    <div className="container mx-auto max-w-md p-8 bg-white rounded-lg shadow-lg">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label>Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={loginData.username}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="inline-block px-6 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
        <p className="mt-4 text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-gray-300 underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
