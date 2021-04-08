import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";

// components
import ApptsList from '../appointments/ApptsList'
import Calendar from "../calendar/Calendar";

// actions
import { listAppointments } from '../../actions/appointmentActions'

import lottie from "lottie-web";
import lottieTeachingAnimation from '../../img/lottieTeachingAnimation.json'

function HomeAppointments({calendarRef}) {
    const [displayAppts, setDisplayAppts] = useState("calendar");

    const location = useLocation();
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
      lottie.loadAnimation({
        container: document.querySelector("#teaching-animation"),
        animationData: lottieTeachingAnimation,
      });

      dispatch(listAppointments());
    }, [location, dispatch]);

    return (
      <section className="container__home--appointments">
        <div className="container__home--appointments-left">
          <h3 className="header__home--appointments">
            Here are your <b>upcoming appointments:</b>
          </h3>

          <div className="container__btns--home-3-btns">
            <Link to={`/appointments/booking`} className="">
              <button className="btn__home--3-btns">
                Request an appointment
              </button>
            </Link>

            <Link to={`/appointments/appts`} className="">
              <button className="btn__home--3-btns">
                View all appointments
              </button>
            </Link>

            <Link to={`/appointments/payments`} className="">
              <button className="btn__home--3-btns">Make a payment</button>
            </Link>

            <div className="container__btns--home-calendar-or-list">
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
                    displayAppts === "list"
                      ? "var(--old-blue-2)"
                      : "transparent",
                  color:
                    displayAppts === "list" ? "white" : "var(--old-blue-2)",
                  transition: "1s",
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
        <div className="container__home--appointments-right" ref={calendarRef}>
          {!userInfo ? (
                <Link to={`/login`} className="msg__userInfoNull">
                  Please&nbsp;
                  <span className="font-size-2" style={{ color: "blue" }}>
                        login&nbsp;
                  </span>
                  <span className="font-size-2"> to view your appointments</span>
                </Link>
          ) : displayAppts === "list" ? (
              <ApptsList type="upcoming" />
          ) : (
            <Calendar type="home" />
          )}
        </div>
      </section>
    );
}

export default HomeAppointments