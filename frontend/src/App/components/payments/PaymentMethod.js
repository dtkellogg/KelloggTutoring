import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter, useHistory } from 'react-router-dom';

// components
import CheckoutSteps from "./PaymentSteps";

// actions
import { savePaymentMethod } from "../../actions/cartActions";

// hooks
import useWindowDimensions from '../../hooks/useWindowDimensions'


const PaymentMethodScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  
  const { width } = useWindowDimensions()
  const history = useHistory()

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/appointments/payments/checkout");
  };


  return (
    <div className={"fadeInAnimated--0", width > 950 ? "container__screen--sidebar" : "container__screen--no-sidebar"}>
      <div className="payment__method--screen">
        <CheckoutSteps step1 step2 step3 />
        <form onSubmit={submitHandler} className="payment__method--screen--form">
          <div className="payment__method--screen--form-container">
            <div className="appointments__header--container">
              <h2 as="legend" className="header__appointments">
                Select payment method:
              </h2>
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
                <label className="font-size-3">PayPal or Credit Card</label>
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