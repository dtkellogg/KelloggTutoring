import React from "react";
import {
  NavLink,
  // useRouteMatch,
  // useLocation
} from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import "../../index.css";

const activeStyle = {
  color: "#e62424",
  fontWeight: "bold"
};

export default function NavLower() {
  return (
    <nav className="nav__lower">
      <h2 className="text-size-3">Subheader</h2>
      <button className="btn btn__search">
        <FaSearch
          size={12.5}
          color="var(--green)"
          fill="var(--green)"
          className="social-media-icon grey-light-7"
        />
        <span>Search</span>
      </button>
    </nav>
  );
}