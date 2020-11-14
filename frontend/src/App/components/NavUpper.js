import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import {
  NavLink,
  withRouter,
  // useLocation
} from "react-router-dom";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import { logout } from '../actions/userActions'


const activeStyle = {
  // color: "var(--old-blue-2)",
  // backgroundColor: "var(--old-blue-2-opacity-2)",
  fontWeight: 900,
};

function NavUpper({ history }) {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const handleLogout = (e) => {
    e.preventDefault()
    // if(userInfo) {
      dispatch(logout())
      history.push('/login')

    // }
  }

  // React.useEffect(() => {
  //   if (!userInfo) {
  //     history.push('/login')
  //   }
  // }, [history, userInfo])

  return (
    <nav className="nav__upper">
      <div className="logo">
        <a href="/">
          <h1 className="text-size-1 nav__upper-header">
            Kellogg Tutoring
            <span className="nav__upper--house-icon">
              {" "}
              |{" "}
              <span role="img" aria-label="email emoji">
                🏠
              </span>
            </span>
          </h1>
        </a>
      </div>

      <div className="nav__upper--right-container">
        <ul className="nav__list">
          <li className="nav__list--item">
            <NavLink
              to="/appointments"
              activeStyle={activeStyle}
              className="nav__link text-size-5 letter-spacing-sm"
            >
              {/* Apptments */}
              Appts
            </NavLink>
          </li>

          <li className="nav__list--item">
            <NavLink
              to="/meetToshi"
              activeStyle={activeStyle}
              className="nav__link text-size-5 letter-spacing-sm"
            >
              {/* Meet Toshi */}
              Toshi
            </NavLink>
          </li>

          {/* <li className="nav__list--item"> */}
          <NavLink
            to="/contact"
            activeStyle={activeStyle}
            className="nav__link text-size-5 letter-spacing-sm nav__list--item"
          >
            Contact
          </NavLink>
          {/* </li> */}

          <li className="nav__user-icons nav__list-item">
            {userInfo ? (
              <h1 className="text-size-3">{userInfo.name}</h1>
            ) : (
              <FaUserCircle
                size={30}
                // color="var(--green-dark)"
                fill="var(--old-blue-2)"
                className="social-media-icon grey-light-7"
              />
            )}
            <FaCaretDown
              size={15}
              // color="var(--green-dark)"
              fill="var(--old-blue-2)"
              className="social-media-icon grey-light-7 user__dropdown-menu--icon"
            />
            {!userInfo ? (
              // <div className="user__dropdown-menu--wrapper-not-logged-in">
              <ul className="user__dropdown-menu--not-logged-in">
                {/* <li className="user__dropdown-menu--link"> */}
                <NavLink
                  to="/login"
                  activeStyle={activeStyle}
                  className="user__dropdown-menu--link nav__link text-size-5 letter-spacing-sm"
                >
                  Login
                </NavLink>
                {/* </li> */}
                {/* <li className="user__dropdown-menu--link"> */}
                <NavLink
                  to="/settings"
                  activeStyle={activeStyle}
                  className="user__dropdown-menu--link nav__link text-size-5 letter-spacing-sm"
                >
                  Settings
                </NavLink>
                {/* </li> */}
              </ul>
            ) : // </div>
            // <div className="user__dropdown-menu--wrapper-logged-in">

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
                  to="/studentResources"
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
                {/* </li> */}
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
                  to="/studentResources"
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
                {/* </li> */}
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default withRouter(NavUpper)