import { Link, useNavigate } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { BiCloset } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa";
import { logOutService } from "../../utilities/users-service";

export default function NavBar({ user, setUser }) {
  const navigate = useNavigate();

  function handleLogOut(e) {
    e.preventDefault();
    logOutService();
    setUser(null);
    navigate("/");
  }

  return (
    <nav className=" p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link
          to="/home"
          className="text-white text-sm hover:text-zinc-400 transition duration-150 ease-in-out"
        >
          <IoHomeOutline className="text-2xl" />
        </Link>
        <Link
          to="/closet"
          className="text-white text-sm hover:text-zinc-400 transition duration-150 ease-in-out"
        >
          <BiCloset className="text-2xl" />
        </Link>
        <Link
          to="/closet/favourites"
          className="text-white text-sm hover:text-zinc-400 transition duration-150 ease-in-out"
        >
          <FaRegStar className="text-2xl" />
        </Link>
      </div>
      <h3 className="text-xl text-zinc-400">{user.username}&#39;s Closet</h3>
      <div className="flex items-center space-x-4">
        <button
          onClick={handleLogOut}
          className="text-white text-sm hover:text-zinc-400 transition duration-150 ease-in-out"
        >
          Log Out
        </button>
      </div>
    </nav>
  );
}
