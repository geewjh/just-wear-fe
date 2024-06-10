import { Link, useNavigate } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { logOutService } from "../../utilities/users-service";

export default function NavBar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogOut = (e) => {
    e.preventDefault();
    logOutService();
    setUser(null);
    navigate("/");
  };

  return (
    <nav>
      <Link to="/home">
        <IoHomeOutline />
      </Link>
      <h3 className="">{user.username}&#39;s closet</h3>
      <Link to="/" onClick={handleLogOut}>
        Log Out
      </Link>
    </nav>
  );
}
