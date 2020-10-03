import React from 'react'
import {
  Route,
  Switch,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
import { subheader } from "../actions/subheader";

import Sidebar from "../components/Sidebar";
// import EventCalendar from "../components/Calendar";
import { useDispatch } from "react-redux";
import AppointmentsList from "../components/AppointmentsList";
import PageHeader from "../components/PageHeader";

const appointmentsList = ["Book an Appointment", "Make a payment", "Appointments List", "Appointments Calendar"]


export default function Appointment() {
  let location = useLocation();
  const dispatch = useDispatch();
  const { url } = useRouteMatch();

  React.useEffect(() => {
    dispatch(subheader("Schedule, Manage and Pay"));
  }, [location, dispatch]);

  return (
    <div className="pg__appointment">
      <Sidebar title="Appointments" list={appointmentsList} />

      <Switch>
        <Route exact path={`${url}`}>
          <PageHeader />
        </Route>
        <Route exact path={`${url}/appointments-list`}>
          <AppointmentsList />
        </Route>
        <Route path={`${url}/appointments-calendar`}>
          {/* <AppointmentsList /> */}
        </Route>
        <Route path={`${url}/book-an-appointment`}>
          {/* <PhoneForm /> */}
        </Route>
        <Route exact path={`${url}/make-a-payment`}>
          {/* <AppointmentsList /> */}
        </Route>
        <Route path="*">
          <PageHeader />
        </Route>
      </Switch>
    </div>
  );
}