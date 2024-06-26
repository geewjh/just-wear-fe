import { useState } from "react";
import toast from "react-hot-toast";
import { signUpService } from "../../utilities/users-service";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { LiaEyeSlash, LiaEye } from "react-icons/lia";

function SignUpForm({ setUser }) {
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
    confirm: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  function handleChange(e) {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  }

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (userData.password !== userData.confirm) {
      toast.error("passwords do not match!");
      return;
    }
    try {
      const user = await signUpService(userData);
      setUser(user);
      if (user !== null && user !== undefined) {
        toast.success("Welcome to Just Wear!");
        navigate("/closet");
      } else {
        navigate("/register");
      }
    } catch (error) {
      toast.error(`${error.message}`);
    }
  }

  return (
    <div className="container mx-auto max-w-md p-8 bg-white rounded-lg shadow-lg">
      <form className="p-8 space-y-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-semibold text-gray-700 dark:text-white"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-semibold text-gray-700 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4 relative">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-semibold text-gray-700 dark:text-white"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-3 flex items-center text-lg cursor-pointer mt-6"
          >
            {showPassword ? <LiaEyeSlash /> : <LiaEye />}
          </span>
        </div>
        <div className="mb-4 relative">
          <label
            htmlFor="confirm-password"
            className="block mb-2 text-sm font-semibold text-gray-700 dark:text-white"
          >
            Confirm password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="confirm-password"
            name="confirm"
            value={userData.confirm}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-3 flex items-center text-lg cursor-pointer mt-6"
          >
            {showPassword ? <LiaEyeSlash /> : <LiaEye />}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="inline-block px-6 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create an account
          </button>
        </div>
        <p className="mt-4 text-sm text-gray-400">
          Already an existing user?{" "}
          <Link to="/login" className="text-gray-300 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUpForm;
