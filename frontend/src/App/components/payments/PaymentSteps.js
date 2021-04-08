import React from 'react'
import { 
  useRouteMatch,
  //  useLocation,
   NavLink
 } from "react-router-dom";

const activeStyle = {
  color: "rgb(73, 165, 73)",
  fontWeight: 900,
};

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  // let location = useLocation();
  const { path } = useRouteMatch();

	return (
      <ul className="payment__steps--ul">
        <li>
          {step1 ? (
            <NavLink
              to="/login"
              activeStyle={activeStyle}
              className="nav__link"
              style={{ color: "var(--old-blue-2)"}}
            >
              Sign In
            </NavLink>
          ) : (
            <div className="payment__steps--li" disabled>Sign In</div>
          )}
        </li>

        <li>
          {step2 ? (
            <NavLink
              to={`/appointments/payments`}
              // activeStyle={activeStyle}
              className="nav__link"
              style={{ color: "var(--old-blue-2)"}}
            >
              Appointments
            </NavLink>
          ) : (
            <div className="payment__steps--li" disabled>Payment</div>
          )}
        </li>

        <li>
          {step3 ? (
            <NavLink
              to={`/appointments/payments/payment-method`} 
              // activeStyle={activeStyle}}
              className="nav__link"
              style={{ color: "var(--old-blue-2)"}}
            >
              Payment Method
            </NavLink>
          ) : (
            <div className="payment__steps--li" disabled>Payment Method</div>
          )}
        </li>

        <li>
          {step4 ? (
            <NavLink
              to={`${path}/submit-payment`}
              // activeStyle={activeStyle}
              className="nav__link"
              style={{ color: "var(--old-blue-2)"}}
            >
              Submit
            </NavLink>
          ) : (
            <div className="payment__steps--li" disabled>Submit</div>
          )}
        </li>
      </ul>
  );
}

export default CheckoutSteps