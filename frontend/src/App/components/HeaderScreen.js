import React from 'react'
// import {
//   useRouteMatch,
// } from "react-router-dom";
import { subheader } from "../actions/subheader";
import { useDispatch } from "react-redux";
import Sidebar from "../components/Sidebar";


const contactList = ['message form', 'schedule an appointment', 'phone, text & email'];
const appointmentsList = ["Booking", "Payments", "Appointments List", "Appointments Calendar"]
const toshiList = [
  "About",
  "Teaching",
  "Reviews",
  "Blog",
];
const adminList = [
  "User List",
  "Appointments",
  // "Reviews",
  // "Blog",
];


export default function PageHeader({ location, history, page }) {
  // let location = useLocation();
  const dispatch = useDispatch();
  // const { url } = useRouteMatch();

  React.useEffect(() => {
    dispatch(subheader("Schedule, Manage and Pay"));
  }, [location, dispatch]);

    return (
      <div className="pg__appointment">
        <Sidebar title={page === "appts" ? "Appointments" : page === "meetToshi" ? "Meet Toshi" : page === "contact" ? "Contact" : "Admin"} list={page === "appts" ? appointmentsList : page === "meetToshi" ? toshiList : page === "contact" ? contactList : adminList} />
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