import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, withRouter } from "react-router-dom";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";

// actions
import { logout } from '../actions/userActions'

// hooks
import useWindowDimensions from '../hooks/useWindowDimensions'


const activeStyle = {
  color: "var(--old-blue-2)",
  backgroundColor: "var(--old-blue-2-opacity-2)",
  border: "1px dotted var(--old-blue-2)",
  fontWeight: 900,
};

function NavUpper({ history }) {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const { width } = useWindowDimensions()

  const handleLogout = (e) => {
    e.preventDefault()
    // if(userInfo) {
    dispatch(logout())
    history.push('/login')

    // }
  }

  return (
    <nav className="nav__upper">
      {/* <div className="nav__upper--text"> */}
        <NavLink to="/" className="nav__upper--title-text">
          <h1 className="text-size-1 nav__upper--text"> Kellogg Tutoring&nbsp; </h1>
          <span className="text-size-1 nav__upper--title-line"> |&nbsp; </span>
          <span className="text-size-1 nav__upper--house-icon" role="img" aria-label="email emoji"> 🏠 </span>
        </NavLink>
      {/* </div> */}

      {/* <div className="nav__upper--text">
        <NavLink to="/" className="nav__upper--title-text">
          Kellogg Tutoring&nbsp;
            <span> |&nbsp; </span>
          <NavLink to="/" className="nav__upper--house-icon" role="img" aria-label="email emoji">
            <span role="img" aria-label="email emoji">
              🏠
            </span>
          </NavLink>
        </NavLink>
      </div> */}

      <div className="nav__upper--right-container">
        <ul className="nav__list">
          <li className="nav__list--item">
            <NavLink
              to="/appointments"
              activeStyle={activeStyle}
              className="nav__link text-size-5 letter-spacing-sm"
            >
              Appts
            </NavLink>
          </li>

          <li className="nav__list--item">
            <NavLink
              to="/meetToshi"
              activeStyle={activeStyle}
              className="nav__link text-size-5 letter-spacing-sm"
            >
              Toshi
            </NavLink>
          </li>

          <li className="nav__list--item">
          <NavLink
            to="/contact"
            activeStyle={activeStyle}
            className="nav__link text-size-5 letter-spacing-sm nav__list--item"
          >
            Contact
          </NavLink>
          </li>

          <li className="nav__user-icons nav__list-item">
            {userInfo ? (
              <h1 className="nav__user-name text-size-3">{userInfo.name.split(" ")[0]}</h1>
            ) : (
              <FaUserCircle
                size={30}
                fill="var(--old-blue-2)"
                className="social-media-icon grey-light-7"
              />
            )}
            {/* { width > 350 && <FaCaretDown */}
            {<FaCaretDown
              size={15}
              fill="var(--old-blue-2)"
              className="social-media-icon grey-light-7 user__dropdown-menu--icon"
              style={{display: width > 450 || userInfo? 'block' : 'none'}} 
            />}
            {!userInfo ? (
              <ul className="user__dropdown-menu--not-logged-in">
                <NavLink
                  to="/login"
                  activeStyle={activeStyle}
                  className="user__dropdown-menu--link nav__link text-size-5 letter-spacing-sm"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/settings"
                  activeStyle={activeStyle}
                  className="user__dropdown-menu--link nav__link text-size-5 letter-spacing-sm"
                >
                  Settings
                </NavLink>
              </ul>
            ) :

            userInfo.isAdmin ? (
              <ul className="user__dropdown-menu--logged-in">
                {userInfo.isAdmin && (
                  <NavLink
                    to="/admin"
                    activeStyle={activeStyle}
                    className="user__dropdown-menu--link nav__link--dropdown text-size-5 letter-spacing-sm"
                  >
                    Admin
                  </NavLink>
                )}

                <NavLink
                  to="/profile"
                  activeStyle={activeStyle}
                  className="user__dropdown-menu--link nav__link--dropdown text-size-5 letter-spacing-sm"
                >
                  Profile
                </NavLink>

                <NavLink
                  to="/zoom"
                  activeStyle={activeStyle}
                  className="user__dropdown-menu--link nav__link--dropdown text-size-5 letter-spacing-sm"
                >
                  Zoom
                </NavLink>

                <NavLink
                  to="/resources"
                  activeStyle={activeStyle}
                  className="user__dropdown-menu--link nav__link--dropdown text-size-5 letter-spacing-sm"
                >
                  Resources
                </NavLink>

                <NavLink
                  to="/settings"
                  activeStyle={activeStyle}
                  className="user__dropdown-menu--link nav__link--dropdown text-size-5 letter-spacing-sm"
                >
                  Settings
                </NavLink>

                <NavLink
                  to="/login"
                  activeStyle={activeStyle}
                  className="user__dropdown-menu--link nav__link--dropdown text-size-5 letter-spacing-sm"
                  onClick={handleLogout}
                >
                  Logout
                </NavLink>
              </ul>
            ) : (
              <ul className="user__dropdown-menu--logged-in--not-admin">
                <NavLink
                  to="/profile"
                  activeStyle={activeStyle}
                  className="user__dropdown-menu--link nav__link--dropdown text-size-5 letter-spacing-sm"
                >
                  Profile
                </NavLink>

                <NavLink
                  to="/zoom"
                  activeStyle={activeStyle}
                  className="user__dropdown-menu--link nav__link--dropdown text-size-5 letter-spacing-sm"
                >
                  Zoom
                </NavLink>

                <NavLink
                  to="/resources"
                  activeStyle={activeStyle}
                  className="user__dropdown-menu--link nav__link--dropdown text-size-5 letter-spacing-sm"
                >
                  Resources
                </NavLink>

                <NavLink
                  to="/settings"
                  activeStyle={activeStyle}
                  className="user__dropdown-menu--link nav__link--dropdown text-size-5 letter-spacing-sm"
                >
                  Settings
                </NavLink>

                <NavLink
                  to="/logout"
                  activeStyle={activeStyle}
                  className="user__dropdown-menu--link nav__link--dropdown text-size-5 letter-spacing-sm"
                  onClick={handleLogout}
                >
                  Logout
                </NavLink>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default withRouter(NavUpper)