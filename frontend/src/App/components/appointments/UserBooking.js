import React from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import { subheader } from "../../actions/subheader";

// actions
import { requestAppointment } from "../../actions/appointmentActions";
import { getUserDetails } from "../../actions/userActions";

// screens
import PleaseLogin from '../../screens/PleaseLoginScreen'

// hooks
import useWindowDimensions from '../../hooks/useWindowDimensions'


export default function UserBooking({ location, history, type}) {
  const { width } = useWindowDimensions()

  const [student, setStudent] = React.useState("")
  const [subject, setSubject] = React.useState("")
  const [date, setDate] = React.useState("")
  const [startTime, setStartTime] = React.useState("")
  const [endTime, setEndTime] = React.useState("")
  const [submitted, setSubmitted] = React.useState(false)
  const [paid, setPaid] = React.useState(false) // eslint-disable-line no-unused-vars
  const [failed, setFailed] = React.useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  React.useEffect(() => {
    if (!user) {
      dispatch(getUserDetails("profile"));
    } else if (user) {
      setStudent(user.name);
      // setEmail(user.email);
    } else {
      setStudent("");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch, 
    history,
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
  }, [dispatch, loading, error]);


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

    
if(!userInfo) { return (
  <div className="">
  <PleaseLogin />
  </div>
)} else { return (
  <div className="container__screen--sidebar">
    <form onSubmit={handleSubmit} className="booking">
      <div className="booking__header">
        <h2 className="font-size-2 letter-spacing-sm">
          Request an appointment
        </h2>
      </div>

      <div className="booking__content">
        <div className="booking__element">
          <label
            className="font-size-5 letter-spacing-md booking__label"
            htmlFor="student"
          >
            student
          </label>
          <input
            type="name"
            className="booking__input font-size-4"
            placeholder="student"
            style={{ color: "var(--old-blue-2)" }}
            value={student || ''}
            onChange={(e) => setStudent(e.target.value)}
          />
        </div>

        <div className="booking__element">
          <label
            className="font-size-5 letter-spacing-md booking__label"
            htmlFor="subject"
          >
            subject
          </label>
          <input
            type="subject"
            className="booking__input font-size-4"
            placeholder="subject"
            style={{ color: "var(--old-blue-2)" }}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

          <div className="booking__element " style={width > '450' ? {"alignItems": 'stretch'} : {"alignItems": 'flex-end'}}>
            <label className="font-size-5 letter-spacing-md booking__label" htmlFor="date">
            date
          </label>
          <input
            type="date"
            className="booking__input font-size-4"
            placeholder="date"
            style={{ fontWeight: "lighter", color: "var(--old-blue-2)" }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="booking__element " style={ width > '450' ? {"alignItems": 'stretch'} : {"alignItems": 'flex-end'}}>
            <label className="font-size-5 letter-spacing-md booking__label" htmlFor="time">
            start time
          </label>
          <input
            type="time"
            className="booking__input font-size-4"
            placeholder="start time"
            value={startTime}
            
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        <div className="booking__element " style={ width > '450' ? {"alignItems": 'stretch'} : {"alignItems": 'flex-end'}}>
            <label className="font-size-5 letter-spacing-md booking__label" htmlFor="time">
            end time
          </label>
          <input
            type="time"
            className="booking__input font-size-4"
            placeholder="end time"
            
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </div>

      {submitted && (
          <p className="messageForm__success-message--contact font-size-3">
            Message has been sent.
          </p>
        )}
        {failed.length > 0 && (
          <p className="messageForm__fail-message--contact font-size-3">
            {failed}
          </p>
        )}


      <button
        className="btn__booking"
        type="submit"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </form>
    </div>
)
  }
}
