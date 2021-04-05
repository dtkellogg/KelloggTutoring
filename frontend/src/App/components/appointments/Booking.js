import React from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import { subheader } from "../../actions/subheader";
import BookingElement from './BookingElement'

// actions
import { requestAppointment } from "../../actions/appointmentActions";
import { getUserDetails } from "../../actions/userActions";

// screens
import PleaseLogin from '../../screens/PleaseLoginScreen'

// hooks
import useWindowDimensions from '../../hooks/useWindowDimensions'


export default function Booking({ location, history, type}) {
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

  }, [dispatch, history, submitted]);

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

    
  if(!userInfo) { 
    return <PleaseLogin />
  } else { 
    return (
      <div className={"fadeInAnimated--0", width > 950 ? "container__screen--sidebar" : "container__screen--no-sidebar"}>
        <form onSubmit={handleSubmit} className="messageForm">
          <h2 className="booking__header font-size-2 letter-spacing-sm">
            Request an appointment
          </h2>

          <div className="booking__content">
            <BookingElement htmlFor="student" text="student" type="name" placeholder="student" style={{}} value={student || ''} onChange={(e) => setStudent(e.target.value)}/>
            <BookingElement htmlFor="subject" text="subject" type="subject" placeholder="subject" style={{}} value={subject} onChange={(e) => setSubject(e.target.value)}/>
            <BookingElement htmlFor="date" text="date" type="date" placeholder="student" style={width > '450' ? { "alignItems": 'stretch' } : { "alignItems": 'flex-end' }} value={date} onChange={(e) => setDate(e.target.value)}/>
            <BookingElement htmlFor="time" text="start time" type="time" placeholder="start time" style={width > '450' ? { "alignItems": 'stretch' } : { "alignItems": 'flex-end' }} value={startTime} onChange={(e) => setStartTime(e.target.value)}/>
            <BookingElement htmlFor="time" text="end time" type="time" placeholder="end time" style={width > '450' ? { "alignItems": 'stretch' } : { "alignItems": 'flex-end' }} value={endTime} onChange={(e) => setEndTime(e.target.value)}/>

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

          </div>
          <button className="btn__booking" type="submit" onClick={handleSubmit} >
            Submit
          </button>
          
        </form>
      </div>
    )
  }
}