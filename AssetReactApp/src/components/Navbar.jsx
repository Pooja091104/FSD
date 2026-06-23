import { Link } from "react-router-dom";
import "./Styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="ams-navbar">
      <div className="ams-logo">
        Asset Management System
      </div>

      <ul className="ams-links">
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>

      <div className="ams-actions">
        <Link to="/login" className="ams-login-btn">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;