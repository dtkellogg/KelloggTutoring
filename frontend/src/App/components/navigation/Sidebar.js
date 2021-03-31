import React from 'react'
import { NavLink, useRouteMatch, useLocation } from "react-router-dom";

// slug
import slug from "slug";

// uuid
const { v4: uuid } = require("uuid");



function CustomLink({ to, children }) {
  const windowLocation = window.location.pathname.split("/")[2]

  // const match = useRouteMatch(to.pathname);
  
  return (
    <li style={{ fontWeight: windowLocation === to.pathname ? 900 : "normal", color: windowLocation === to.pathname ? 'var(--old-blue-2)' : 'var(--white)' }}>
      <NavLink to={to}>{children}</NavLink>
    </li>
  );
}


function SidebarRaw({ title, list }) {
  const { url } = useRouteMatch();
  const location = useLocation();
  
  const handleScroll = () => window.scrollTo({
    top: 550,
    left: 100,
    behavior: 'smooth'
  });


  return (
    <div className="container__sidebar">
      <h4 className="sidebar__title text-size-4" style={{color: 'var(--old-blue-2)'}}>{title}</h4>
      <ul className="sidebar__list text-size-5">
        {list.map((item) => {
          if (item === 'contact info') {
            return (
              <button className="btn__contact-info text-size-5" key={uuid()} onClick={handleScroll} >
                contact info
              </button>)
          } else if (url.split('/').length === 3){
            return (
              <CustomLink
                key={item}
                to={{
                  pathname: `${slug(item)}`,
                  search: location.search,
                }}
              >
                {item.toUpperCase()}
              </CustomLink>
            )
          } else if (url.split('/').length > 3) {
            return (
              <CustomLink
                key={item}
                to={{
                  pathname: `/${url.split('/')[1]}/${slug(item)}`,
                  search: location.search,
                }}
              >
                {item.toUpperCase()}
              </CustomLink>
            )
          }
          else {

            return (
              <CustomLink
                key={item}
                to={{
                  pathname: `${url}/${slug(item)}`,
                  search: location.search,
                }}
              >
                {item.toUpperCase()}
              </CustomLink>
            )
          }
        })}
      </ul>
    </div>
  );
}

export const Sidebar = React.memo(SidebarRaw)