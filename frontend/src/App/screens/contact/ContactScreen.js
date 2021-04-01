import React from "react";
import { Switch, Route, useLocation, useRouteMatch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Sidebar } from "../../components/navigation/Sidebar";
import Calendar from "../../components/Calendar";
import LoadingSpinner from "../../components/LoadingSpinner";


const PageHeader = React.lazy(() => import("../../components/PageHeader"));
const Booking = React.lazy(() => import("../user/UserBookingScreen"));
const MessageScreen = React.lazy(() => import("../MessageScreen"));



function ContactScreen() {
  const location = useLocation();
  const { url } = useRouteMatch();

  return (
    <div className="pg__appointment container__appts">
      {/* <Sidebar title="Appointments" list={apptsList} /> */}

      <TransitionGroup>
        <CSSTransition timeout={250} classNames="fade" key={location.key}>
          <Switch location={location}>
            <Route exact path={`${url}/message`} component={MessageScreen} />
            <Route
              exact
              path={`${url}/schedule`}
              component={() => <Booking type="schedule" />}
            />
            <Route path="*">
              <PageHeader page="appts" />
            </Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default ContactScreen;
