import React from 'react'

// prop-types
import PropTypes from "prop-types";

// components
import {Sidebar} from "./navigation/Sidebar";

// data
import { contactList, apptsList, toshiList, adminList } from "../data/lists"

// random hands showing user to pick a link to the left...
const hands = ["👈🏻","👈🏼","👈🏽","👈🏾","👈🏿","👈"]
const randomHand = hands[Math.floor(Math.random() * hands.length)];



export default function PageHeader({ location, history, page }) {

  return (
    <div className="pg__appointment">
      {/* <Sidebar
        title={
          page === "appts"
            ? "Appointments"
            : page === "meetToshi"
            ? "Toshi"
            : page === "contact"
            ? "Contact"
            : "Admin"
        }
        list={
          page === "appts"
            ? apptsList
            : page === "meetToshi"
            ? toshiList
            : page === "contact"
            ? contactList
            : adminList
        }
      /> */}

      <div className="page-header fadeInAnimated--0">
        <h2 className="page-header__text text-size-2">
          Please select an option to the left.
        </h2>
        <span className="page-header__text--emoji text-size-0">
          <span role="img" aria-label="email emoji">
            {randomHand}
          </span>
        </span>
      </div>
    </div>
  );
}

PageHeader.propTypes = {
  page: PropTypes.string
}