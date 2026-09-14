import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        MR14
      </Link>

      <div className="navbar-links">
        <Link to="/discover">Discover</Link>
        <Link to="/write">Write</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;