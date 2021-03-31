import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from 'react-router-dom';

// components
import CheckoutSteps from "../../components/PaymentSteps";
import {Sidebar} from "../../components/navigation/Sidebar";

// actions
import { savePaymentMethod } from "../../actions/cartActions";

// data
import { apptsList } from "../../data/lists"


const PaymentMethodScreen = ({ history }) => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/appointments/checkout");
  };


  return (
    <div className="pg__appointment">
      <Sidebar title="Appointments" list={apptsList} />
      <div className="payment__method--screen">
        <CheckoutSteps step1 step2 step3 />
        <form onSubmit={submitHandler} className="payment__method--screen--form">
          <div className="payment__method--screen--form-container">
            <div className="appointments__header--container">
              <label as="legend" className="appointments__header text-size-2">
                Select payment method:
              </label>
              <button type="submit" className="btn__payment-method--continue">
                continue
              </button>
            </div>
            <div className="payment__method--screen--form-inputs">
              <div className="payment__method--screen--form-element">
                <input
                  type="radio"
                  className="btn__radio"
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
      </div>
    </div>
  )
};

export default withRouter(PaymentMethodScreen);
