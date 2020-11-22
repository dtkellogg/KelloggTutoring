import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from 'react-router-dom';
import CheckoutSteps from "../components/PaymentSteps";
import { savePaymentMethod } from "../actions/cartActions";
import Sidebar from "../components/Sidebar";
// import { subheader } from "../actions/subheader";



import { CART_RESET } from "../constants/cartConstants";

const appointmentsList = ["Booking", "Payments", "Appts List", "Appts Calendar"]


const PaymentMethodScreen = ({ history }) => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/appointments/checkout");
  };


  const handleDelete = () => {
    dispatch({type: CART_RESET})
  }

  return (
    <div className="pg__appointment">
      <Sidebar title="Appointments" list={appointmentsList} />
      <div className="payment__method--screen">
      <CheckoutSteps step1 step2 step3 />
      <form onSubmit={submitHandler} className="payment__method--screen--form">
        <div className="payment__method--screen--form-container">
          <div className="appointments__header--container">
            <label as="legend" className="appointments__header text-size-2">
              Select payment method:
            </label>
            <button type="submit" className="btn__continue--select-method text-size-5">
              Continue
            </button>
          </div>
          <div className="payment__method--screen--form-inputs">
            <div className="payment__method--screen--form-element">
              <input
                type="radio"
                className="btn__radio"
                // label="PayPal or Credit Card"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="text-size-3">PayPal or Credit Card</label>
            </div>
            {/* <div className="payment__method--screen--form-element">
              <label className="">Stripe</label>
              <input
                type="radio"
                label="Stripe"
                id="Stripe"
                name="paymentMethod"
                value="Stripe"
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></input>
            </div> */}
          </div>
        </div>
      </form>

      <button onClick={handleDelete}>RESET CART</button>
    </div>
    </div>
  );
};

export default withRouter(PaymentMethodScreen);
