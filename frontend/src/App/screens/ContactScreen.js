import React, { lazy } from "react";
import { Switch, Route, useLocation, useRouteMatch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";


const PageHeader = lazy(() => import("../components/layout/PageHeader"));
const Booking = lazy(() => import("../components/contact/Booking"));
const Message = lazy(() => import("../components/contact/Message"));


function ContactScreen() {
  const location = useLocation();
  const { url } = useRouteMatch();

  return (
      <TransitionGroup>
        <CSSTransition timeout={250} classNames="fade" key={location.key}>
          <Switch location={location}>
            <Route exact path={`${url}/message`} component={Message} />
            <Route exact path={`${url}/schedule`} component={() => <Booking type="schedule" />} />
            <Route path="*" component={PageHeader} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
  );
}

export default ContactScreen;
