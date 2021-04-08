// react
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

//components
import PaymentSteps from "./PaymentSteps";

//actions
import { removeFromCart } from "../../actions/cartActions"
import { createPayment } from "../../actions/paymentActions";

//hooks
import useFormatAMPM from "../../hooks/useFormatAMPM";

//constants
import { CART_RESET } from "../../constants/cartConstants";


function PaymentCheckout({ match }) {
  const dispatch = useDispatch();
  const history = useHistory()
  // const location = useLocation();

  const cart = useSelector((state) => state.cart);

  if (cart.length !== 0) {
    // console.log(`cart: ${cart}`)
  }


  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to remove this appointment?")) {
      dispatch(removeFromCart(id));
    }
  };


  const paymentCreate = useSelector((state) => state.paymentCreate);
  const { payment, success, error } = paymentCreate;


  React.useEffect(() => {
    if (success) {
      dispatch({ type: CART_RESET });
      history.push(`/${payment._id}/edit`);
      // history.push(`/home`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  console.log(cart.cartItems)


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

  
  function AMPMTime(time) {
    return useFormatAMPM(time);
  }



  return (
    <div className="container__screen--sidebar">

      <div className="appt__checkout">

        <PaymentSteps step1 step2 step3 step4 />

        <h2 className="appointments__header--container-checkout appointments__header">Checkout</h2>

        <div className="checkout__payment-method">
          <h2 className="font-size-4">Payment Method:&nbsp;</h2>

          <div className="checkout__payment-method--text">
            &nbsp;{cart.paymentMethod}
          </div>
        </div>

        {error && <h2 className="">{error}</h2>}

        <div className="checkout__appts">
          <p className="font-size-4" style={{ padding: "1rem" }}>
            Paying for the following (<strong>{cart.cartItems.length}</strong>){" "}
            appointments:
          </p>
          {cart.cartItems.length === 0 ? (
            <p
              className="font-size-3"
              style={{
                padding: "1rem",
                borderBottom: "2px solid var(--grey-light-6)",
              }}
            >
              Your cart is <span style={{ color: "red" }}>empty</span>
            </p>
          ) : (
            <table className="appointments__list">
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
                          color="var(--green-dark)"
                          fill="var(--red)"
                          className="icon grey-light-7"
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
          <div className="font-size-3">
            <strong>
              Subtotal:
              <br />
            </strong>
            {cart.cartItems.length} &times; $50.00 = $
            {cart.cartItems.length * 50}.00
          </div>
          <div className="font-size-3">
            <strong className="">
              Tax:
              <br />
            </strong>
            ${cart.cartItems.length * 50}.00 &times; 0.08 = $
            {cart.cartItems.length * 50 * 0.08}.00
          </div>
          <div className="font-size-3">
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
          className="btn__payments--confirm-payment"
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );
}

export default withRouter(PaymentCheckout)