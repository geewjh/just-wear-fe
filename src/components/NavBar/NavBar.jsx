import { Link, useNavigate } from "react-router-dom";
import { BiCloset } from "react-icons/bi";
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
      <Link
        to="/closet"
        className="text-white text-sm hover:text-zinc-400 transition duration-150 ease-in-out"
      >
        <BiCloset className="text-2xl ml-3" />
      </Link>

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
