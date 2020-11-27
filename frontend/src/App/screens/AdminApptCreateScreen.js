import React from "react"
import { useDispatch, useSelector } from "react-redux"

// actions
import { createAppointment } from "../actions/appointmentActions"
import { subheader } from "../actions/subheader"


export default function AdminAppointmentCreate({ location, history }) {
  const dispatch = useDispatch()
  
	const [student, setStudent] = React.useState("")
	const [subject, setSubject] = React.useState("")
	const [date, setDate] = React.useState("")
	const [startTime, setStartTime] = React.useState("")
	const [endTime, setEndTime] = React.useState("")
	const [submitted, setSubmitted] = React.useState(false)
	const [paid, setPaid] = React.useState(false)


	const appointmentCreate = useSelector((state) => state.appointmentCreate)
  const { loading, error, success: successCreate } = appointmentCreate
  
  
  React.useEffect(() => {
    if (loading) {
      dispatch(subheader("Loading..."))
    } else {
      dispatch(subheader(""))
    }
    if (error) {
      dispatch(subheader({ error }))
    }
    if (submitted) {
      history.push('/admin/appointments')
    }
  }, [dispatch, loading, error, submitted, successCreate])

	const handleSubmit = async (e) => {
		e.preventDefault()

    setSubmitted(true)
		dispatch(createAppointment(subject, student, date, startTime, endTime, paid))
	}

	return (
    <div className="user__page">
      <form onSubmit={handleSubmit} className="createApptScreen user__page">
        <div className="createApptScreen__header">
          <h2 className="text-size-2 letter-spacing-sm">
            Create new appointment
          </h2>
        </div>
        <div className="createApptScreen__content">
          <div className="createApptScreen__element">
            <label
              className="text-size-4 letter-spacing-md createApptScreen__label"
              htmlFor="student"
            >
              student
            </label>
            <input
              type="name"
              className="createApptScreen__input createApptScreen__input-contact text-size-3"
              placeholder="student name"
              value={student}
              onChange={(e) => setStudent(e.target.value)}
            />
          </div>

          <div className="createApptScreen__element">
            <label
              className="text-size-4 letter-spacing-md createApptScreen__label"
              htmlFor="subject"
            >
              subject
            </label>
            <input
              type="text"
              className="createApptScreen__input createApptScreen__input-contact text-size-3"
              placeholder="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="createApptScreen__element">
            <label className="text-size-4 letter-spacing-md createApptScreen__label">
              date
            </label>
            <input
              type="date"
              className="createApptScreen__input createApptScreen__input-contact text-size-3"
              placeholder="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="createApptScreen__element">
            <label className="text-size-4 letter-spacing-md createApptScreen__label">
              start time
            </label>
            <input
              type="time"
              className="createApptScreen__input createApptScreen__input-contact text-size-3"
              placeholder="start time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>

          <div className="createApptScreen__element">
            <label className="text-size-4 letter-spacing-md createApptScreen__label">
              end time
            </label>
            <input
              type="time"
              className="createApptScreen__input createApptScreen__input-contact text-size-3"
              placeholder="end time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>

          <div className="createApptScreen__element">
            <label className="text-size-4 letter-spacing-md createApptScreen__label">
              paid?
            </label>
            <input
              type="radio"
              className="createApptScreen__input createApptScreen__input-contact text-size-3"
              style={{ alignSelf: "flex-start" }}
              placeholder="paid"
              value={paid}
              onChange={(e) => setPaid(e.target.value)}
            />
          </div>

          <button
            className="btn__createApptScreen"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
