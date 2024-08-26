import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../../styles/Layout.css";

const Sidebar = () => {
  // Get user state
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  return (
    <div>
      <div className="sidebar">
        <div className="menu">
          {/* Organisation Menu */}
          {user?.role === "organisation" && (
            <>
              <div
                className={`menu-item ${location.pathname === "/" && "active"}`}
              >
                <i className="fa-sharp-duotone fa-solid fa-warehouse"></i>
                <Link to="/">Inventory</Link>
              </div>

              <div
                className={`menu-item ${
                  location.pathname === "/donar" && "active"
                }`}
              >
                <i className="fa-solid fa-hand-holding-medical"></i>
                <Link to="/donar">Donar</Link>
              </div>

              <div
                className={`menu-item ${
                  location.pathname === "/hospital" && "active"
                }`}
              >
                <i className="fa-solid fa-hospital"></i>
                <Link to="/hospital">Hospital</Link>
              </div>
            </>
          )}

          {/*Admin menu */}
          {user?.role === "admin" && (
            <>
              <div
                className={`menu-item ${
                  location.pathname === "/donar-list" && "active"
                }`}
              >
                <i className="fa-sharp-duotone fa-solid fa-warehouse"></i>
                <Link to="/donar-list">Donar List</Link>
              </div>

              <div
                className={`menu-item ${
                  location.pathname === "/organisation-list" && "active"
                }`}
              >
                <i className="fa-solid fa-hospital"></i>
                <Link to="/organisation-list">Organisation List</Link>
              </div>

              <div
                className={`menu-item ${
                  location.pathname === "/hospital-list" && "active"
                }`}
              >
                <i className="fa-solid fa-hospital"></i>
                <Link to="/hospital-list">Hospital List</Link>
              </div>
            </>
          )}

          {/* Donar Menu */}
          {user?.role === "donar" && (
            <>
              <div
                className={`menu-item ${
                  location.pathname === "/hospital" && "active"
                }`}
              >
                <i className="fa-solid fa-hospital"></i>
                <Link to="/hospital">Hospital</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/organisation" && "active"
                }`}
              >
                <i className="fa-sharp fa-solid fa-building-ngo"></i>
                <Link to="/organisation">Organisation</Link>
              </div>
            </>
          )}

          {/* Hospital Menu */}
          {user?.role === "hospital" && (
            <>
              <div
                className={`menu-item ${location.pathname === "/" && "active"}`}
              >
                <i className="fa-sharp-duotone fa-solid fa-warehouse"></i>
                <Link to="/">Inventory</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/organisation" && "active"
                }`}
              >
                <i className="fa-sharp fa-solid fa-building-ngo"></i>
                <Link to="/organisation">Organisation</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/consumer" && "active"
                }`}
              >
                <i className="fa-duotone fa-solid fa-bed-pulse"></i>
                <Link to="/consumer">Consumer</Link>
              </div>
            </>
          )}

          {/* Donation - Donar Menu */}
          {user?.role === "donar" && (
            <div
              className={`menu-item ${
                location.pathname === "/donation" && "active"
              }`}
            >
              <i className="fa-solid fa-hand-holding-medical"></i>
              <Link to="/donation">Donation</Link>
            </div>
          )}
        </div>

        {/* rendering data from userMenu.js */}
        {/* <div className="menu">
          {userMenu.map((menu) => {
            const isActive = location.pathname === menu.path;
            return (
              <div
                className={`menu-item ${isActive && "active"}`}
                key={menu.name}
              >
                <i className={menu.icon}></i>
                <Link to={menu.path}>{menu.name}</Link>
              </div>
            );
          })}
        </div> */}
      </div>
    </div>
  );
};

export default Sidebar;
