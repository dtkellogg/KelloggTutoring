import React from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import { subheader } from "../../actions/subheader";
import Input from '../Input'

// actions
import { requestAppointment } from "../../actions/appointmentActions";
import { getUserDetails } from "../../actions/userActions";
import PleaseLogin from '../PleaseLogin'
import { useToasts } from "react-toast-notifications";

// hooks
import useWindowDimensions from '../../hooks/useWindowDimensions'


export default function Booking({ location, history, type}) {
  const { width } = useWindowDimensions()
  const { addToast } = useToasts();


  const [student, setStudent] = React.useState("")
  const [subject, setSubject] = React.useState("")
  const [date, setDate] = React.useState("")
  const [startTime, setStartTime] = React.useState("")
  const [endTime, setEndTime] = React.useState("")
  const [paid, setPaid] = React.useState(false) // eslint-disable-line no-unused-vars

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const appointmentRequestCreate = useSelector((state) => state.appointmentRequestCreate);
  const { loading: loadingCreate, error: errorCreate, success: successCreate } = appointmentRequestCreate;

  

  React.useEffect(() => {
    if (!user) {
      dispatch(getUserDetails("profile"));
    } else if (Object.keys(user).length !== 0) {  // this line checks if the object is empty
      setStudent(user.name);
    }
    else {
      return
    } 

  }, [dispatch, history]);

  React.useEffect(() => {
    if (loading || loadingCreate) {
      dispatch(subheader("Loading..."));
    } else if (error || errorCreate) {
      addToast("There was an error.", {
        appearance: "error",
        autoDismiss: true,
      });
    } else if (successCreate) {
      setStudent("")
      setSubject("")

      setDate("")
      setStartTime("")
      setEndTime("")

      addToast("Request was successfully submitted. Please expect up to 24 hours for a response.", {
        appearance: "success",
        autoDismiss: true,
      });
    } else {
      dispatch(subheader(""));
    }
  }, [dispatch, loading, error, loadingCreate, errorCreate, successCreate]);


  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (subject && student && date && startTime && endTime) {

      await dispatch(
        requestAppointment(subject, student, date, startTime, endTime, paid)
      )
        addToast("Request was successfully submitted. Please expect up to 24 hours for a response.", {
          appearance: "success",
          autoDismiss: true,
        });

        setStudent("")
        setSubject("")

        setDate("")
        setStartTime("")
        setEndTime("")
      }
    } catch {
      addToast("There was an error. Please try submitting your request again.", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };


  return (
    <div className={"fadeInAnimated--0", width > 950 ? "container__screen--sidebar" : "container__screen--no-sidebar"}>
      <form onSubmit={handleSubmit} className="form">
        <h2 className="header__booking">
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

        </div>
        <button className="btn__booking" type="submit" onClick={handleSubmit} >
          Submit
        </button>
        
      </form>
    </div>
  )
}