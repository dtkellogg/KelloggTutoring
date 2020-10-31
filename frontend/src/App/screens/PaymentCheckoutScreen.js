import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  Link,
  Route,
  Switch,
  useRouteMatch,
  withRouter,
  useLocation,
} from "react-router-dom";
import { FaCheckSquare, FaTrash, FaTimes } from "react-icons/fa";
import { PayPalButton } from "react-paypal-button-v2";
import { listAppointments } from "../actions/appointmentActions";
import { addToCart } from "../actions/cartActions";
// import { payPayment } from "../actions/paymentActions";
import { PAYMENT_PAY_RESET } from "../constants/paymentConstants";
import PaymentSteps from "../components/PaymentSteps";
import PaymentMethod from "./PaymentMethodScreen";
import { removeFromCart } from "../actions/cartActions"
import { createPayment } from "../actions/paymentActions";
import Sidebar from "../components/Sidebar";


const appointmentsList = ["Booking", "Payments", "Appointments List", "Appointments Calendar"]


function PaymentCheckout({ match, history }) {
  const dispatch = useDispatch();
  const location = useLocation();

  const cart = useSelector((state) => state.cart);

  if (cart.length !== 0) {
    // console.log(`cart: ${cart}`)
  }

  React.useEffect(() => {
    dispatch(listAppointments());
  }, [dispatch]);
  // console.log(`PAYMENT METHOD: ${cart.paymentMethod}`)

  const deleteHandler = (id) => {
    console.log(id)
  
    if (window.confirm("Are you sure you want to remove this appointment?")) {
      dispatch(removeFromCart(id));
    }
  };

  const paymentCreate = useSelector((state) => state.paymentCreate);
  const { payment, success, error } = paymentCreate;

  React.useEffect(() => {
    if (success) {
      history.push(`/payment/${payment._id}`);
      // history.push(`/home`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  const submitPaymentHandler = () => {
    dispatch(
      createPayment({
        paymentItems: cart.cartItems,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };




  return (
    <div className="pg__appointment">
      <Sidebar title="Appointments" list={appointmentsList} />
    <div className="appointments">
      <PaymentSteps step1 step2 step3 step4 />
      <div className="appointments__header--container">
        <h2 className="text-size-2 appointments__header">Checkout</h2>
      </div>

      {/* <div className="">
        <h2 className="text-size-2">Payment Method</h2>
        <strong>Method:</strong>
        {cart.paymentMethod}
        <div className=""></div>
      </div> */}
      <div className="checkout__payment-method">
        <h2 className="text-size-2">Payment Method:&nbsp;</h2>
        {/* <strong>Method:</strong> */}

        <div className="text-size-2">
          <strong>{cart.paymentMethod}</strong>
        </div>
      </div>

      {error && <h2 className="text-size-2">{error}</h2>}

      <div
        className=""
        style={{
          padding: "1rem 0",
        }}
      >
        <h2 className="text-size-2" style={{ padding: "1rem" }}>
          Paying for the following (<strong>{cart.cartItems.length}</strong>){" "}
          appointments:
        </h2>
        {cart.cartItems.length === 0 ? (
          <h2
            className="text-size-3"
            style={{
              padding: "1rem",
              borderBottom: "2px solid var(--grey-light-6)",
            }}
          >
            Your cart is <span style={{ color: "red" }}>empty</span>
          </h2>
        ) : (
          <table className="text-size-3 appointments__list">
            <thead className="thead">
              <tr className="tr">
                <th className="appointments__th--date">date</th>
                <th className="appointments__th--time">time</th>
                <th className="appointments__th--student">price</th>
                <th className="appointments__th--subject">subject</th>
                <th className="appointments__th--btns">remove</th>
              </tr>
            </thead>
            <tbody className="tbody">
              {cart.cartItems.map((appt, idx) => {
                const date = appt.date.split("T")[0].split("-");
                const id = appt.appointment;
                // console.log(`appt.date: ${appt.date.prototype.getUTCHours()}`)
                // console.log(appt);
                return (
                  // <li key={appt._id}>{appt.subject}</li>

                  <tr key={idx} className="appointments__list--item">
                    <td className="text-size-3 appointments__item--date">{`${date[1]}-${date[2]}`}</td>
                    <td className="text-size-3 appointments__item--time">{`${appt.startTime} - ${appt.endTime}`}</td>
                    <td className="text-size-3 appointments__item--student">
                      $50.00
                    </td>
                    <td className="text-size-3 appointments__item--subject">
                      {appt.subject}
                    </td>

                    <td className="appointments__item--btns">
                      <FaTrash
                        size={20}
                        color="var(--green-dark)"
                        fill="var(--red)"
                        className="social-media-icon grey-light-7"
                        type="button"
                        onClick={() => deleteHandler(appt.appointment)}
                      />
                    </td>

                    {/* <button className="btn__cancel">Cancel</button> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <div className="checkout__totals">
        <div className="text-size-3">
          <strong>
            Subtotal:
            <br />
          </strong>
          {cart.cartItems.length} &times; $50.00 = ${cart.cartItems.length * 50}
        </div>
        <div className="text-size-3">
          <strong className="">
            Tax:
            <br />
          </strong>
          ${cart.cartItems.length * 50}.00 &times; 0.08 = $
          {cart.cartItems.length * 50 * 0.08}.00
        </div>
        <div className="text-size-3">
          <strong className="">
            Total:
            <br />
          </strong>
          ${cart.cartItems.length * 50 * 0.08}.00 + $
          {cart.cartItems.length * 50}
          .00 = $
          {cart.cartItems.length * 50 * 0.08 + cart.cartItems.length * 50}.00
        </div>
      </div>

      <button
        disabled={cart.cartItems.length === 0}
        onClick={submitPaymentHandler}
        className="btn__confirm-payment"
      >
        Confirm Payment
      </button>
    </div>
    </div>
  );
}

export default withRouter(PaymentCheckout)