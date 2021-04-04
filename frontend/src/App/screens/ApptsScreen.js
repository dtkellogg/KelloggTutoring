import React from 'react'
import { Switch, Route, useLocation, useRouteMatch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Calendar from "../components/calendar/Calendar";
import LoadingSpinner from "../components/loading/LoadingSpinner";


const Booking = React.lazy(() => import("../components/appointments/UserBooking"));
const Payments = React.lazy(() => import("../components/payments/Payments"));
const ApptsList = React.lazy(() => import("../components/appointments/ApptsList"));
const PageHeader = React.lazy(() => import("../components/PageHeader"));
const PaymentMethod = React.lazy(() => import("../components/payments/PaymentMethod"));
const Checkout = React.lazy(() => import("../components/payments/PaymentCheckout"));    


function ApptsScreen() {
    const location = useLocation();
    const { url } = useRouteMatch();
    
    return (
        <TransitionGroup>
          <CSSTransition timeout={250} classNames="fade" key={location.key}>
            <Switch location={location}>
              <Route exact path={`${url}/booking`} component={() => <Booking type="booking" />} />
              {/* <Route exact path={`${url}/booking`} component={() => <Booking type="appts"/>} /> */}
              <Route exact path={`${url}/payments`} component={Payments} />
              <Route exact path={`${url}/list`} component={() => <ApptsList type="all" />} />
              <Route exact path={`${url}/calendar`} component={Calendar} />
              <Route exact path={`${url}/payment-method`} component={PaymentMethod} />
              <Route exact path={`${url}/checkout`} component={Checkout} />
              <Route path="*" component={PageHeader} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
    );
}

export default ApptsScreen