import React from 'react'
import {
  Route,
  Switch,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
import { subheader } from "../actions/subheader";

import Sidebar from "../components/Sidebar";
import Calendar from "../components/Calendar";
import { useDispatch } from "react-redux";
import AppointmentsList from "../screens/AppointmentsListScreen";
import Payments from "../screens/PaymentsScreen";
import Checkout from "../screens/CheckoutScreen";
import PageHeader from "../screens/HeaderScreen";

const appointmentsList = ["Booking", "Payments", "Appointments List", "Appointments Calendar"]


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

      {/* <Switch>
        <Route exact path={`${url}`}>
          <PageHeader />
        </Route>
        <Route exact path={`${url}/appointments-list`}>
          <AppointmentsList />
        </Route>
        <Route path={`${url}/appointments-calendar`}>
          <Calendar />
        </Route>
        <Route path={`${url}/booking`}>
        </Route>
        <Route path={`${url}/payments`}>
          <Payments />
        </Route>
        <Route path={`${url}/payments/checkout`}>
          <Checkout />
        </Route>
        <Route path="*">
          <PageHeader />
        </Route>
        <Route path="*">
          <PageHeader />
        </Route>
      </Switch> */}
    </div>
  );
}