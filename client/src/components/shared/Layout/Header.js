import React from "react";
import { BiDonateBlood, BiUserCircle } from "react-icons/bi";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Header = () => {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const location = useLocation();

  // logout handler
  const handlerLogout = () => {
    localStorage.clear();
    navigate("/login");
    toast("logout successful");
  };
  return (
    <div>
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-brand">
            <BiDonateBlood color="red" /> Blood Bank
          </div>
          <ul className="navbar-nav flex-row">
            <li className="nav-item mx-3">
              <p className="nav-link">
                <BiUserCircle /> Welcome &nbsp;
                {user?.name || user?.hospitalName || user?.organisationName}
                &nbsp;
                <span className="badge text-bg-secondary">{user?.role}</span>
              </p>
            </li>

            {location.pathname === "/" ? (
              <li className="nav-item mx-3">
                <Link to="/analytics" className="nav-link">
                  Analytics
                </Link>
              </li>
            ) : (
              <li className="nav-item mx-3">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
            )}

            <li className="nav-item mx-3">
              <button className="btn btn-danger" onClick={handlerLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
