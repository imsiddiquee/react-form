import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand" to="/">
        Vidly
      </NavLink>

      <div className="navbar-nav">
        <NavLink className="nav-item nav-link active" to="/movies">
          Movies <span className="sr-only">(current)</span>
        </NavLink>
        <NavLink className="nav-item nav-link" to="/customers">
          Customers
        </NavLink>
        <NavLink className="nav-item nav-link" to="/rentals">
          Rentals
        </NavLink>
        {!user && (
          <React.Fragment>
            <NavLink className="nav-item nav-link" to="/login">
              Login
            </NavLink>
            <NavLink className="nav-item nav-link" to="/register">
              Register
            </NavLink>
          </React.Fragment>
        )}

        {user && (
          <React.Fragment>
            <NavLink className="nav-item nav-link" to="/profile">
              {user.name}
            </NavLink>
            <NavLink className="nav-item nav-link" to="/Logout">
              Logout
            </NavLink>
          </React.Fragment>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
