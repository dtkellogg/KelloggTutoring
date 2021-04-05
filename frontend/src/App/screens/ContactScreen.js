import React from "react";
import { Switch, Route, useLocation, useRouteMatch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import LoadingSpinner from "../components/loading/LoadingSpinner";


const PageHeader = React.lazy(() => import("../components/PageHeader"));
const Booking = React.lazy(() => import("../components/appointments/Booking"));
const MessageScreen = React.lazy(() => import("./MessageScreen"));



function ContactScreen() {
  const location = useLocation();
  const { url } = useRouteMatch();

  return (
      <TransitionGroup>
        <CSSTransition timeout={250} classNames="fade" key={location.key}>
          <Switch location={location}>
            <Route exact path={`${url}/message`} component={MessageScreen} />
            <Route exact path={`${url}/schedule`} component={() => <Booking type="schedule" />} />
            <Route path="*" component={PageHeader} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
  );
}

export default ContactScreen;