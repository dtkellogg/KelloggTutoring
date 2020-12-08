import React from "react"
import { useDispatch, useSelector } from "react-redux"

// components
import Sidebar from "../components/Sidebar"

// actions
import { updateAppointment, getAppointmentDetails } from "../actions/appointmentActions"

// constants
import { APPOINTMENT_UPDATE_RESET } from '../constants/appointmentConstants'


// data
const adminList = [ "Users", "Appointments", "Reviews", "Blog" ]

export default function AdminAppointmentEdit({ match, location, history }) {
	const dispatch = useDispatch()
	const appointmentId = match.params.id

	const [student, setStudent] = React.useState("")
	const [subject, setSubject] = React.useState("")
	const [email, setEmail] = React.useState("")
	const [date, setDate] = React.useState("")
	const [duration, setDuration] = React.useState("")
	const [time, setTime] = React.useState("")
	const [paid, setPaid] = React.useState(null)
	const [user, setUser] = React.useState("")


	const appointmentDetails = useSelector((state) => state.appointmentDetails)
	const {
		// loading, 
		// error, 
		appointment } = appointmentDetails

	// const userDetails = useSelector((state) => state.userDetails)
	// const {
	//     // loading, 
	//     // error, 
	//     user } = userDetails

	const appointmentUpdate = useSelector((state) => state.appointmentUpdate)
	const {
		// loading, 
		// error, 
		success: successUpdate } = appointmentUpdate

			
	// const redirect = location.search ? location.search.split("=")[1] : "/"

	React.useEffect(() => {
		if (successUpdate) {
				dispatch({ type: APPOINTMENT_UPDATE_RESET })
				history.push('/admin/userlist')
		} else {
				if (!appointment.student || appointment._id !== appointmentId) {
						dispatch(getAppointmentDetails(appointmentId))
				} else {
						setStudent(appointment.student)
						setEmail(appointment.subject)
						setDuration(appointment.duration)
						setTime(appointment.time)
						setDate(appointment.date)
						setSubject(appointment.subject)
						setPaid(appointment.paid)
						setUser(appointment.user)
				}
		}
	}, [dispatch, history, appointmentId, appointment, successUpdate])

	const handleSubmit = async (e) => {
		e.preventDefault()
		dispatch(updateAppointment({ _id: appointmentId, subject, student, email, date, duration, time, paid, user }))
	}

	return (
		<div className="pg__meetToshi">
		<Sidebar title="Toshi" list={adminList} />
		<form onSubmit={handleSubmit} className="apptEditScreen user__page">
			<div className="apptEditScreen__header">
				<h2 className="text-size-2 letter-spacing-sm">
					Edit Appointment
				</h2>
			</div>

			<div className="apptEditScreen__content">
				<div className="loginScreen__input-container">
				<div className="apptEditScreen__element">
					<label
							className="text-size-4 letter-spacing-md apptEditScreen__label"
							htmlFor="student"
					>
							student
					</label>
					<input
							type="name"
							className="apptEditScreen__input apptEditScreen__input-contact text-size-3"
							placeholder="Student name"
							value={student}
							onChange={(e) => setStudent(e.target.value)}
					/>
				</div>

					<div className="apptEditScreen__element">
						<label
								className="text-size-4 letter-spacing-md apptEditScreen__label"
								htmlFor="subject"
						>
								subject
						</label>
						<input
								type="text"
								className="apptEditScreen__input apptEditScreen__input-contact text-size-3"
								placeholder="subject"
								value={subject}
								onChange={(e) => setSubject(e.target.value)}
						/>
					</div>

					<div className="apptEditScreen__element">
						<label className="text-size-4 letter-spacing-md apptEditScreen__label">
								date
						</label>
						<input
								type="text"
								className="apptEditScreen__input apptEditScreen__input-contact text-size-3"
								placeholder="date"
								value={date}
								onChange={(e) => setDate(e.target.value)}
						/>
					</div>

					<div className="apptEditScreen__element">
						<label className="text-size-4 letter-spacing-md apptEditScreen__label">
								duration
						</label>
						<input
								type="text"
								className="apptEditScreen__input apptEditScreen__input-contact text-size-3"
								placeholder="duration"
								value={duration}
								onChange={(e) => setDuration(e.target.value)}
						/>
					</div>

					<div className="apptEditScreen__element">
						<label className="text-size-4 letter-spacing-md apptEditScreen__label">
								time
						</label>
						<input
								type="text"
								className="apptEditScreen__input apptEditScreen__input-contact text-size-3"
								placeholder="time"
								value={time}
								onChange={(e) => setTime(e.target.value)}
						/>
					</div>

					<button
						className="btn__apptEditScreen"
						type="submit"
						onClick={handleSubmit}
					>
						Submit changes
					</button>

					</div>
				</div>
		</form>
		</div>
	)
}
