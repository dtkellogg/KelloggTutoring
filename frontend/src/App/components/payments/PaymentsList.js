// react
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

// hooks
import { useSortMultiple } from "../../hooks/useSort";

// actions
import { listAppointments } from '../../actions/appointmentActions'
import { addToCart } from '../../actions/cartActions'
import { subheader } from "../../actions/subheader";

// constants
import { CART_RESET } from "../../constants/cartConstants";

// components
import PaymentSteps from './PaymentSteps'
import PleaseLogin from '../layout/PleaseLogin'


export default function Payments({ match, history }) {
  const [cart, setCart] = useState([]);
  const [cartFull, setCartFull] = useState(false);

  const dispatch = useDispatch();

  const appointmentList = useSelector((state) => state.appointmentList);
  const { loading, error, appointments } = appointmentList;
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  const reduxCart = useSelector((state) => state.cart);
  
  // const redirect = location.search ? location.search.split("=")[1] : "/"; // eslint-disable-line no-unused-vars

  useEffect(() => {
    const fetchAppts = async () => {
      dispatch(listAppointments());
    };

    fetchAppts();

    reduxCart.cartItems.forEach((appt) => {
      setCart((cart) => cart.concat(appt.appointment));
    });

  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  const sortedAppts = useSortMultiple(appointments, "date", "startTime") || []

  const addToCartHandler = (e, idx, id) => {
    e.preventDefault();

    setCart((cart) => cart.concat(id));
    dispatch(addToCart(id));
  };

  const addAllHandler = (e) => {
    sortedAppts
      .filter((appt) => appt.student === userInfo.name)
      .filter((appt) => appt.paid === false)
      .forEach((appt, idx) => {
        const id = appt._id;

        if (!cart.includes(id)) {
          setCart((cart) => cart.concat(id));
          dispatch(addToCart(id));
        }
      });
  };

  useEffect(() => {
    if (loading) {
      dispatch(subheader("Loading..."));
    } else {
      dispatch(subheader(""));
    }
    if (error) {
      dispatch(subheader({ error }));

    if(sortedAppts
      .filter((appt) => appt.student === userInfo.name)
      .filter((appt) => appt.paid === false).length === cart.length
    ) {setCartFull(true)}
    }
  }, [dispatch, loading, error, cart, sortedAppts]); // eslint-disable-line react-hooks/exhaustive-deps

  // ability to reset cart
  const handleReset = () => {
    dispatch({ type: CART_RESET })
    setCart([])
    dispatch(listAppointments())
  }

  if(!userInfo) {
    return (
      <PleaseLogin />
    )
  } else {
    return (
      <div className="container__screen--sidebar">
        {sortedAppts
          .filter((appt) => appt.student === userInfo.name)
          .filter((appt) => appt.paid === false).length === 0 ? (
          <div className="msg__userInfoNull">
            You have no unpaid appointments
          </div>
        ) : (
          <div className="container__payments">
            <PaymentSteps step1 step2 />

            <div className="container__payments--header">
              <Link to={`/appointments/payments/payment-method`} className="btn__payments--continue" >
                continue
              </Link>
              <button className="btn__cart--reset" onClick={handleReset}>
                reset cart
              </button>
                <h2 className="header__appointments">
                Select appointments to pay for:
              </h2>
            </div>

            <div className="appointments__table--payments-container">

              <table className="appointments__list">

                <thead className="thead">
                  <tr className="tr">
                    <th className="appointments__th--date">date</th>
                    <th className="appointments__th--time">time</th>
                    <th className="appointments__th--student">student</th>
                    <th className="appointments__th--subject">subject</th>
                    <th className="appointments__th--select">
                      <button
                        className="btn__payments--add-all"
                        disabled={ cartFull }
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
                          <td className="appointments__item--date">{`${date[1]}-${date[2]}`}</td>
                          <td className="appointments__item--time">{`${appt.startTime} - ${appt.endTime}`}</td>
                          <td className="appointments__item--student">
                            {appt.student}
                          </td>
                          <td className="appointments__item--subject">
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
}