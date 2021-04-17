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
  fontWeight: 600,
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
    <nav className="container__nav--upper">
      <NavLink to="/" className="nav__upper--title-text">
        <h1 className="nav__upper--text fadeInAnimated--0">
          {" "}Kellogg Tutoring&nbsp;{" "}
        </h1>
        <span className="nav__upper--title-line"> |&nbsp; </span>
        <span
          className="nav__upper--house-icon"
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
                  className="nav__link"
                >
                  {navEl.name}
                </NavLink>
              </li>
            );
          })}

          <li className="nav__user-icons nav__expanded-item">
            {userInfo ? (
              <h1 className="nav__user-name">
                {userInfo.name.split(" ")[0]}
              </h1>
            ) : (
              <FaUserCircle
                size={30}
                fill="var(--old-blue-2)"
                className="icon grey-7"
              />
            )}
            <FaCaretDown
              size={15}
              fill="var(--old-blue-2)"
              className="icon grey-7 dropdown-nav__icon"
              style={{ display: width > 450 || userInfo ? "block" : "none" }}
            />
            {!userInfo ? (
              <ul className="dropdown-nav__not-logged-in">
                {navCondensedNotLoggedIn.map((navEl)=> {
                  return <NavLink
                    to={navEl.to}
                    activeStyle={activeStyle}
                    className="dropdown-nav__link nav__link"
                  >
                    {navEl.name}
                  </NavLink>
                  })
                }
              </ul>

            ) : userInfo.isAdmin ? (
                <ul className="dropdown-nav__logged-in">
                  {navCondensedAdmin.map((navEl) => {
                    return <NavLink
                      to={navEl.to}
                      activeStyle={activeStyle}
                      className="dropdown-nav__link nav__link--dropdown"
                    >
                      {navEl.name}
                    </NavLink>
                  })
                }
                <NavLink
                  to="/login"
                  activeStyle={activeStyle}
                  className="dropdown-nav__link nav__link--dropdown"
                  onClick={handleLogout}
                >
                  Logout
                </NavLink>
              </ul>

            ) : (
              <ul className="dropdown-nav__logged-in--not-admin">
                {navCondensedLoggedIn.map((navEl) => {
                  return <NavLink
                    to={navEl.to}
                    activeStyle={activeStyle}
                    className="dropdown-nav__link nav__link--dropdown"
                  >
                    {navEl.name}
                  </NavLink>;
                })}
                
                <NavLink
                  to="/logout"
                  activeStyle={activeStyle}
                  className="dropdown-nav__link nav__link--dropdown"
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