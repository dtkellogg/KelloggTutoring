import React from 'react'
import { useDispatch } from "react-redux";

// prop-types
import PropTypes from "prop-types";

// components
import Sidebar from "./Sidebar";

// actions
import { subheader } from "../actions/subheader";



const contactList = ['message', 'schedule', 'contact info'];
const appointmentsList = ["Booking", "Payments", "Appts List", "Appts Calendar"]
const toshiList = ["About", "Teaching", "Reviews", "Blog"];


// Careful below - Haven't even built components for admin reviews and admin blog below
const adminList = [ "User List", "Appointments", "Reviews", "Blog"];

// random hands showing user to pick a link to the left...
const hands = ["👈🏻","👈🏼","👈🏽","👈🏾","👈🏿","👈"]
const randomHand = hands[Math.floor(Math.random() * hands.length)];



export default function PageHeader({ location, history, page }) {
  const dispatch = useDispatch();

  return (
    <div className="pg__appointment">
      <Sidebar
        title={
          page === "appts"
            ? "Appointments"
            : page === "meetToshi"
            ? "Meet Toshi"
            : page === "contact"
            ? "Contact"
            : "Admin"
        }
        list={
          page === "appts"
            ? appointmentsList
            : page === "meetToshi"
            ? toshiList
            : page === "contact"
            ? contactList
            : adminList
        }
      />

      <div className="page-header">
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
  )
}

PageHeader.propTypes = {
  page: PropTypes.string
}