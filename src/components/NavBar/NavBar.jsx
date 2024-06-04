import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";

export default function NavBar() {
  return (
    <nav>
      <Link to="/home">
        <IoHomeOutline />
      </Link>
    </nav>
  );
}
