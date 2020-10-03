import React from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";


export default function NavLower() {
  const subheader = useSelector((state) => state.subheader);

  return (
    <nav className="nav__lower">
      <h3 className="text-size-3">{subheader}</h3>
      <button className="btn btn__search">
        <FaSearch
          size={12.5}
          color="var(--green)"
          fill="var(--green)"
          className="nav__search-icon grey-light-7"
        />
        <span>Search</span>
      </button>
    </nav>
  );
}