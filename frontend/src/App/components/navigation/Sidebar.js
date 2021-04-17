import React, { memo } from 'react'
import { NavLink, useRouteMatch, useLocation } from "react-router-dom";

// slug
import slug from "slug";

// uuid
const { v4: uuid } = require("uuid");

function CustomLink({ to, children }) {
  const match = useRouteMatch(to.pathname);

  return (
    <li style={{ fontWeight: match ? 700 : 300, color: match ? "var(--old-blue-2)" : "var(--white"}}>
      <NavLink to={to}>{children}</NavLink>
    </li>
  );
}

function SidebarRaw({ title, list, url }) {
  const location = useLocation();

  const handleScroll = () => window.scrollTo({
    top: 550,
    left: 100,
    behavior: 'smooth'
  });

  return (
    <div className="container__sidebar">
      <h4 className="sidebar__title" style={{color: 'var(--old-blue-2)'}}>{title}</h4>
      <ul className="sidebar__list">
        {list.map((item) => {
          if(item === 'contact info') {
            return (
              <button className="btn__contact-info" key={uuid()} onClick={handleScroll} >
                contact info
              </button>)
          } else {
          return <CustomLink
            key={item}
            to={{
              pathname: `/${url}/${slug(item)}`,
              search: location.search,
            }}
          >
            {item.toUpperCase()}
          </CustomLink>
          }})}
      </ul>
    </div>
  );
}

export const Sidebar = memo(SidebarRaw, (prevProps, nextProps) => {
  return prevProps.count === nextProps.count
})