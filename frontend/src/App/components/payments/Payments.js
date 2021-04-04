// react
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link,  useLocation} from 'react-router-dom'

// hooks
import { useSortMultiple } from "../../hooks/useSort";
import useWindowDimensions from "../../hooks/useWindowDimensions";

// actions
import { listAppointments } from '../../actions/appointmentActions'
import { addToCart } from '../../actions/cartActions'
import { subheader } from "../../actions/subheader";

// constants
import { CART_RESET } from "../../constants/cartConstants";

// components
import PaymentSteps from './PaymentSteps'
import {Sidebar} from "../navigation/Sidebar";

// screens
import PleaseLogin from '../../screens/PleaseLoginScreen'

// data
import { apptsList } from "../../data/lists"



export default function Payments({ match, history }) {
  const [checkedAppointments, setCheckedAppointments] = React.useState([]); // eslint-disable-line no-unused-vars
  const [submitted, setSubmitted] = React.useState(false); // eslint-disable-line no-unused-vars
  const [cart, setCart] = React.useState([]);
  const [disabledBtns, setDisabledBtns] = React.useState([]); // eslint-disable-line no-unused-vars

  const dispatch = useDispatch();
  const location = useLocation();
  // const { url, path } = useRouteMatch()


  const appointmentList = useSelector((state) => state.appointmentList);
  const { loading, error, appointments } = appointmentList;
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  const reduxCart = useSelector((state) => state.cart);
  
  const { width, height } = useWindowDimensions() // eslint-disable-line no-unused-vars
  const redirect = location.search ? location.search.split("=")[1] : "/"; // eslint-disable-line no-unused-vars

 

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

    reduxCart.cartItems.forEach((appt) => {
      setCart((cart) => cart.concat(appt.appointment));
    });
  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  const sortedAppts = useSortMultiple(appointments, "date", "startTime") || []

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
  ////////////////////////////////


  React.useEffect(() => {
    if (loading) {
      dispatch(subheader("Loading..."));
    } else {
      dispatch(subheader(""));
    }
    if (error) {
      dispatch(subheader({ error }));
    }
  }, [dispatch, loading, error]);


  // ability to reset cart
  const handleReset = async () => {
    await dispatch({ type: CART_RESET })
    setCart([])
    dispatch(listAppointments())
  }



  return (
    <div className="container__screen--sidebar">
      {/* <Sidebar title="Appointments" list={ apptsList } /> */}
        {!userInfo ? (
          <div className="">
            <PleaseLogin />
          </div>
        ) : sortedAppts
            .filter((appt) => appt.student === userInfo.name)
            .filter((appt) => appt.paid === false).length === 0 ? (
            <div className="font-size-2 msg__userInfoNull">
              You have no unpaid appointments
            </div>
        ) : (
          <div className="appointments__payments--container">
            <PaymentSteps step1 step2 />
            <div className="appointments__payments--header-container">
              <Link
                to={`/appointments/payment-method`}
                className="btn__payments--continue"
              >
                continue
              </Link>
              <button className="btn__cart--reset" onClick={handleReset}>reset cart</button>
              <div className="appointments__header font-size-2">
                Select appointments to pay for:
              </div>
            </div>
            <div className="appointments__table--payments-container">
              <table className="appointments__list font-size-3">
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
                              .filter((appt) => appt.student === userInfo.name)
                              .filter((appt) => appt.paid === false).length ===
                              cart.length && "none",
                          color:
                            sortedAppts
                              .filter((appt) => appt.student === userInfo.name)
                              .filter((appt) => appt.paid === false).length !==
                            cart.length
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
                          : "All Added"}
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
                          <td className="font-size-3 appointments__item--date">{`${date[1]}-${date[2]}`}</td>
                          <td className="font-size-3 appointments__item--time">{`${appt.startTime} - ${appt.endTime}`}</td>
                          <td className="font-size-3 appointments__item--student">
                            {appt.student}
                          </td>
                          <td className="font-size-3 appointments__item--subject">
                            {appt.subject}
                          </td>
                          <td className="appointments__item--btns">
                            {!appt.paid && (
                              <button
                                key={appt._id}
                                className="btn__cart--add"
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
                                    color: !cart.includes(appt._id) && "white",
                                  }}
                                >
                                  {!cart.includes(appt._id)
                                    ? "Add to cart"
                                    : "Added"}
                                </span>
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        )}
    </div>
  );
}