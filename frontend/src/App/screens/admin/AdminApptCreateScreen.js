import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useToasts } from "react-toast-notifications";

// actions
import { createAppointment } from "../../actions/appointmentActions"
import { subheader } from "../../actions/subheader"
import { listUsers } from "../../actions/userActions"

// components
import LoadingSpinner from '../../components/LoadingSpinner'


export default function AdminAppointmentCreate({ location, history }) {
  
  const [users, setUsers] = React.useState([])
	const [student, setStudent] = React.useState("")
	const [subject, setSubject] = React.useState("")
	const [date, setDate] = React.useState("")
	const [startTime, setStartTime] = React.useState("")
	const [endTime, setEndTime] = React.useState("")
	const [submitted, setSubmitted] = React.useState(false)
	const [paid, setPaid] = React.useState(false)

	const appointmentCreate = useSelector((state) => state.appointmentCreate)
  const { loading: loadingCreate, error: errorCreate, success: successCreate } = appointmentCreate

  const dispatch = useDispatch()
  const { addToast } = useToasts();

  React.useEffect(() => {
    dispatch(listUsers())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const userList = useSelector((state) => state.userList);
  const {
    loading,
    error,
    users: usersList,
  } = userList;

  React.useEffect(() => {
    setUsers(usersList)
  }, [usersList])
  
  
  React.useEffect(() => {
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
    <div className="user__page">
      { loading ? <LoadingSpinner/> : (
      <form onSubmit={handleSubmit} className="createApptScreen user__page">
        <div className="createApptScreen__header">
          <h2 className="text-size-2 letter-spacing-sm">
            Create a new appointment
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
            {users && (
            <select 
              type="name" 
              className="createApptScreen__input createApptScreen__input-contact text-size-3"
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
                <option key={i}>{user}</option>

              ))}
            </select>
              )}
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
              type="checkbox"
              className="createApptScreen__input createApptScreen__input-contact text-size-3"
              style={{ alignSelf: "flex-start" }}
              placeholder="paid"
              value={paid}
              onChange={(e) => {
                paid ?
                setPaid(false)
              : setPaid(true)}
              }
            />
          </div>

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
