import React from 'react'
// import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import {
    Link, 
    // Route,
    // Switch,
    // useRouteMatch, 
    useLocation} from 'react-router-dom'
import { useSortMultiple } from "../hooks/useSort";
// import {PayPalButton} from 'react-paypal-button-v2'

import { listAppointments } from '../actions/appointmentActions'
import { addToCart } from '../actions/cartActions'
// import { payPayment } from '../actions/paymentActions'

// import { PAYMENT_PAY_RESET } from '../constants/paymentConstants'

// import Message from '../components/Message'
import PaymentSteps from '../components/PaymentSteps'
import Sidebar from "../components/Sidebar";

// import Checkout from './PaymentCheckoutScreen'
// import PaymentMethod from './PaymentMethodScreen'
import { subheader } from "../actions/subheader";

const apptsList = ["Booking", "Payments", "Appts List", "Appts Calendar"]
// const apptsList = ["Booking", "Payments", "Appointments List", "Appointments Calendar"]



export default function Payments({ match, history }) {
  const [checkedAppointments, setCheckedAppointments] = React.useState([]); // eslint-disable-line no-unused-vars
  const [submitted, setSubmitted] = React.useState(false); // eslint-disable-line no-unused-vars
  const [cart, setCart] = React.useState([]);
  const dispatch = useDispatch();
  const location = useLocation();
  // const { url, path } = useRouteMatch()
  const [disabledBtns, setDisabledBtns] = React.useState([]); // eslint-disable-line no-unused-vars

  // const cart = []

  const appointmentList = useSelector((state) => state.appointmentList);
  const { loading, error, appointments } = appointmentList;
  const redirect = location.search ? location.search.split("=")[1] : "/"; // eslint-disable-line no-unused-vars

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart2 = useSelector((state) => state.cart);


 

  React.useEffect(() => {
    const fetchAppts = async () => {
      dispatch(listAppointments());

      try {
        setDisabledBtns(new Array(appointments.length).fill(false));
      } catch (err) {
        console.log(err);
      }
    };

    fetchAppts();

    cart2.cartItems.forEach((appt) => {
      setCart((cart) => cart.concat(appt.appointment));
    });
  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  const sortedAppts = useSortMultiple(appointments, "date", "startTime");

  const addToCartHandler = (e, idx, id) => {
    e.preventDefault();
    setSubmitted(true);

    setCart((cart) => cart.concat(id));
    dispatch(addToCart(id));

    console.log(cart.includes(id));
    console.log(id);
  };

  const addAllHandler = (e) => {
    sortedAppts
      .filter((appt) => appt.student === userInfo.name)
      .filter((appt) => appt.paid === false)
      .forEach((appt, idx) => {
        // const date = appt.date.split("T")[0].split("-");
        const id = appt._id;

        if (!cart.includes(id)) {
          setCart((cart) => cart.concat(id));
          dispatch(addToCart(id));
        }
      });
  };

  
  ////////////////////////////////
  // The line below is just for testing purposes

  // localStorage.clear()


  // React.useEffect(() => {
  //   if (loading) {
  //     dispatch(subheader("Loading..."));
  //   } else {
  //     dispatch(subheader(""));
  //   }
  //   if (error) {
  //     dispatch(subheader({ error }));
  //   }
  // }, [dispatch, loading, error]);

  console.log(`userInfo: ${userInfo}`)
  console.log(`sortedAppts: ${sortedAppts}`)

  if(userInfo === null) {
    return (
      <div className="pg__appointment">
        <Sidebar title="Appointments" list={apptsList} />
        <div className="appointments-2">
          <span className="text-size-2"> Please&nbsp; </span>
          <Link to={`/login`} className="text-size-2 msg__userInfoNull">
            <span className="text-size-2" style={{ color: "blue" }}>
              login&nbsp;
            </span>
          </Link>
          <span className="text-size-2"> to view your appointments</span>
        </div>
      </div>
      )
  }
  

  if (
    userInfo !== undefined &&
    sortedAppts
      .filter((appt) => appt.student === userInfo.name)
      .filter((appt) => appt.paid === false).length === 0
  ) {
    return (
      <div className="pg__appointment">
        <Sidebar title="Appointments" list={apptsList} />
        <div className="appointments">
          {/* <div className="text-size-2 msg__userInfoNull">
            You have no unpaid appointments
          </div> */}
          <Link to={`/login`} className="text-size-2 msg__userInfoNull">
            You have no unpaid appointments
            </Link>
        </div>
      </div>
    )
  }
  
  
  
    return (
      <div className="pg__appointment">
        <Sidebar title="Appointments" list={apptsList} />
        <div className="appointments">
        <PaymentSteps step1 step2 />
        <div className="appointments__header--container">
          <Link to={`/appointments/payment-method`} className="btn__continue text-size-5">
            Continue
          </Link>
          <div className="appointments__header text-size-2">
            Please select appointments to pay for:
          </div>
        </div>
        <table className="appointments__list text-size-3">
          <thead className="thead">
            <tr className="tr">
              <th className="appointments__th--date">date</th>
              <th className="appointments__th--time">time</th>
              <th className="appointments__th--student">student</th>
              <th className="appointments__th--subject">subject</th>
              <th className="appointments__th--select">
                <button
                  className="btn__payments--add-all"
                  disabled={
                    sortedAppts
                      .filter((appt) => appt.student === userInfo.name)
                      .filter((appt) => appt.paid === false).length ===
                    cart.length
                  }
                  style={{
                    backgroundImage:
                      sortedAppts
                        .filter(
                          (appt) => appt.student === userInfo.name
                        )
                        .filter((appt) => appt.paid === false)
                        .length === cart.length && "none",
                    color:
                      sortedAppts
                        .filter(
                          (appt) => appt.student === userInfo.name
                        )
                        .filter((appt) => appt.paid === false)
                        .length !== cart.length
                        ? "white"
                        : "var(--old-blue-2)",
                  }}
                  onClick={(e) => addAllHandler(e)}
                >
                  {sortedAppts
                    .filter((appt) => appt.student === userInfo.name)
                    .filter((appt) => appt.paid === false).length !==
                  cart.length
                    ? "Add All"
                    : "Added"}
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="tbody">
            {sortedAppts
              .filter((appt) => appt.student === userInfo.name)
              .filter((appt) => appt.paid === false)
              .map((appt, idx) => {
                const date = appt.date.split("T")[0].split("-");
                return (
                  <tr key={appt._id} className="appointments__list--item">
                    <td className="text-size-3 appointments__item--date">{`${date[1]}-${date[2]}`}</td>
                    <td className="text-size-3 appointments__item--time">{`${appt.startTime} - ${appt.endTime}`}</td>
                    <td className="text-size-3 appointments__item--student">
                      {appt.student}
                    </td>
                    <td className="text-size-3 appointments__item--subject">
                      {appt.subject}
                    </td>
                    <td className="appointments__item--btns">
                      {
                        !appt.paid && (
                          <button
                            key={appt._id}
                            className="btn__addToCart"
                            disabled={cart.includes(appt._id)}
                            style={{
                              backgroundImage:
                                cart.includes(appt._id) && "none",
                              color: "var(--old-blue-2)",
                            }}
                            onClick={(e) =>
                              addToCartHandler(e, idx, appt._id)
                            }
                          >
                            <span
                              style={{
                                color:
                                  !cart.includes(appt._id) && "white",
                              }}
                            >
                              {!cart.includes(appt._id)
                                ? "Add to cart"
                                : "Added"}
                            </span>
                          </button>
                        )
                      }
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
        </div>
        </div>
            )
}