import React from 'react'
import Sidebar from "../components/Sidebar";
import {
  Route,
  Switch,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
import { subheader } from "../actions/subheader";
import { useDispatch } from "react-redux";

const appointmentsList = ["Booking", "Payments", "Appointments List", "Calendar"]



export default function PageHeader({ location, history }) {
  // let location = useLocation();
  const dispatch = useDispatch();
  const { url } = useRouteMatch();

  React.useEffect(() => {
    dispatch(subheader("Schedule, Manage and Pay"));
  }, [location, dispatch]);

    return (
      <div className="pg__headerScreen">
        <Sidebar title="Appointments" list={appointmentsList} />
        <h2 className="page-header__text text-size-2">
          Please select an option to the left.
        </h2>
        <span className="page-header__text--emoji text-size-0">
          <span role="img" aria-label="email emoji">
            👈
          </span>
        </span>
      </div>
    );
}