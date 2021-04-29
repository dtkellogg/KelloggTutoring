import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";
// import { listAppointments } from "../actions/appointmentActions";
// import { addToCart } from "../actions/cartActions";
// import { payPayment } from "../actions/paymentActions";
import { 
  PAYMENT_PAY_RESET,
  //  PAYMENT_PAY_FAIL
} from "../../constants/paymentConstants";
// import PaymentMethod from "./PaymentMethodScreen";
// import { removeFromCart } from "../actions/cartActions";
import { getPaymentDetails, payPayment } from "../../actions/paymentActions";
import Loading from "../loading/Loading";
import { subheader } from "../../actions/subheader";
import PaymentsTableHead from './PaymentsTableHead'
import PaymentTotals from './PaymentTotals'



function PaymentScreen({ match, history }) {
  const paymentId = match.params.id;

  console.log("In Payment.js")
  
  const [loadingDefault, setLoadingDefault] = useState(false); // eslint-disable-line no-unused-vars
  
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


  useEffect(() => {
    if (loading) {
      dispatch(subheader("Loading..."));
    } else {
      dispatch(subheader(""));
    }
    if (error) {
      dispatch(subheader({ error }));
    }
  }, [dispatch, loading, error])

  // PAYPAL STUFF ... PROB WANT TO MOVE TO A CHECKOUT SCREEN EVENTUALLY

  // the following in the useState and useEffect are to dynamically add
  // the paypal script

  const [sdkReady, setSdkReady] = useState(false);

  const paymentPay = useSelector((state) => state.paymentPay);
  const { loading: loadingPay, success: successPay } = paymentPay;

  useEffect(() => {
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
    <div className="container__screen--sidebar">
      <div className="appointments container__payment">

        <h2 className="header__payment">
          Payment 
          <span className="payment__id">{payment._id}</span> 
        </h2>

        <div className="payment__subgroups">
          <div className="payment__subgroups--name">
            <strong> Name: </strong> {payment.user.name}
          </div>
          <div className="payment__subgroups--email">
            <strong> Email: </strong>
            <a href={`mailto:${payment.user.email}`}>{payment.user.email}</a>
          </div>
          <div className="payment__subgroups--payment-method">
            <strong>Payment Method:&nbsp;</strong>
            <span>{payment.paymentMethod}</span>
          </div>
          <div className="payment__subgroups--status">
            <strong>Status:&nbsp;</strong>
            <span>{payment.isPaid ? (
              <span className="payment__subgroups--paid-on">Paid on {payment.paidAt}</span>
            ) : (
                <span className="payment__subgroups--not-paid">Not Paid</span>
              )}</span>
          </div>
        </div>

        <span className="p__payment--paying-for">
          You are paying for the following {" "}
          <strong>{payment.paymentItems.length}</strong> appointments:
        </span>
        {payment.paymentItems.length === 0 ? (
          <h2
            className="font-size-3"
            style={{
              padding: "1rem",
              borderBottom: "2px solid var(--grey-6)",
            }}
          >
            Payment is <span style={{ color: "red" }}>empty</span>
          </h2>
        ) : (
          <table className="appointments__list">
            <PaymentsTableHead type="payment" />
            <tbody className="tbody">
              {payment.paymentItems.map((appt, idx) => {
                const date = appt.date.split("T")[0].split("-");
                const id = appt.appointment;

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

        <PaymentTotals />

        {/* // PAYPAL */}
        {!payment.isPaid && (
          <div className="container__paypal">
            {/* {loadingPay && setLoadingDefault(true)} */}
            {loadingPay && <Loading />}
            {!sdkReady ? (
              // setLoadingDefault(true)
              <Loading />
            ) : (
              <div className="container__paypal--btns">
                <PayPalButton
                  amount={payment.totalPrice}
                  onSuccess={successPaymentHandler}
                  className="btns__paypal"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default withRouter(PaymentScreen);