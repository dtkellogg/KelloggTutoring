import React from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
// import useHover from '../hooks/useHover'
import { Link } from "react-router-dom"
const { v4: uuid } = require("uuid");

const searchBar = [
  {
    name: "home",
    link: "/home",
  },
  {
    name: "booking",
    link: "/appointments/booking",
  },
  {
    name: "payments",
    link: "/appointments/payments",
  },
  {
    name: "appointments list",
    link: "/appointments/appointments-list",
  },
  {
    name: "appointments calendar",
    link: "/appointments/appointments-calendar",
  },
  {
    name: "about Toshi",
    link: "/meetToshi/about",
  },
  {
    name: "teaching",
    link: "/meetToshi/teaching",
  },
  {
    name: "reviews",
    link: "/meetToshi/reviews",
  },
  {
    name: "blog",
    link: "/meetToshi/blog",
  },
  {
    name: "messages",
    link: "/contact/message-form",
  },
  {
    name: "schedule an appointment",
    link: "/contact/schedule-an-appointment",
  },
  {
    name: "profile",
    link: "/profile",
  },
  {
    name: "settings",
    link: "/settings",
  },
  {
    name: "resources",
    link: "/studentResources",
  },
];

// const names = searchBar.map((item) => item.name).sort()


export default function NavLower() {
  const subheader = useSelector((state) => state.subheader);
  const [searchInput, setSearchInput] = React.useState('')
  const [filterDisplay, setFilterDisplay] = React.useState(searchBar)

  // const [hovering, attrs] = useHover()

  console.log(`filterDisplay: ${filterDisplay}`)

  console.log(`searchInput: ${searchInput}`)

  const handleClick = () => {
    setSearchInput('')
  }

  const handleSearchChange = (e) => {
    console.log(`e: ${e}`)
    

    let oldList = searchBar.map((item) => {
      return {
        name: item.name.toLowerCase(),
        link: item.link
      }
    })

    // if(e !== "") {
      let newList = []

      setSearchInput(e);

      newList = oldList.filter((item) => item.name.includes(searchInput.toLowerCase()))
      setFilterDisplay(newList)
    // } 
    // else 
    // {
    //   setFilterDisplay(oldList)
    // }
    // if(e === '') {
    //   setFilterDisplay(names)
    // }
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   console.log('success')
    // console.log(`HERE: ${searchBar.name.includes(searchInput.toLowerCase())}`)
    // console.log(searchBar.name.includes('home'))
  // }


  return (
    <nav className="nav__lower">
      <h3 className="text-size-3">{subheader.error}</h3>
      <div className="search__wrapper">
        {/* <form onSubmit={handleSubmit} className="nav__search--form"> */}
        <input
          value={searchInput}
          type="text"
          placeholder="Search Kellogg Tutoring..."
          style={searchInput ? {width: "100%"} : {width: "inherit"}}
          className="btn__search"
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        <button className="nav__search--btn">
          <FaSearch
            size={12.5}
            fill="var(--black)"
            className="nav__search--icon grey-light-7"
            onChange={handleSearchChange}
          />
        </button>
        {/* </form> */}
      </div>

      <ul
        className="search__results"
        style={
          searchInput ? {display: "none"} : {display: "block"},
          !filterDisplay ? { border: "none" } : {border: "2px solid var(--black)"}
        }
      >
        {filterDisplay.map((item) => {
          const linkKey = uuid();
          
          return (
            <Link key={linkKey} to={item.link} className="search__item text-size-5" onClick={handleClick}>
              {item.name}
            </Link>
          );
        })}
      </ul>
    </nav>
  );

  // return (
  //   <nav className="nav__lower">
  //     <h3 className="text-size-3">{subheader}</h3>
  //       {hovering ? (
  //         <button className="btn__search btn__search--hover" {...attrs}>
  //           <FaSearch
  //             size={12.5}
  //             fill="var(--white)"
  //             className="nav__search-icon grey-light-7"
  //           />
  //           <span>Search</span>
  //         </button>
  //        ) : (
  //         <button className="btn__search" {...attrs}>
  //           <FaSearch
  //             size={12.5}
  //             fill="var(--black)"
  //             className="nav__search-icon grey-light-7"
  //             onChange={handleSearchChange}
  //           />
  //           <span>Search</span>
  //         </button>
  //        )
  //       }
  //   </nav>
  // );
}