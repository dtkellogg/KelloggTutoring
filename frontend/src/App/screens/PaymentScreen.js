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
import { PAYMENT_PAY_RESET, PAYMENT_PAY_FAIL } from "../constants/paymentConstants";
import PaymentSteps from "../components/PaymentSteps";
import PaymentMethod from "../screens/PaymentMethodScreen";
import { removeFromCart } from "../actions/cartActions";
import { getPaymentDetails, payPayment } from "../actions/paymentActions";
import Loading from "../components/Loading"

function PaymentScreen({ match, history }) {
  const paymentId = match.params.id;

  const dispatch = useDispatch();

  const paymentDetails = useSelector((state) => state.paymentDetails);
  const { payment, loading, error } = paymentDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  React.useEffect(() => {
    if (!payment || payment._id !== paymentId) {
      dispatch(getPaymentDetails(paymentId));
    }
  }, [dispatch, paymentId]);

  // PAYPAL STUFF ... PROB WANT TO MOVE TO A CHECKOUT SCREEN EVENTUALLY

  // the following in the useState and useEffect are to dynamically add
  // the paypal script

  const [sdkReady, setSdkReady] = React.useState(false)

  const paymentPay = useSelector((state) => state.paymentPay);
  const { loading:loadingPay, success:successPay } = paymentPay;

  React.useEffect(() => {
      if (!userInfo) {
        history.push("/login");
      }

      const addPayPalScript = async () => {
          const { data: clientId } = await axios.get('/api/config/paypal')
          // console.log(clientId)
          const script = document.createElement('script')
          script.type = 'text/javascript'
          script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
          script.async = true
          script.onload = () => {
              setSdkReady(true)
          }
          document.body.appendChild(script)
      }

      if(!payment || successPay || payment._id !== paymentId) {
          dispatch({ type: PAYMENT_PAY_RESET })
          dispatch(getPaymentDetails(paymentId))
      } else if (!payment.isPaid) {
          if (!window.paypal) {
              addPayPalScript()
          } else {
              setSdkReady(true)
          }
      }
  }, [dispatch, paymentId, successPay, payment])

  const successPaymentHandler = (paymentResult) => {
      console.log(paymentResult)
      dispatch(payPayment(paymentId, paymentResult))
  }

  // END OF PAYPAL STUFF

  return loading ? (
    <Loading />
  ) : error ? (
    <h2 className="text-size-2">{error}</h2>
  ) : (
    <div className="appointments">
      {/* <PaymentSteps step1 step2 step3 step4 /> */}
      <div className="appointments__header--container">
        <h2 className="text-size-2 appointments__header">
          Payment {payment._id}
        </h2>
        <p>
          {payment.isPaid ? (
            <h2 className="">Paid on {payment.paidAt}</h2>
          ) : (
            <h2 className="">Not Paid</h2>
          )}
        </p>
        <p>
          <strong> Name: </strong> {payment.user.name}
        </p>
        <p>
          <strong> Email: </strong>
          <a href={`mailto:${payment.user.email}`}>{payment.user.email}</a>
        </p>
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
          <strong>{payment.paymentMethod}</strong>
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
          Paying for the following (
          <strong>{payment.paymentItems.length}</strong>) appointments:
        </h2>
        {payment.paymentItems.length === 0 ? (
          <h2
            className="text-size-3"
            style={{
              padding: "1rem",
              borderBottom: "2px solid var(--grey-light-6)",
            }}
          >
            Payment is <span style={{ color: "red" }}>empty</span>
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
              {payment.paymentItems.map((appt, idx) => {
                const date = appt.date.split("T")[0].split("-");
                const id = appt.appointment;
                // console.log(`appt.date: ${appt.date.prototype.getUTCHours()}`)
                console.log(appt);
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
          {payment.paymentItems.length} &times; $50.00 = $
          {payment.paymentItems.length * 50}
        </div>
        <div className="text-size-3">
          <strong className="">
            Tax:
            <br />
          </strong>
          ${payment.paymentItems.length * 50}.00 &times; 0.08 = $
          {payment.paymentItems.length * 50 * 0.08}.00
        </div>
        <div className="text-size-3">
          <strong className="">
            Total:
            <br />
          </strong>
          ${payment.paymentItems.length * 50 * 0.08}.00 + $
          {payment.paymentItems.length * 50}
          .00 = $
          {payment.paymentItems.length * 50 * 0.08 +
            payment.paymentItems.length * 50}
          .00
        </div>
      </div>

      {/* // PAYPAL */}
      {!payment.isPaid && (
        <div>
          {loadingPay && <Loading />}
          {!sdkReady ? (
            <Loading />
          ) : (
            <PayPalButton
              amount={payment.totalPrice}
              onSuccess={successPaymentHandler}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default withRouter(PaymentScreen);