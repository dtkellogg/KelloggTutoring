import React from "react";
import {
  useLocation,
  Link
} from "react-router-dom";
import { listAppointments } from '../actions/appointmentActions'
import ApptsList from '../components/ApptsList'
import Calendar from '../components/Calendar'
import Reviews from '../components/Reviews'

import { subheader } from "../actions/subheader";

import { useDispatch, useSelector } from "react-redux";
import { FaGhost } from "react-icons/fa";

// const activeStyle = {
//   color: "rgb(73, 165, 73)",
//   fontWeight: 900,
// };

export default function HomePage() {
  const [displayAppts, setDisplayAppts] = React.useState('calendar')
  let location = useLocation();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  React.useEffect(() => {
    dispatch(subheader("Home"));
    dispatch(listAppointments())
  }, [location, dispatch]);

  React.useEffect(() => {
    const sendHeader =  async () => {
      // if (loading) {
        await dispatch(subheader("Loading..."))
        // .then(() => {dispatch(subheader("Home"))})


      // } 
      // else {
      //   dispatch(subheader("Home"));
      // }

      
    }
    sendHeader()

    // if (!loading) {
    //   dispatch(subheader("Home"));
    // }

    // if (error) {
    //   dispatch(subheader({ error }));
    // }

    // dispatch(subheader("Home"));
  }, [dispatch])

  // React.useEffect(() => {
    
  //     if (appointments) {
  //       dispatch(subheader("Home"));
  //     }

    
  // }, [dispatch, appointments]);


  return (
    <div className="pg__home">
      <div className="container__hero">
        {/* <div className="container__hero--content"> */}
          {/* <div className="hero__thought-clouds--container">
            <span className="hero__thought-clouds text-size-2">O</span>
            <span className="hero__thought-clouds text-size-2">O</span>
          </div> */}
          <div className="container__hero--text">
            <h1 className="text-size-0 letter-spacing-lg container__hero--welcome">Welcome</h1>
            <h3 className="text-size-2">Tutoring Simplified.</h3>
            <h4 className="text-size-3">
              Math, Science, English, Spanish, SAT & ACT
            </h4>
          </div>

          {/* <div className="hero__right-container"> */}
            <div className="btns__hero--header">
              <Link to={`/appointments/booking`} className="">
                <button className="btn__request-tutoring">
                  Request Tutoring
                </button>
              </Link>
              <Link to={`/appointments/payments`} className="">
                <button className="btn__pay">Payments</button>
              </Link>
            </div>

            <FaGhost
              size={130}
              color="var(--black)"
              fill="var(--black)"
              className="social-media-icon__ghost grey-light-7"
            />

            {/* <div className="ghost__eye--2"></div> */}
            {/* <div className="ghost__eye--1">.</div> */}
          {/* </div> */}
        {/* </div> */}
      </div>

      <div className="highlights__appointments">
        <div className="highlights__appointments--text">
          <h3 className="text-size-2 highlights__appointments--header">
            Here are your <b>upcoming appointments:</b>
          </h3>
          <div className="btn__highlights--appointments-container">
            <Link to={`/appointments/booking`} className="">
              <button className="btn__highlights--appointments">
                Request a new appointment
              </button>
            </Link>
            <Link to={`/appointments/appts-list`} className="">
              <button className="btn__highlights--appointments">
                View all appointments
              </button>
            </Link>
            <Link to={`/appointments/payments`} className="">
              <button className="btn__highlights--appointments">
                Make a payment
              </button>
            </Link>
            <div className="highlights__appointments--btns-container">
              <button
                className="btn__highlights--appts-calendar"
                onClick={() => setDisplayAppts("calendar")}
                style={{
                  backgroundColor:
                    displayAppts === "calendar"
                      ? "var(--old-blue-2)"
                      : "transparent",
                  color:
                    displayAppts === "calendar" ? "white" : "var(--old-blue-2)",
                  border:
                    displayAppts === "calendar"
                      ? "1px solid var(--old-blue-2)"
                      : "1px solid var(--old-blue-2)",
                }}
              >
                Calendar
              </button>
              <button
                className="btn__highlights--appts-list"
                onClick={() => setDisplayAppts("list")}
                style={{
                  backgroundColor:
                    displayAppts === "list" ? "var(--old-blue-2)" : "transparent",
                  color: displayAppts === "list" ? "white" : "var(--old-blue-2)",
                  transition: '1s',
                  border:
                    displayAppts === "list"
                      ? "1px solid var(--old-blue-2)"
                      : "1px solid var(--old-blue-2)",
                }}
              >
                List
              </button>
            </div>
          </div>
        </div>

        <div className="highlights__appointments--appointments__list-container">
          {displayAppts === "list" ? (
            <div style={{width: "100%"}}>
            <ApptsList type="upcoming"/>
            </div>
          ) : userInfo ? (
            <Calendar type="home"/>
          ) : (
            <Link to={`/login`} className="text-size-2 msg__userInfoNull">
              Please&nbsp;
              <span className="text-size-2" style={{ color: "blue" }}>
                login&nbsp;
              </span>
              <span className="text-size-2"> to view your appointments</span>
            </Link>
          )}
        </div>
      </div>

      <div className="highlights__meetToshi">
        {/* <h2 className="text-size-2 highlights__header">Meet Toshi</h2> */}
        <div className="highlights__meetToshi--container">
          <Reviews type="home"/>
        </div>
      </div>
    </div>
  );
}

