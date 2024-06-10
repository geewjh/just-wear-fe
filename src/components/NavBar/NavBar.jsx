import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { logOutService } from "../../utilities/users-service";

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    logOutService();
    setUser(null);
  }

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
