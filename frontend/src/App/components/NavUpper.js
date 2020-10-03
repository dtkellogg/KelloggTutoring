import React from "react";
import {
  NavLink,
  // useRouteMatch,
  // useLocation
} from "react-router-dom";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";


const activeStyle = {
  color: "rgb(73, 165, 73)",
  fontWeight: 900,
};

export default function NavUpper() {
  return (
    <nav className="nav__upper">
      <div className="logo">
        <a href="/">
          <h1 className="text-size-1 black nav__upper-header">
            Kellogg Tutoring, Inc. |{" "}
            <span role="img" aria-label="email emoji">
              🏠
            </span>
          </h1>
        </a>
      </div>

      <div className="flex row">
        <ul className="nav__list">
          {/* <li>
            <NavLink
              to="/"
              exact
              activeStyle={activeStyle}
              className="nav__link text-size-5 letter-spacing-sm"
            >
              Home
            </NavLink>
          </li> */}
          <li>
            <NavLink
              to="/appointments"
              activeStyle={activeStyle}
              className="nav__link text-size-5 letter-spacing-sm"
            >
              Appointments
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/meetToshi"
              activeStyle={activeStyle}
              className="nav__link text-size-5 letter-spacing-sm"
            >
              Meet Toshi
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to="/studentResources"
              activeStyle={activeStyle}
              className="nav__link text-size-5 letter-spacing-sm"
            >
              Student Resources
            </NavLink>
          </li> */}
          <li>
            <NavLink
              to="/contact"
              activeStyle={activeStyle}
              className="nav__link text-size-5 letter-spacing-sm"
            >
              Contact
            </NavLink>
          </li>
        </ul>

        <div className="nav__user-icons">
          <FaUserCircle
            size={30}
            color="var(--green-dark)"
            fill="var(--green-dark)"
            className="social-media-icon grey-light-7"
          />
          <FaCaretDown
            size={15}
            color="var(--green-dark)"
            fill="var(--green-dark)"
            className="social-media-icon grey-light-7"
          />
        </div>
      </div>
    </nav>
  );
}