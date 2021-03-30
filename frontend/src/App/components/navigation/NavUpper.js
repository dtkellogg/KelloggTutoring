import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, withRouter, useHistory } from "react-router-dom";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";

// actions
import { logout } from '../../actions/userActions'

// hooks
import useWindowDimensions from '../../hooks/useWindowDimensions'

// data
import { navExpandedLinks, navCondensedNotLoggedIn, navCondensedLoggedIn, navCondensedAdmin } from '../../data/lists'


const activeStyle = {
  color: "var(--old-blue-2)",
  backgroundColor: "var(--old-blue-2-opacity-2)",
  border: "1px dotted var(--old-blue-2)",
  fontWeight: 900,
};

function NavUpper() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { width } = useWindowDimensions()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logout())
    history.push('/login')
  }

  return (
    <nav className="nav__upper">
      <NavLink to="/" className="nav__upper--title-text">
        <h1 className="text-size-1 nav__upper--text fadeInAnimated--0">
          {" "}Kellogg Tutoring&nbsp;{" "}
        </h1>
        <span className="text-size-1 nav__upper--title-line"> |&nbsp; </span>
        <span
          className="text-size-1 nav__upper--house-icon"
          role="img"
          aria-label="email emoji"
        >
          {" "}🏠{" "}
        </span>
      </NavLink>

      <div className="nav__upper--right-container">
        <ul className="nav__expanded fadeInAnimated--0">
          {navExpandedLinks.map((navEl) => {
            return (
              <li className="nav__expanded--item">
                <NavLink
                  to={navEl.to}
                  activeStyle={activeStyle}
                  className="nav__link text-size-5 letter-spacing-sm"
                >
                  {navEl.name}
                </NavLink>
              </li>
            );
          })}

          <li className="nav__user-icons nav__expanded-item">
            {userInfo ? (
              <h1 className="nav__user-name text-size-3">
                {userInfo.name.split(" ")[0]}
              </h1>
            ) : (
              <FaUserCircle
                size={30}
                fill="var(--old-blue-2)"
                className="social-media-icon grey-light-7"
              />
            )}
            <FaCaretDown
              size={15}
              fill="var(--old-blue-2)"
              className="social-media-icon grey-light-7 user__dropdown-menu--icon"
              style={{ display: width > 450 || userInfo ? "block" : "none" }}
            />
            {!userInfo ? (
              <ul className="user__dropdown-menu--not-logged-in">
                {navCondensedNotLoggedIn.map((navEl)=> {
                  return <NavLink
                    to={navEl.to}
                    activeStyle={activeStyle}
                    className="user__dropdown-menu--link nav__link text-size-5 letter-spacing-sm"
                  >
                    {navEl.name}
                  </NavLink>
                  })
                }
              </ul>

            ) : userInfo.isAdmin ? (
                <ul className="user__dropdown-menu--logged-in fadeInAnimated--0">
                  {navCondensedAdmin.map((navEl) => {
                    return <NavLink
                      to={navEl.to}
                      activeStyle={activeStyle}
                      className="user__dropdown-menu--link nav__link--dropdown text-size-5 letter-spacing-sm"
                    >
                      {navEl.name}
                    </NavLink>
                  })
                }
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
              <ul className="user__dropdown-menu--logged-in--not-admin fadeInAnimated--0">
                {navCondensedLoggedIn.map((navEl) => {
                  return <NavLink
                    to={navEl.to}
                    activeStyle={activeStyle}
                    className="user__dropdown-menu--link nav__link--dropdown text-size-5 letter-spacing-sm"
                  >
                    {navEl.name}
                  </NavLink>;
                })}
                
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