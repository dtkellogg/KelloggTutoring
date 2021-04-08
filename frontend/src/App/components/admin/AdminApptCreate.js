import React, { useState, useEffect } from "react"
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { useToasts } from "react-toast-notifications";

// actions
import { createAppointment } from "../../actions/appointmentActions"
import { subheader } from "../../actions/subheader"
import { listUsers } from "../../actions/userActions"

// components
import LoadingSpinner from '../loading/LoadingSpinner'
import Input from '../../components/Input'


export default function AdminAppointmentCreate() {
  
  const [users, setUsers] = useState([])
	const [student, setStudent] = useState("")
	const [subject, setSubject] = useState("")
	const [date, setDate] = useState("")
	const [startTime, setStartTime] = useState("")
	const [endTime, setEndTime] = useState("")
	const [submitted, setSubmitted] = useState(false)
	const [paid, setPaid] = useState(false)

	const appointmentCreate = useSelector((state) => state.appointmentCreate)
  const { loading: loadingCreate, error: errorCreate, success: successCreate } = appointmentCreate

  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const { addToast } = useToasts();

  useEffect(() => {
    dispatch(listUsers())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const userList = useSelector((state) => state.userList);
  const {
    loading,
    error,
    users: usersList,
  } = userList;

  useEffect(() => {
    setUsers(usersList)
  }, [usersList])
  
  
  useEffect(() => {
    if (loading) {
      dispatch(subheader("Loading..."));
    } else {
      dispatch(subheader(""));
    }

    if (error) {
      addToast("There was an error. Please try again.", {
        appearance: "error",
        autoDismiss: true,
      });
    }

    if (submitted) {
      addToast("Appointment successfully added.", {
        appearance: "success",
        autoDismiss: true,
      });
      history.push("/admin/appts");
    }

  }, [
    dispatch,
    history,
    loading,
    error,
    submitted,
    successCreate,
    loadingCreate,
    errorCreate,
  ]);

	const handleSubmit = async (e) => {
    e.preventDefault()
    
    if(student && subject && date && startTime && endTime) {
      setSubmitted(true)
      dispatch(createAppointment(subject, student, date, startTime, endTime, paid))
    } else {
      addToast("Please fill all inputs and try again.", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  }


	return (
    <div className="container__screen--sidebar">
      <Link to='/toshi/reviews' className="btn__user-edit">Go Back</Link>

      { loading ? <LoadingSpinner/> : (

      <form onSubmit={handleSubmit} className="createApptScreen user__page">

        <h2 className="createApptScreen__header letter-spacing-sm">
          Create a new appointment
        </h2>

        <div className="createApptScreen__content">

          <div className="createApptScreen__element">
            <label
              className="createApptScreen__label"
              htmlFor="student"
            >
              student
            </label>
            {users && (
            <select 
              type="name" 
              className="createApptScreen__input createApptScreen__input-contact"
              placeholder="student name"
              value={student}
              onChange={(e) => setStudent(e.target.value)}
              >
                {/* <option></option>
                {sortedUsers ? sortedUsers.map((user) => (
                  <option>{user}</option>

                )) : <option>---</option>} */}
              {/* <option></option>
              {sortedUsers && sortedUsers.map((user) => (
                <option>{user}</option>

              ))} */}
              <option></option>
              {users.map((user, i) => (
                <option key={i}>{user.email}</option>

              ))}
            </select>
              )}
          </div>

          <Input containerClass="createApptScreen__element" labelClass="createApptScreen__label" inputClass="createApptScreen__input createApptScreen__input-contact"
            htmlFor="subject" label="subject" type="subject" value={subject} placeholder="subject" onChange={(e) => setSubject(e.target.value)}
          />
          <Input containerClass="createApptScreen__element" labelClass="createApptScreen__label" inputClass="createApptScreen__input createApptScreen__input-contact"
            htmlFor="" label="date" type="date" value={date} placeholder="date" onChange={(e) => setDate(e.target.value)}
          />
          <Input containerClass="createApptScreen__element" labelClass="createApptScreen__label" inputClass="createApptScreen__input createApptScreen__input-contact"
            htmlFor="" label="start time" type="time" value={startTime} placeholder="start time" onChange={(e) => setStartTime(e.target.value)}
          />
          <Input containerClass="createApptScreen__element" labelClass="createApptScreen__label" inputClass="createApptScreen__input createApptScreen__input-contact"
            htmlFor="" label="end time" type="time" value={endTime} placeholder="end time" onChange={(e) => setEndTime(e.target.value)}
          />
          <Input containerClass="createApptScreen__element" labelClass="createApptScreen__label" inputClass="createApptScreen__input createApptScreen__input-contact"
            htmlFor="" label="paid?" type="checkbox" value={paid} placeholder="paid" onChange={(e) => {paid ? setPaid(false) : setPaid(true)}}
          />

          <button
            className="btn__create-appt"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
      )}
    </div>
  )
  // }
}