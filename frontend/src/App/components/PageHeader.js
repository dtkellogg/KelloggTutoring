import React from 'react'
import { useDispatch } from "react-redux";

import { subheader } from "../actions/subheader";

import Sidebar from "./Sidebar";





const contactList = ['message form', 'schedule an appointment', 'phone, text & email'];
const appointmentsList = ["Booking", "Payments", "Appointments List", "Appointments Calendar"]
const toshiList = ["About", "Teaching", "Reviews", "Blog"];


// Careful below - Haven't even built components for admin reviews and admin blog below
const adminList = [ "User List", "Appointments", "Reviews", "Blog"];


export default function PageHeader({ location, history, page }) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    page === "appts" 
      ? dispatch(subheader("Schedule, Manage and Pay"))
    : page === "meetToshi" 
      ? dispatch(subheader("Teaching, Background and Reviews"))
    : page === "contact" 
      ? dispatch(subheader("Message, Schedule and Contact"))
    : dispatch(subheader("Admin"));
  }
  , [location, dispatch, page])

    return (
      <div className="pg__appointment">
        
        <Sidebar 
          title={page === "appts" ? "Appointments" : page === "meetToshi" ? "Meet Toshi" : page === "contact" ? "Contact" : "Admin"} 
          list={page === "appts" ? appointmentsList : page === "meetToshi" ? toshiList : page === "contact" ? contactList : adminList} 
        />

        <div className="page-header">
          <h2 className="page-header__text text-size-2">
            Please select an option to the left.
          </h2>
          <span className="page-header__text--emoji text-size-0">
            <span role="img" aria-label="email emoji">
              👈
            </span>
          </span>
        </div>
      </div>
    );
}