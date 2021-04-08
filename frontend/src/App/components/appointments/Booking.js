import React from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import { subheader } from "../../actions/subheader";
import Input from '../Input'

// actions
import { requestAppointment } from "../../actions/appointmentActions";
import { getUserDetails } from "../../actions/userActions";
import PleaseLogin from '../PleaseLogin'

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
        <form onSubmit={handleSubmit} className="form">
          <h2 className="booking__header">
            Request an appointment
          </h2>

          <div className="booking__content">

            <Input containerClass="booking__element" labelClass="booking__label" inputClass="booking__input booking__input-contact"
              htmlFor="student" label="student" type="name" value={student || ''} placeholder="student" onChange={(e) => setStudent(e.target.value)}
            />
            <Input containerClass="booking__element" labelClass="booking__label" inputClass="booking__input booking__input-contact"
              htmlFor="subject" label="subject" type="subject" value={subject} placeholder="subject" onChange={(e) => setSubject(e.target.value)}
            />
            <Input containerClass="booking__element" labelClass="booking__label" inputClass="booking__input booking__input-contact"
              htmlFor="date" label="date" type="date" value={date} placeholder="date" onChange={(e) => setDate(e.target.value)}
              style={width > '450' ? { "alignItems": 'stretch' } : { "alignItems": 'flex-end' }}
            />
            <Input containerClass="booking__element" labelClass="booking__label" inputClass="booking__input booking__input-contact"
              htmlFor="time" label="start time" type="time" value={startTime} placeholder="start time" onChange={(e) => setStartTime(e.target.value)}
              style={width > '450' ? { "alignItems": 'stretch' } : { "alignItems": 'flex-end' }}
            />
            <Input containerClass="booking__element" labelClass="booking__label" inputClass="booking__input booking__input-contact"
              htmlFor="time" label="end time?" type="time" value={endTime} placeholder="end time" onChange={(e) => setEndTime(e.target.value)}
              style={width > '450' ? { "alignItems": 'stretch' } : { "alignItems": 'flex-end' }}
            />

            {/* {submitted && (
              <p className="form__success-message--contact">
                Message has been sent.
              </p>
            )}
            {failed.length > 0 && (
              <p className="form__fail-message--contact">
                {failed}
              </p>
            )} */}

          </div>
          <button className="btn__booking" type="submit" onClick={handleSubmit} >
            Submit
          </button>
          
        </form>
      </div>
    )
  }
}