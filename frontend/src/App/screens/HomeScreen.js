import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
// import { FaGhost } from "react-icons/fa";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

// components
import ApptsList from '../components/ApptsList'
import Calendar from '../components/Calendar'
import Reviews from '../components/reviews/Reviews'

// hooks
import useWindowDimensions from '../hooks/useWindowDimensions'

// actions
import { listAppointments } from '../actions/appointmentActions'
import { subheader } from "../actions/subheader";

import lottie from "lottie-web";
import lottieTeachingAnimation from '../img/lottieTeachingAnimation.json'


export default function HomePage() {
  const [displayAppts, setDisplayAppts] = useState('calendar')
  const [windowLocation, setWindowLocation] = useState('top')

  const location = useLocation();
  const dispatch = useDispatch();
  const { height } = useWindowDimensions();
  const calendarRef = useRef(null);
  const reviewsRef = useRef(null)

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleScrollToTop = () => {
    if (windowLocation === "calendar") {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
        setWindowLocation("top");
      } else if (windowLocation === "reviews") {
          calendarRef.current.scrollIntoView();
          setWindowLocation("calendar");
      } else if (windowLocation === "bottom") {
        reviewsRef.current.scrollIntoView();
        setWindowLocation("reviews");
      }
  }

  const handleScrollToBottom = () => {
    if (windowLocation === "top") {
      calendarRef.current.scrollIntoView();
      setWindowLocation('calendar')
    } else if (windowLocation === "calendar") {
      reviewsRef.current.scrollIntoView();
      setWindowLocation("reviews");
    } else if (windowLocation === "reviews") {
        window.scrollTo({
        top: 20000,
        left: 100,
        behavior: "smooth",
      });
      setWindowLocation("bottom");
    }
  }

  useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector("#teaching-animation"),
      animationData: lottieTeachingAnimation,
    });

    dispatch(subheader("Home"));
    dispatch(listAppointments())
  }, [location, dispatch]);

  return (
    <div className="home">
      <div className="container__btn--screen-nav fadeInAnimated--0">
        <button className="btn__screen-nav--up">
          <FaCaretUp
            size={40}
            fill="var(--old-blue)"
            className=""
            onClick={handleScrollToTop}
          />
        </button>
        <button className="btn__screen-nav--down">
          <FaCaretDown
            size={40}
            fill="var(--old-blue)"
            className="btn__calendar"
            onClick={handleScrollToBottom}
          />
        </button>
      </div>
      <div className="pg__home">
        <div className="container__hero">
          <div className="container__hero--text">
            <h1 className="text-size-0 letter-spacing-lg container__hero--welcome fadeInAnimated--2">
              Kellogg Tutoring
            </h1>
            <h3 className="text-size-2 hero__tutoring-simplified fadeInAnimated--3">
              Tutoring Simplified.
            </h3>
            <h4 className="text-size-3 hero__subjects-text fadeInAnimated--4">
              Math, Science, English, Spanish, SAT & ACT
            </h4>
          </div>

          <div className="hero__container--right">
            <div className="btns__hero--header fadeInAnimated--4">
              <button className="btn__request-tutoring">
                <Link to={`/appointments/booking`} className="">
                  Request Tutoring
                </Link>
              </button>
              <button className="btn__pay">
                <Link to={`/appointments/payments`} className="">
                  Payments
                </Link>
              </button>
            </div>
            <div
              className="hero__thinking--bubble bubble--1 fadeInAnimated--3"
              // style={{ display: height > 850 ? "block" : "none" }}
            />
            <div className="hero__thinking--bubble bubble--2 fadeInAnimated--2" />
            <div className="hero__thinking--bubble bubble--3 fadeInAnimated--1" />

            <div
              id="teaching-animation"
              className="teaching-animation fadeInAnimated--0"
            />
          </div>
        </div>

        <div className="highlights__appointments">
          <div className="highlights__appointments--text">
            <h3 className="text-size-2 highlights__appointments--header">
              Here are your <b>upcoming appointments:</b>
            </h3>

            <div className="btn__highlights--appointments-container">
              <Link to={`/appointments/booking`} className="">
                <button className="btn__highlights--appointments">
                  Request an appointment
                </button>
              </Link>

              <Link to={`/appointments/appts`} className="">
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

          <div
            className="highlights__appointments--appointments__list-container"
            ref={calendarRef}
          >
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
        </div>

        <div className="highlights__meetToshi" ref={reviewsRef}>
          <div className="highlights__meetToshi--container">
            <Reviews type="home" />
            <Link
              to={`/review/create-review`}
              className="btn__to-reviews--container"
            >
              <button className="btn__to-reviews">Write a review</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}