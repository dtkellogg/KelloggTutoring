import React from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import Sidebar from "../components/Sidebar";
import { subheader } from "../actions/subheader";

// actions
import { requestAppointment } from "../actions/appointmentActions";
import { getUserDetails } from "../actions/userActions";

// screens
import PleaseLogin from './UserPleaseLoginScreen'

// hooks
import useWindowDimensions from '../hooks/useWindowDimensions'

const apptsList = ["Booking", "Payments", "Appts", "Calendar"];
const contactList = ['message', 'schedule', 'contact info'];



export default function UserBookingScreen({ location, history, type}) {
  const { width, height } = useWindowDimensions()

  const [student, setStudent] = React.useState("")
  const [subject, setSubject] = React.useState("")
  const [date, setDate] = React.useState("")
  const [startTime, setStartTime] = React.useState("")
  const [endTime, setEndTime] = React.useState("")
  const [submitted, setSubmitted] = React.useState(false)
  const [paid, setPaid] = React.useState(false) // eslint-disable no-unused-vars
  const [failed, setFailed] = React.useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  // const appointmentCreate = useSelector((state) => state.appointmentCreate);
  // const {
  //     // loading,
  //     // error,
  //     // success: successCreate,
  //     // userInfox
  //  } = appointmentCreate;
  // const redirect = location.search ? location.search.split("=")[1] : "/";

  React.useEffect(() => {
    if (!user) {
      dispatch(getUserDetails("profile"));
    } else if (user) {
      setStudent(user.name);
      // setEmail(user.email);
    } else {
      setStudent("");
    }

    // if (submitted) {
    //     history.push(redirect);
    // }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch, 
    history,
    // user.name,
    //  redirect,
    submitted,
  ]);

  React.useEffect(() => {
    if (loading ) {
      dispatch(subheader("Loading..."));
    } else {
      dispatch(subheader(""));
    }

    // need to think of better way to handle error below. Right now, it's an object.
    // if (error) {
    //   dispatch(subheader({ error }));
    // }
  }, [loading, error]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (subject && student && date && startTime && endTime) {

    setSubmitted(true);

    window.setTimeout(() => {
        setSubmitted(false);
      }, 4000);

    dispatch(
      requestAppointment(subject, student, date, startTime, endTime, paid)
    )
    } else {
      setFailed("Please fill out all fields.")

      window.setTimeout(() => {
        setFailed("");
      }, 4000);
    }
  };


  return (
    <div className="pg__appointment">
      <Sidebar
        title={type === "booking" ? "Appointments" : "Contact"}
        list={type === "schedule" ? contactList : apptsList}
      />

      <div className="appointments">
        {!userInfo ? (
          <div className="">
            <PleaseLogin />
          </div>
        ) :
        <form onSubmit={handleSubmit} className="user-booking">
          <div className="user-booking__header">
            <h2 className="text-size-2 letter-spacing-sm">
              Request an appointment
            </h2>
          </div>

          <div className="user-booking__content">
            <div className="user-booking__element">
              <label
                className="text-size-5 letter-spacing-md user-booking__label"
                htmlFor="student"
              >
                student
              </label>
              <input
                type="name"
                className="user-booking__input text-size-4"
                placeholder="student"
                style={{ color: "var(--old-blue-2)" }}
                value={student}
                onChange={(e) => setStudent(e.target.value)}
              />
            </div>

            <div className="user-booking__element">
              <label
                className="text-size-5 letter-spacing-md user-booking__label"
                htmlFor="subject"
              >
                subject
              </label>
              <input
                type="subject"
                className="user-booking__input text-size-4"
                placeholder="subject"
                style={{ color: "var(--old-blue-2)" }}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

              <div className="user-booking__element " style={width > '450' ? {"align-items": 'stretch'} : {"align-items": 'flex-end'}}>
                <label className="text-size-5 letter-spacing-md user-booking__label" htmlFor="date">
                date
              </label>
              <input
                type="date"
                className="user-booking__input text-size-4"
                placeholder="date"
                style={{ fontWeight: "lighter", color: "var(--old-blue-2)" }}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="user-booking__element " style={ width > '450' ? {"align-items": 'stretch'} : {"align-items": 'flex-end'}}>
                <label className="text-size-5 letter-spacing-md user-booking__label" htmlFor="time">
                start time
              </label>
              <input
                type="time"
                className="user-booking__input text-size-4"
                placeholder="start time"
                value={startTime}
                
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>

            <div className="user-booking__element " style={ width > '450' ? {"align-items": 'stretch'} : {"align-items": 'flex-end'}}>
                <label className="text-size-5 letter-spacing-md user-booking__label" htmlFor="time">
                end time
              </label>
              <input
                type="time"
                className="user-booking__input text-size-4"
                placeholder="end time"
                
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>

          {submitted && (
              <p className="messageForm__success-message--contact text-size-3">
                Message has been sent.
              </p>
            )}
            {failed.length > 0 && (
              <p className="messageForm__fail-message--contact text-size-3">
                {failed}
              </p>
            )}


          <button
            className="btn__user-booking"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      }
      </div>
    </div>
  );
}
