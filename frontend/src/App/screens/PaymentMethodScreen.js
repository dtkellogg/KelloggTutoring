import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from 'react-router-dom';
import CheckoutSteps from "../components/PaymentSteps";
import { savePaymentMethod } from "../actions/cartActions";
import Sidebar from "../components/Sidebar";
// import { subheader } from "../actions/subheader";



import { CART_RESET } from "../constants/cartConstants";

const appointmentsList = ["Booking", "Payments", "Appointments List", "Appointments Calendar"]


const PaymentMethodScreen = ({ history }) => {
  // const cart = useSelector((state) => state.cart);
//   const { shippingAddress } = cart;

//   if (!shippingAddress) {
//     history.push("/shipping");
//   }

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

  // React.useEffect(() => {
  //   if (loading) {
  //     dispatch(subheader("Loading..."));
  //   } else {
  //     dispatch(subheader(""));
  //   }
  //   if (error) {
  //     dispatch(subheader({ error }));
  //   }
  // }, [loading, error])


  return (
    <div className="pg__appointment">
      <Sidebar title="Appointments" list={appointmentsList} />
    <div className="payment__method--screen">
      <CheckoutSteps step1 step2 step3 />
      {/* <h2 className="appointments__header--container">
        <Link
          to={`/appointments/payment-method`}
          className="btn__continue text-size-5"
        >
          Continue
        </Link>
        <div className="appointments__header text-size-2">
          Select a payment method:
        </div>
      </h2> */}
      <form onSubmit={submitHandler} className="payment__method--screen--form">
        <div className="payment__method--screen--form-container">
          <div className="appointments__header--container">
            <label as="legend" className="appointments__header text-size-2">
              Select method:
            </label>
            <button type="submit" className="btn__continue--select-method text-size-5">
              Continue
            </button>
          </div>
          <div className="payment__method--screen--form-inputs">
            <div className="payment__method--screen--form-element">
              <input
                type="radio"
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

      <button onClick={handleDelete}>jhbadjbhbhda</button>
    </div>
    </div>
  );
};

export default withRouter(PaymentMethodScreen);
