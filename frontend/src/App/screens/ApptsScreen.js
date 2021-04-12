import React from 'react'
import { Switch, Route, useLocation, useRouteMatch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import LoadingSpinner from "../components/loading/LoadingSpinner";


const Booking = React.lazy(() => import("../components/appointments/Booking"));
const Payments = React.lazy(() => import("../components/payments/PaymentsList"));
const ApptsList = React.lazy(() => import("../components/appointments/ApptsList"));
const CalendarScreen = React.lazy(() => import("./CalendarScreen"));
const PageHeader = React.lazy(() => import("../components/PageHeader"));
const PaymentMethod = React.lazy(() => import("../components/payments/PaymentMethod"));
const Checkout = React.lazy(() => import("../components/payments/PaymentCheckout"));    
const Payment = React.lazy(() => import("../components/payments/Payment"));



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
              <Route exact path={`${url}/payments/payment-method`} component={PaymentMethod} />
              <Route exact path={`${url}/payments/checkout`} component={Checkout} />
              <Route exact path={`${url}/payments/:id/edit`} component={Payment} />
              <Route exact path={`${url}/list`} component={() => <ApptsList type="all" />} />
              <Route exact path={`${url}/calendar`} component={CalendarScreen} />
              <Route path="*" component={PageHeader} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
    );
}

export default ApptsScreen