import React from 'react'
import {
  Route,
  Link,
  Switch,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import Sidebar from "../components/Sidebar";
// import EventCalendar from "../components/Calendar";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { subheader } from "../actions/subheader";
import AppointmentsList from "../components/AppointmentsList";
import PageHeader from "../components/PageHeader";

const appointmentsList = ["Book an Appointment", "Make a payment", "Appointments List", "Calendar"]


export default function Appointment() {
  let location = useLocation();
  const dispatch = useDispatch();
  const { url } = useRouteMatch();

  React.useEffect(() => {
    dispatch(subheader("Schedule, Manage and Pay"));
  }, [location]);

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
        <Route path={`${url}/calendar`}>
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