import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { requestAppointment } from "../actions/appointmentActions";
import { getUserDetails } from "../actions/userActions";

import Sidebar from "../components/Sidebar";
import { subheader } from "../actions/subheader";

const apptsList = ["Booking", "Payments", "Appts List", "Appts Calendar"]
// const apptsList = ["Booking", "Payments", "Appointments List", "Appointments Calendar"]
// const contactList = ['message form', 'schedule an appointment', 'phone, text & email'];
const contactList = ['message', 'schedule', 'contact info'];




export default function UserBookingScreen({ location, history, type}) {
  const [student, setStudent] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [date, setDate] = React.useState("");
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  // eslint-disable-next-line no-unused-vars
  const [paid, setPaid] = React.useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  // console.log(`location: ${location}`);

  // const appointmentCreate = useSelector((state) => state.appointmentCreate);
  // const {
  //     // loading,
  //     // error,
  //     // success: successCreate,
  //     // userInfox
  //  } = appointmentCreate;
  // const redirect = location.search ? location.search.split("=")[1] : "/";

  React.useEffect(() => {
    if (user !== undefined && !user.name) {
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

  // React.useEffect(() => {
  //   if (loading ) {
  //     dispatch(subheader("Loading..."));
  //   } else {
  //     dispatch(subheader(""));
  //   }

  //   if (error) {
  //     dispatch(subheader({ error }));
  //   }
  // }, [loading, error]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(`sAS: ${subject}, ${student}, ${date}, ${duration}, ${time}`)

    setSubmitted(true);

    dispatch(
      requestAppointment(subject, student, date, startTime, endTime, paid)
    );
  };

  // console.log(`TYPE: ${type}`);

  return (
    <div className="pg__appointment">
      <Sidebar
        title={type === "booking" ? "Appointments" : "Contact"}
        list={type === "schedule" ? contactList : apptsList}
      />

      <div className="user__page">
        <form onSubmit={handleSubmit} className="createApptScreen">
          <div className="createApptScreen__header">
            <h2 className="text-size-2 letter-spacing-sm">
              {/* Any Questions? */}
              Request a new appointment
            </h2>
          </div>

          <div className="createApptScreen__content">
            <div className="createApptScreen__element">
              <label
                className="text-size-5 letter-spacing-md createApptScreen__label"
                htmlFor="student"
              >
                student
              </label>
              <input
                type="name"
                className="createApptScreen__input text-size-4"
                placeholder="student name"
                style={{ color: "var(--old-blue-2)" }}
                value={student}
                onChange={(e) => setStudent(e.target.value)}
              />
            </div>

            <div className="createApptScreen__element">
              <label
                className="text-size-5 letter-spacing-md createApptScreen__label"
                htmlFor="subject"
              >
                subject
              </label>
              <input
                type="text"
                className="createApptScreen__input text-size-4"
                placeholder="subject"
                style={{ color: "var(--old-blue-2)" }}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div className="createApptScreen__element">
              <label className="text-size-5 letter-spacing-md createApptScreen__label">
                date
              </label>
              <input
                type="date"
                className="createApptScreen__input text-size-4"
                placeholder="date"
                style={{ fontWeight: "lighter", color: "var(--old-blue-2)" }}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="createApptScreen__element">
              <label className="text-size-5 letter-spacing-md createApptScreen__label">
                start time
              </label>
              <input
                type="time"
                className="createApptScreen__input text-size-4"
                placeholder="start time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>

            <div className="createApptScreen__element">
              <label className="text-size-5 letter-spacing-md createApptScreen__label">
                end time
              </label>
              <input
                type="time"
                className="createApptScreen__input text-size-4"
                placeholder="end time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
          <button
            className="btn__createApptScreen"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
