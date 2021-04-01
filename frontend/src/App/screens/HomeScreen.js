import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";

// components
import ApptsList from '../components/appointments/ApptsList'

import Calendar from "../components/calendar/Calendar";
import Reviews from '../components/reviews/Reviews'
import BtnsUpDownHome from '../components/navigation/BtnsUpDownHome'

// hooks
import useWindowDimensions from '../hooks/useWindowDimensions'

// actions
import { listAppointments } from '../actions/appointmentActions'
import { subheader } from "../actions/subheader";

import lottie from "lottie-web";
import lottieTeachingAnimation from '../img/lottieTeachingAnimation.json'


export default function HomePage() {
  const [displayAppts, setDisplayAppts] = useState('calendar')
  
  const location = useLocation();
  const dispatch = useDispatch();
  const { height } = useWindowDimensions();
  const calendarRef = useRef(null);
  const reviewsRef = useRef(null)

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector("#teaching-animation"),
      animationData: lottieTeachingAnimation,
    });

    dispatch(subheader("Home"));
    dispatch(listAppointments())
  }, [location, dispatch]);

  return (
    <div className="container__home--primary">
      <BtnsUpDownHome calendarRef={calendarRef} reviewsRef={reviewsRef} />
      <div className="container__home--secondary">
        <div className="container__hero">
          <div className="container__hero--text">
            <h1 className="letter-spacing-lg text__home--welcome fadeInAnimated--2">
              Kellogg Tutoring
            </h1>
            <h3 className="text__home--tutoring-simplified fadeInAnimated--3">
              Tutoring Simplified.
            </h3>
            <h4 className="text__home--subjects fadeInAnimated--4">
              Math, Science, English, Spanish, SAT & ACT
            </h4>
          </div>

          <div className="container__hero--right">
            <div className="container__btns--hero fadeInAnimated--4">
              <button className="btn__home--to-request-tutoring">
                <Link
                  to={`/appointments/booking`}
                  className="text__home--request-tutoring"
                >
                  Request Tutoring
                </Link>
              </button>
              <button className="btn__home--to-payments">
                <Link
                  to={`/appointments/payments`}
                  className="text__home--payments"
                >
                  Payments
                </Link>
              </button>
            </div>
            <div className="home__bubble bubble--1 fadeInAnimated--3" />
            <div className="home__bubble bubble--2 fadeInAnimated--2" />
            <div className="home__bubble bubble--3 fadeInAnimated--1" />

            <div
              id="teaching-animation"
              className="home__teaching-animation fadeInAnimated--0"
            />
          </div>
        </div>

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
                      displayAppts === "calendar"
                        ? "white"
                        : "var(--old-blue-2)",
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
          <div  className="container__home--appointments-right" ref={calendarRef}>
            {displayAppts === "list" ? (
              <div style={{ width: "100%" }}>
                <ApptsList type="upcoming" />
              </div>
            ) : userInfo ? (
              <Calendar type="home" />
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
        </section>

        <section className="container__home--reviews" ref={reviewsRef}>
          <Reviews type="home" />
          <Link to={`/review/create-review`} className="">
            <button className="btn__home--to-reviews">Write a review</button>
          </Link>
        </section>
      </div>
    </div>
  );
}