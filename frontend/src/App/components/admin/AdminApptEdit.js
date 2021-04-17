import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

// components
import {Sidebar} from "../navigation/Sidebar"
import Input from '../../components/Input'

// actions
import { updateAppointment, getAppointmentDetails } from "../../actions/appointmentActions"

// constants
import { APPOINTMENT_UPDATE_RESET } from '../../constants/appointmentConstants'


// data
import { adminList } from "../../data/lists"

export default function AdminAppointmentEdit({ match, location, history }) {
	const dispatch = useDispatch()
	const appointmentId = match.params.id

	const [student, setStudent] = useState("")
	const [subject, setSubject] = useState("")
	const [email, setEmail] = useState("")
	const [date, setDate] = useState("")
	const [duration, setDuration] = useState("")
	const [time, setTime] = useState("")
	const [paid, setPaid] = useState(null)
	const [user, setUser] = useState("")


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

	useEffect(() => {
		if (successUpdate) {
				dispatch({ type: APPOINTMENT_UPDATE_RESET })
				history.push('/admin/users')
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
		<div className="toshi">
		<Sidebar title="Toshi" list={adminList} />
		<form onSubmit={handleSubmit} className="container__admin--edit-appointment">
			<h2 className="header__appt-edit">
				Edit Appointment
			</h2>

			<div className="appt-edit__content">
				<div className="loginScreen__input-container">

				<Input containerClass="appt-edit__element" labelClass="appt-edit__label" inputClass="appt-edit__input appt-edit__input-contact"
					htmlFor="student" label="student" type="name" value={student} placeholder="student name" onChange={(e) => setStudent(e.target.value)}
				/>
				<Input containerClass="appt-edit__element" labelClass="appt-edit__label" inputClass="appt-edit__input appt-edit__input-contact"
					htmlFor="subject" label="subject" type="text" value={subject} placeholder="subject" onChange={(e) => setSubject(e.target.value)}
				/>
				<Input containerClass="appt-edit__element" labelClass="appt-edit__label" inputClass="appt-edit__input appt-edit__input-contact"
					htmlFor="" label="date" type="text" value={date} placeholder="date" onChange={(e) => setDate(e.target.value)}
				/>
				<Input containerClass="appt-edit__element" labelClass="appt-edit__label" inputClass="appt-edit__input appt-edit__input-contact"
					htmlFor="" label="duration" type="text" value={duration} placeholder="duration" onChange={(e) => setDuration(e.target.value)}
				/>
				<Input containerClass="appt-edit__element" labelClass="appt-edit__label" inputClass="appt-edit__input appt-edit__input-contact"
					htmlFor="" label="time" type="text" value={time} placeholder="time" onChange={(e) => setTime(e.target.value)}
				/>

				<button
					className="btn__admin--edit-appt"
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