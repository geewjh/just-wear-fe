import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHanger } from "react-icons/gi";
import { GiExitDoor } from "react-icons/gi";
import {
  logOutService,
  deleteUserService,
} from "../../utilities/users-service";
import Modal from "../Modal/Modal";
import toast from "react-hot-toast";

export default function NavBar({ user, setUser }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const navigate = useNavigate();

  function handleLogOut(e) {
    e.preventDefault();
    logOutService();
    setUser(null);
    navigate("/");
  }

  function handleDeleteAccount(e) {
    e.preventDefault();
    setIsModalOpen(true);
  }

  async function confirmDelete() {
    if (userInput.toLowerCase() === "justwear") {
      try {
        await deleteUserService();
        toast.success("User deleted successfully");
        setUser(null);
        setIsModalOpen(false);
        navigate("/");
      } catch (error) {
        toast.error("Failed to delete user");
      }
    } else {
      toast.error('Confirmation failed. Type "justwear" to delete.');
    }
    setUserInput("");
  }

  return (
    <nav className="p-4 flex justify-between items-center">
      <Link
        to="/closet"
        className="text-white text-sm hover:text-zinc-400 transition duration-150 ease-in-out"
      >
        <GiHanger className="text-5xl ml-6" />
      </Link>

      <h3 className="text-xl text-zinc-400 mr-5">
        {user?.username}&#39;s Closet
      </h3>

      <div className="dropdown dropdown-hover dropdown-end">
        <label tabIndex="0" className="btn m-1 text-zinc">
          <GiExitDoor className="text-4xl text-black" />
        </label>
        <ul
          tabIndex="0"
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <button onClick={handleLogOut}>Log Out</button>
          </li>
          <li>
            <button onClick={handleDeleteAccount}>Deactivate Account</button>
          </li>
        </ul>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="space-y-4">
          <h1 className="text-xl font-semibold text-center">
            Sad to see you leave, talk soon.
          </h1>
          <input
            type="text"
            placeholder="Type 'justwear' to delete"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="mt-1 block w-full p-2 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border rounded-md"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </nav>
  );
}
