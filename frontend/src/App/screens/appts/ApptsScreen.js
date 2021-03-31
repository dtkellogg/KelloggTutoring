import React from 'react'
import { Switch, Route, useLocation, useRouteMatch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {Sidebar} from '../../components/navigation/Sidebar'
import Calendar from "../../components/Calendar";
import LoadingSpinner from "../../components/LoadingSpinner";

// sidebar list
import { apptsList } from '../../data/lists'

const Booking = React.lazy(() => import("../user/UserBookingScreen"));
const Payments = React.lazy(() => import("../payments/PaymentsScreen"));
const ApptsList = React.lazy(() => import("../../components/ApptsList"));
const PageHeader = React.lazy(() => import("../../components/PageHeader"));
const PaymentMethod = React.lazy(() => import("../payments/PaymentMethodScreen"));
const Checkout = React.lazy(() => import("../payments/PaymentCheckoutScreen"));    


function ApptsScreen() {
    const location = useLocation();
    const { url } = useRouteMatch();
    
    return (
      <div className="pg__appointment container__appts">
        <Sidebar title="Appointments" list={apptsList} />

        <TransitionGroup component={null}>
          <CSSTransition timeout={250} classNames="fade" key={location.key}>
            <Switch location={location}>
              <Route
                exact
                path={`${url}/booking`}
                component={() => <Booking type="booking" />}
              />
              {/* <Route exact path={`${url}/booking`} component={() => <Booking type="appts"/>} /> */}
              <Route exact path={`${url}/payments`} component={Payments} />
              <Route
                exact
                path={`${url}/list`}
                component={() => <ApptsList type="all" />}
              />
              <Route exact path={`${url}/calendar`} component={Calendar} />
              <Route
                exact
                path={`${url}/payment-method`}
                component={PaymentMethod}
              />
              <Route exact path={`${url}/checkout`} component={Checkout} />
              <Route path="*">
                <PageHeader />
              </Route>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
}

export default ApptsScreen