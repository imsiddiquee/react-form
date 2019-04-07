import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
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
        <NavLink className="nav-item nav-link" to="/login">
          Login
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
