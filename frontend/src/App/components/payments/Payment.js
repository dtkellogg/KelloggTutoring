import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  // Link,
  // Route,
  // Switch,
  // useRouteMatch,
  withRouter,
  // useLocation,
} from "react-router-dom";
// import { FaCheckSquare, FaTrash, FaTimes } from "react-icons/fa";
import { PayPalButton } from "react-paypal-button-v2";
// import { listAppointments } from "../actions/appointmentActions";
// import { addToCart } from "../actions/cartActions";
// import { payPayment } from "../actions/paymentActions";
import { 
  PAYMENT_PAY_RESET,
  //  PAYMENT_PAY_FAIL
} from "../../constants/paymentConstants";
// import PaymentSteps from "../components/PaymentSteps";
// import PaymentMethod from "./PaymentMethodScreen";
// import { removeFromCart } from "../actions/cartActions";
import { getPaymentDetails, payPayment } from "../../actions/paymentActions";
import {Sidebar} from "../navigation/Sidebar";
import Loading from "../loading/Loading";

// import { subheader } from "../actions/subheader";

// data
import { apptsList } from "../../data/lists"
// const apptsList = ["Booking", "Payments", "Appointments List", "Appointments Calendar"]


function PaymentScreen({ match, history }) {
  const paymentId = match.params.id;

  
  
  const [loadingDefault, setLoadingDefault] = React.useState(false); // eslint-disable-line no-unused-vars
  
  const dispatch = useDispatch();

  
  const paymentDetails = useSelector((state) => state.paymentDetails);
  const { 
    payment, 
    loading, 
    error 
  } = paymentDetails;
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

 


  ///////////////////////////


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

  // PAYPAL STUFF ... PROB WANT TO MOVE TO A CHECKOUT SCREEN EVENTUALLY

  // the following in the useState and useEffect are to dynamically add
  // the paypal script

  const [sdkReady, setSdkReady] = React.useState(false);

  const paymentPay = useSelector((state) => state.paymentPay);
  const { loading: loadingPay, success: successPay } = paymentPay;

  React.useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      // console.log(clientId)
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    


    ///////// HERE IS THE PROBLEM
    if (!payment || successPay || payment._id !== paymentId) {
    // if (payment === undefined) {
      dispatch({ type: PAYMENT_PAY_RESET });
      dispatch(getPaymentDetails(paymentId));
      ////////////////////////////////////////////////////////////////


    } else if (!payment.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, paymentId, successPay, payment, history, userInfo]);
  // }, [dispatch, paymentId, successPay, payment]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payPayment(paymentId, paymentResult));
  };


  return loading ? (
    <Loading />
  ) : (
    <div className="pg__appointment">
      <Sidebar title="Appointments" list={apptsList} />
      <div className="appointments">
        {/* <PaymentSteps step1 step2 step3 step4 /> */}
          <h2 className="payment__header">
            Payment {payment._id}
          </h2>
        <div className="payment__subgroups">
          <div className="payment__subgroups--paid">
            {payment.isPaid ? (
              <h2 className="payment__subgroups--paid-on">Paid on {payment.paidAt}</h2>
            ) : (
              <h2 className="payment__subgroups--not-paid">Not Paid</h2>
            )}
          </div>
          <div className="payment__subgroups--name">
            <strong> Name: </strong> {payment.user.name}
          </div>
          <div className="payment__subgroups--email">
            <strong> Email: </strong>
            <a href={`mailto:${payment.user.email}`}>{payment.user.email}</a>
          </div>
        </div>

        {/* <div className="">
        <h2 className="font-size-2">Payment Method</h2>
        <strong>Method:</strong>
        {cart.paymentMethod}
        <div className=""></div>
      </div> */}
        <div className="checkout__payment-method">
          <h2 className="font-size-2">Payment Method:&nbsp;</h2>
          {/* <strong>Method:</strong> */}

          <div className="font-size-2">
            <strong>{payment.paymentMethod}</strong>
          </div>
        </div>

        {/* {error && <h2 className="font-size-2">{error}</h2>} */}

        <div
          className=""
          style={{
            padding: "1rem 0",
          }}
        >
          <h2 className="font-size-2" style={{ padding: "1rem" }}>
            Paying for the following (
            <strong>{payment.paymentItems.length}</strong>) appointments:
          </h2>
          {payment.paymentItems.length === 0 ? (
            <h2
              className="font-size-3"
              style={{
                padding: "1rem",
                borderBottom: "2px solid var(--grey-light-6)",
              }}
            >
              Payment is <span style={{ color: "red" }}>empty</span>
            </h2>
          ) : (
            <table className="appointments__list">
              <thead className="thead">
                <tr className="tr">
                  <th className="appointments__th--date">date</th>
                  <th className="appointments__th--time">time</th>
                  <th className="appointments__th--student">price</th>
                  <th className="appointments__th--subject">subject</th>
                </tr>
              </thead>
              <tbody className="tbody">
                {payment.paymentItems.map((appt, idx) => {
                  const date = appt.date.split("T")[0].split("-");
                  const id = appt.appointment;
                  console.log(appt)
                  return (
                    <tr key={id} className="appointments__list--item">
                      <td className="appointments__item--date">{`${date[1]}-${date[2]}`}</td>
                      <td className="appointments__item--time">{`${appt.startTime} - ${appt.endTime}`}</td>
                      <td className="appointments__item--student">
                        $50.00
                      </td>
                      <td className="appointments__item--subject">
                        {appt.subject}
                      </td>
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
            {payment.paymentItems.length} &times; $50.00 = $
            {payment.paymentItems.length * 50}
          </div>
          <div className="font-size-3">
            <strong className="">
              Tax:
              <br />
            </strong>
            ${payment.paymentItems.length * 50}.00 &times; 0.08 = $
            {payment.paymentItems.length * 50 * 0.08}.00
          </div>
          <div className="font-size-3">
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
            {/* {loadingPay && setLoadingDefault(true)} */}
            {loadingPay && <Loading />}
            {!sdkReady ? (
              // setLoadingDefault(true)
              <Loading />
            ) : (
              // <p>PAYPAL BTN</p>
              <PayPalButton
                amount={payment.totalPrice}
                onSuccess={successPaymentHandler}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
  // )
}

export default withRouter(PaymentScreen);
