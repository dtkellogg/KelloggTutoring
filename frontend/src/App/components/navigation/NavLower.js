import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"

// data
import {searchBar} from "../../data/lists"

// uuid
const { v4: uuid } = require("uuid");


export default function NavLower() {
  const [searchInput, setSearchInput] = useState('')
  const [filterDisplay, setFilterDisplay] = useState(searchBar)
  
  const subheader = useSelector((state) => state.subheader);
  
  const handleClick = () => {
    setSearchInput('')
  }

  const handleSearchChange = (e) => {

    let oldList = searchBar.map((item) => {
      return {
        name: item.name.toLowerCase(),
        link: item.link
      }
    })

    let newList = []

    setSearchInput(e);

    newList = oldList.filter((item) => item.name.includes(searchInput.toLowerCase()))
    setFilterDisplay(newList)
  }


  return (
    <nav className="container__nav--lower">
      <h3 className="nav__subheader">{subheader}</h3>
      <div className="search__wrapper fadeInAnimated--0">
        <input
          value={searchInput}
          type="text"
          placeholder="Search Kellogg Tutoring..."
          style={searchInput ? { width: "100%" } : { width: "inherit" }}
          className="btn__nav--search"
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        <button className="nav__search--btn">
          <FaSearch
            size={12.5}
            fill="var(--black)"
            className="nav__search--icon grey-7"
            onChange={handleSearchChange}
          />
        </button>
      </div>

      {searchInput && (
        <ul
          className="search__results"
          style={
            (searchInput ? { display: "none" } : { display: "block" },
            !filterDisplay
              ? { border: "none" }
              : { border: "2px solid var(--black)" })
          }
        >
          {filterDisplay.map((item) => {
            const linkKey = uuid();

            return (
              <Link
                key={linkKey}
                to={item.link}
                className="search__item"
                onClick={handleClick}
              >
                {item.name}
              </Link>
            );
          })}
        </ul>
      )}
    </nav>
  );
}