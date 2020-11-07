import * as React from "react";
import { NavLink, useRouteMatch, useLocation } from "react-router-dom";
import slug from "slug";


function CustomLink({ to, children }) {
  const windowLocation = window.location.pathname.split("/")[2]

  // const match = useRouteMatch(to.pathname);
  
  return (
    // <li style={{ fontWeight: match ? 900 : "normal", color: match ? 'var(--old-blue-2)' : 'var(--white)' }}>
    <li style={{ fontWeight: windowLocation === to.pathname ? 900 : "normal", color: windowLocation === to.pathname ? 'var(--old-blue-2)' : 'var(--white)' }}>
      <NavLink to={to}>{children}</NavLink>
    </li>
  );
}


export default function Sidebar({ title, list }) {
  // console.log(`title: ${title}. List: ${list}`);
  const { url } = useRouteMatch();
  const location = useLocation();
  
  const handleScroll = () => window.scrollTo({
    top: 150,
    left: 100,
    behavior: 'smooth'
  });

  return (
    <div className="sidebar">
      <h4 className="text-size-4" style={{color: 'var(--old-blue-2)'}}>{title}</h4>
      <ul className="sidebar__list text-size-5">
        {list.map((item) => {
          if (item === 'phone, text & email') {
            return (<button onClick={handleScroll} style={{ textTransform: 'uppercase', fontWeight: '400', border: 'none', background: 'none', color: 'var(--white)', fontSize: '16.25px', textAlign: 'left'}}>
                      phone, text & email
                    </button>)
          } else if (url.split('/').length === 3){
            // console.log(`URL: ${url}`)
            // console.log(url.split('/').length)
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
          }
          else {
            // console.log(`URL: ${url}`)
            // console.log(url.split('/').length)

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
          )}
})}
      </ul>
    </div>
  );
}
