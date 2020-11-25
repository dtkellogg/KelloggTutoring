import React from 'react'
// import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import CheckoutSteps from '../components/CheckoutSteps'
import { createPayment } from '../actions/paymentActions'
import { listAppointments } from '../actions/appointmentActions'
import { subheader } from "../actions/subheader";


export default function SubmitPaymentScreen ({ history }) {
  const dispatch = useDispatch()

  // const cart = useSelector((state) => state.cart)

  const paymentCreate = useSelector((state) => state.paymentCreate);
  const { payment, success, error } = paymentCreate;

  const appointmentList = useSelector((state) => state.appointmentList)
  const { loading, appointments } = appointmentList;

  const cart = appointments.filter((appt) => appt.isPaid === 'false')



  const submitPaymentHandler = () => {
    dispatch(
      createPayment({
        paymentItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
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



  

  React.useEffect(() => {
    if (success) {
        history.push(`/payment/${payment._id}/edit`)
    }
    // eslint-disable-next-line
  }, [history, success])

  

  React.useEffect(() => {
    dispatch(listAppointments());
  }, [dispatch]);

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

  return (
      <React.Fragment>
          <div className="text-size-2">
              <h2 className="text-size-2">Submit Payment Screen</h2>

              <div className="text-size-3">Payment Method</div>

              <div className="">
                  <h3 className="text-size-3">Pay for the following appointments:</h3>
              </div>

              <div className="card">
                  <div>
                      <h2 className="text-size-2">Payment Summary</h2>

                      <div className="Appointments">
                          {/* <span>${cart.apptPrice}</span> */}
                      </div>
                          
                      <div className="tax">
                          {/* <span>${cart.taxPrice}</span> */}
                      </div>

                      <div className="Appointments">
                          {/* <span>${cart.totalPrice}</span> */}
                      </div>

                      <button 
                      type="button" 
                      className="btn"
                      // disabled={cart.cartItems === 0}
                      onClick={submitPaymentHandler}
                      >Submit Payment</button>

                  </div>
              </div>
          </div>
          
      </React.Fragment>
  )
}