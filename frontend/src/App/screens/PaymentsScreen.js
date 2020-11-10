import React from 'react'
// import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import {
    Link, 
    Route,
    Switch,
    useRouteMatch, 
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
import PaymentMethod from './PaymentMethodScreen'
import { subheader } from "../actions/subheader";


const apptsList = ["Booking", "Payments", "Appointments List", "Appointments Calendar"]



export default function Payments({ match, history }) {
    const [checkedAppointments, setCheckedAppointments] = React.useState([])
    const [submitted, setSubmitted] = React.useState(false)
    const [cart, setCart] = React.useState([])
    const dispatch = useDispatch()
    const location = useLocation()
    // const { url, path } = useRouteMatch()
    const [disabledBtns, setDisabledBtns] = React.useState([]);
    
    // const cart = []

    const appointmentList = useSelector((state) => state.appointmentList);
    const { loading, error, appointments } = appointmentList;
    const redirect = location.search ? location.search.split('=')[1] : '/'

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const cart2 = useSelector((state) => state.cart);;

  // console.log(cart2)

    const sortedAppts = useSortMultiple(appointments, "date", "startTime")

    // setDisabledBtns(new Array(response.data.records.length).fill(false));

    // console.log(disabledBtns)
    // console.log(`cart: ${cart}`)
    
    // if (cart.length !== 0) {
    //     // console.log(`cart: ${cart}`)
    // }


    // React.useEffect(async () => {
    //     await dispatch(listAppointments()).then(() => {
    //       setDisabledBtns(new Array(appointments.length).fill(false));
    //     })

    //     cart2.cartItems.map((appt) => {
    //       setCart((cart) => cart.concat(appt.appointment));

    //     })

    // }, [dispatch])

    React.useEffect(async () => {
      const fetchAppts = async () => {
        dispatch(listAppointments())

        try {
          setDisabledBtns(new Array(appointments.length).fill(false));
        } catch (err) {
          console.log(err)
        }
      }
     
      fetchAppts()

      cart2.cartItems.map((appt) => {
        setCart((cart) => cart.concat(appt.appointment));
      });
    }, [dispatch]);


    const handleCheckBox = (appt) => {
        setCheckedAppointments([...checkedAppointments, appt])
    }

    const addToCartHandler = (e, idx, id) => {
        e.preventDefault()
        setSubmitted(true)
        // console.log(`cart: ${id}`)
        // console.log(`aapt: ${e.student}`)
        // console.log(`checkedAppointments: ${checkedAppointments}`)
        // console.log(`e.target.value: ${e.target.value}`)
        setCart((cart) => cart.concat(id))
        dispatch(addToCart(id))

        console.log(cart.includes(id))

        console.log(id)
         
    }

    const addAllHandler = (e) => {
      sortedAppts
        .filter((appt) => appt.student === userInfo.name)
        .filter((appt) => appt.paid === false)
        .map((appt, idx) => {
          const date = appt.date.split("T")[0].split("-");
          const id = appt._id;

          if(!cart.includes(id)) {
            setCart((cart) => cart.concat(id));
            dispatch(addToCart(id));

          }

    })}
  





    // PAYPAL STUFF ... PROB WANT TO MOVE TO A CHECKOUT SCREEN EVENTUALLY

    // the following in the useState and useEffect are to dynamically add
    // the paypal script

    // const [sdkReady, setSdkReady] = React.useState(false)

    // const paymentPay = useSelector((state) => state.paymentPay);
    // const { loading:loadingPay, success:successPay } = paymentPay;

    // React.useEffect(() => {
    //     const addPayPalScript = async () => {
    //         const { data: clientId } = await axios.get('/api/config/paypal')
    //         // console.log(clientId)
    //         const script = document.createElement('script')
    //         script.type = 'text/javascript'
    //         script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
    //         script.async = true
    //         script.onload = () => {
    //             setSdkReady(true)
    //         }
    //         document.body.appendChild(script)
    //     }

    //     if(!payment || successPay) {
    //         dispatch({ type: PAYMENT_PAY_FAIL })
    //         dispatch(getPaymentDetails(id))
    //     } else if (!order.isPaid) {
    //         if (!window.paypal) {
    //             addPayPalScript()
    //         } else {
    //             setSdkReady(true)
    //         }
    //     }
    // }, [dispatch, id, successPay, payment])
    // //     dispatch(getPaymentDetails(paymentId))
    // // }, [dispatch, paymentId])


    // const successPaymentHandler = (paymentResults) => {
    //     console.log(paymentResult)
    //     dispatch(payOrder(orderId, paymentResult))
    // }





    ////////////////////////////////
    // The line below is just for testing purposes

    // localStorage.clear()







    // END OF PAYPAL STUFF

  React.useEffect(() => {
    if (loading) {
      dispatch(subheader("Loading..."));
    } else {
      dispatch(subheader(""));
    }
    if (error) {
      dispatch(subheader({ error }));
    }
  }, [loading, error])


  if (userInfo === null) {
    return (
      <div div className="pg__appointment">
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
    );
  }

  // if (userInfo && 
  //   sortedAppts
  //     .filter((appt) => appt.student === userInfo.name)
  //     .filter((appt) => appt.paid === false).length === 0) {
  //   return (
  //     <Link to={`/login`} className="text-size-2 msg__userInfoNull">
  //       You have no unpaid appointments
  //     </Link >
  //   )
  // }

  if ((userInfo &&
    sortedAppts
      .filter((appt) => appt.student === userInfo.name)
      .filter((appt) => appt.paid === false).length === 0)
      ) {
      return (
        <div className="pg__appointment">
          <Sidebar title="Appointments" list={apptsList} />
          <div className="appointments">
            {/* <Link to={`/login`} className="text-size-2 msg__userInfoNull"> */}
            <div className="text-size-2 msg__userInfoNull">
              You have no unpaid appointments
            </div>
            {/* </Link > */}
          </div>
        </div>
      );
      } else return (
        <div className="pg__appointment">
          <Sidebar title="Appointments" list={apptsList} />
          <div className="appointments">
            <PaymentSteps step1 step2 />
            <div className="appointments__header--container">
              <Link
                to={`/appointments/payment-method`}
                className="btn__continue text-size-5"
              >
                Continue
              </Link>
              <div className="appointments__header text-size-2">
                Please select appointments to pay for:
              </div>
            </div>

            {/* <button className="" onClick={}>Continue</button> */}

            {
              // loading ? (
              //   // <Loading />
              // ) :
              error ? (
                <h2 className="text-size-2">{error}</h2>
              ) : userInfo &&
                sortedAppts
                  .filter((appt) => appt.student === userInfo.name)
                  .filter((appt) => appt.paid === false).length === 0 ? (
                <Link to={`/login`} className="text-size-2 msg__userInfoNull">
                  You have no unpaid appointments
                </Link>
              ) : (
                // userInfo && sortedAppts
                //   .filter((appt) => appt.paid === true).length < 0 ? (
                <>
                  <table className="appointments__list text-size-3">
                    <thead className="thead">
                      <tr className="tr">
                        {/* <th className="appointments__th"></th> */}
                        <th className="appointments__th--date">date</th>
                        <th className="appointments__th--time">time</th>
                        <th className="appointments__th--student">student</th>
                        <th className="appointments__th--subject">subject</th>
                        <th className="appointments__th--select">
                          <button
                            className="btn__payments--add-all"
                            disabled={
                              sortedAppts
                                .filter(
                                  (appt) => appt.student === userInfo.name
                                )
                                .filter((appt) => appt.paid === false)
                                .length === cart.length
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
                                  .filter((appt) => appt.student === userInfo.name)
                                  .filter((appt) => appt.paid === false)
                                  .length !== cart.length
                                  ? "white" : "var(--old-blue-2)",
                            }}
                            onClick={(e) => addAllHandler(e)}
                          >
                            {sortedAppts
                              .filter((appt) => appt.student === userInfo.name)
                              .filter((appt) => appt.paid === false).length !==
                              cart.length
                              ? "Add All" : "Added"
                              }
                            
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
                          const id = appt._id;
                          // console.log(`cart.includes: ${cart.includes(appt.id)}`);
                          return (
                            <tr
                              key={appt._id}
                              className="appointments__list--item"
                            >
                              {/* <td>
                                  <input
                                    type="checkbox"
                                    onClick={() => addToCartHandler(appt._id)}
                                  />
                                </td> */}
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
                                    // <Link to={{
                                    //     pathname: `${url}/checkout`,
                                    //     search: location.search,
                                    // }}
                                    // >
                                    <button
                                      key={appt._id}
                                      className="btn__addToCart"
                                      disabled={cart.includes(appt._id)}
                                      // disabled={cart.indexOf(appt.id) !== -1}
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
                                        // className="payments__btn--txt"
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
                                  // </Link>
                                }
                                {/* <button className="btn__cancel">Cancel</button> */}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                    {/* <Link to={redirect ? `${url}/checkout?redirect=${redirect}` : `/checkout`} className="btn" 
                        // onClick={handleSubmit}
                        >Pay for selected</Link> */}
                  </table>
                </>
              )
              // :  userInfo
              // ? (
              //   <h2 className="payments__login--msg">You have no unpaid appointments</h2>
              // ) : (
              //   <div className="payments__login--msg">
              //     <Link to={`/login`} className="text-size-3 msg__userInfoNull">
              //       Please&nbsp;
              //     <span className="text-size-3" style={{ color: 'blue' }}>
              //       login&nbsp;
              //     </span>
              //     <span className="text-size-3"> to view your appointments</span>
              //     </Link >
              //     </div>
              // )
            }

            {/* <Switch location={location}> */}
              {/* <Route exact path={`${path}`} component={Payments} /> */}
              {/* <Route path={`/payment-method`} component={PaymentMethod} />
            </Switch> */}

            {/* // PAYPAL */}
            {/* <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}/> */}
            {/* // END OF PAYPAL */}
          </div>
        </div>
      );
}
