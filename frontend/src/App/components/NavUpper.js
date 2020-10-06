import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import {
  NavLink,
  // useRouteMatch,
  // useLocation
} from "react-router-dom";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import { logout } from '../actions/userActions'


const activeStyle = {
  color: "rgb(73, 165, 73)",
  fontWeight: 900,
};

export default function NavUpper() {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <nav className="nav__upper">
      <div className="logo">
        <a href="/">
          <h1 className="text-size-1 black nav__upper-header">
            Kellogg Tutoring |{" "}
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
          {userInfo ? (
            <h1 className="text-size-3">{userInfo.name}</h1>
          ) : (
            <FaUserCircle
              size={30}
              color="var(--green-dark)"
              fill="var(--green-dark)"
              className="social-media-icon grey-light-7"
            />
          )}
          <FaCaretDown
            size={15}
            color="var(--green-dark)"
            fill="var(--green-dark)"
            className="social-media-icon grey-light-7 user__dropdown-menu--icon"
          />
          {(!userInfo)
            ? (
              <div className="user__dropdown-menu--wrapper-not-logged-in">
                <ul className="user__dropdown-menu">
                  <li className="user__dropdown-menu--link">
                    <NavLink
                      to="/login"
                      activeStyle={activeStyle}
                      className="nav__link text-size-5 letter-spacing-sm"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="user__dropdown-menu--link">
                    <NavLink
                      to="/settings"
                      activeStyle={activeStyle}
                      className="nav__link text-size-5 letter-spacing-sm"
                    >
                      Settings
                    </NavLink>
                  </li>
                </ul>
              </div>
              ) : (
              <div className="user__dropdown-menu--wrapper-logged-in">
                <ul className="user__dropdown-menu">
                  <li className="user__dropdown-menu--link">
                    <NavLink
                      to="/profile"
                      activeStyle={activeStyle}
                      className="nav__link text-size-5 letter-spacing-sm"
                    >
                      Profile
                    </NavLink>
                    </li>
                    <li className="user__dropdown-menu--link">
                      <NavLink
                        to="/studentResources"
                        activeStyle={activeStyle}
                        className="nav__link text-size-5 letter-spacing-sm"
                      >
                      Resources
                    </NavLink>
                  </li>
                  <li className="user__dropdown-menu--link">
                    <NavLink
                      to="/zoom"
                      activeStyle={activeStyle}
                      className="nav__link text-size-5 letter-spacing-sm"
                    >
                      Zoom
                    </NavLink>
                  </li>
                  <li className="user__dropdown-menu--link">
                    <NavLink
                      to="/settings"
                      activeStyle={activeStyle}
                      className="nav__link text-size-5 letter-spacing-sm"
                    >
                      Settings
                    </NavLink>
                  </li>
                  <li className="user__dropdown-menu--link">
                    <NavLink
                      to="/logout"
                      activeStyle={activeStyle}
                      className="nav__link text-size-5 letter-spacing-sm"
                      onClick={logoutHandler}
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}

    
           
        </div>
      </div>
    </nav>
  );
}