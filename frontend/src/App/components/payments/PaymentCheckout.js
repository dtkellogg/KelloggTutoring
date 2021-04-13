// react
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

//components
import PaymentSteps from "./PaymentSteps";
import PaymentsTableHead from './PaymentsTableHead'
import PaymentTotals from './PaymentTotals'

//actions
import { removeFromCart } from "../../actions/cartActions"
import { createPayment } from "../../actions/paymentActions";

//hooks
import useFormatAMPM from "../../hooks/useFormatAMPM";

//constants
import { CART_RESET } from "../../constants/cartConstants";


function AMPMTime(time) {
  return useFormatAMPM(time);
}


function PaymentCheckout() {
  const dispatch = useDispatch();
  const history = useHistory()

  const cart = useSelector((state) => state.cart);
  const paymentMethod = cart.paymentMethod;

  const paymentCreate = useSelector((state) => state.paymentCreate);
  const { payment, success, error } = paymentCreate;

  useEffect(() => {
    if (success) {
      dispatch({ type: CART_RESET });
      history.push(`/appointments/payments/${payment._id}/edit`);
    }
    
  }, [history, success]); // eslint-disable-next-line

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

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to remove this appointment?")) {
      dispatch(removeFromCart(id));
    }
  };

  //   Calculate prices
  // const addDecimals = (num) => {
  //     return (Math.round(num * 100) / 100).toFixed(2)
  // }

  // cart.itemsPrice = addDecimals(
  //     cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  // )
  // cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
  // cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
  // cart.totalPrice = (
  //     Number(cart.itemsPrice) +
  //     Number(cart.shippingPrice) +
  //     Number(cart.taxPrice)
  // ).toFixed(2)


  return (
    <div className="container__screen--sidebar">

      <div className="container__checkout">

        <PaymentSteps step1 step2 step3 step4 />

        <h2 className="header__appointments">Checkout</h2>

        <div className="checkout__payment-method">
          <span className="font-size-4">Payment Method:&nbsp;</span>

          <div className="checkout__payment-method--text">
            &nbsp;{paymentMethod}
          </div>
        </div>

        <div className="checkout__appts">
          <p className="font-size-4" style={{ padding: "1rem" }}>
            Paying for the following <strong>{cart.cartItems.length}</strong>{" "}
            appointments:
          </p>
          {cart.cartItems.length === 0 ? (
            <p
              className="font-size-3"
              style={{
                padding: "1rem",
                borderBottom: "2px solid var(--grey-6)",
              }}
            >
              Your cart is <span style={{ color: "red" }}>empty</span>
            </p>
          ) : (
            <table className="appointments__list">

              <PaymentsTableHead type="checkout" />

              <tbody className="tbody">
                {cart.cartItems.map((appt, idx) => {
                  const date = appt.date.split("T")[0].split("-");
                  const id = appt.appointment;

                  return (
                    <tr key={id} className="appointments__list--item">
                      <td className="appointments__item--date">{`${date[1]}-${date[2]}`}</td>
                      <td className="appointments__item--time">{`${AMPMTime(
                        appt.startTime
                      )} - ${AMPMTime(appt.endTime)}`}</td>
                      <td className="appointments__item--student">
                        $50.00
                      </td>
                      <td className="appointments__item--subject">
                        {appt.subject}
                      </td>

                      <td className="appointments__item--btns">
                        <FaTrash
                          size={15}
                          fill="var(--red-1)"
                          className="icon grey-7"
                          type="button"
                          onClick={() => deleteHandler(appt.appointment)}
                        />
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <PaymentTotals />

        <button
          disabled={cart.cartItems.length === 0}
          onClick={submitPaymentHandler}
          className="btn__payments--confirm-payment"
        >
          Confirm Payment
        </button>

      </div>
    </div>
  );
}

export default withRouter(PaymentCheckout)