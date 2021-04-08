import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

// actions
import { listAppointments } from '../../actions/appointmentActions'
import { subheader } from "../../actions/subheader";

// components
import {Sidebar} from "../navigation/Sidebar";
import ApptsList from '../appointments/ApptsList'

// constants
import { APPOINTMENT_CREATE_RESET } from '../../constants/appointmentConstants'

// hooks
import useWindowDimensions from '../../hooks/useWindowDimensions'


export default function AdminAppointmentsList({ location, history }) {
	const { width } = useWindowDimensions()

	const dispatch = useDispatch()
	const { 
		// path,
		url
	} = useRouteMatch()

	// const redirect = location.search ? location.search.split('=')[1] : '/'

	const appointmentDelete = useSelector((state) => state.appointmentDelete);
	const {
		loading:loadingDelete,
		error:errorDelete,
		success:successDelete
	} = appointmentDelete;


	const appointmentCreate = useSelector((state) => state.appointmentCreate);
	const { 
		loading: loadingCreate, 
		error: errorCreate, 
		success: successCreate, 
		appt: createdAppt
	} = appointmentCreate;


	React.useEffect(() => {
		dispatch({ type: APPOINTMENT_CREATE_RESET })

		// ADD CHECK FOR ADMIN
		
		if(successCreate) {
			history.push(`/admin/appts`)
		} else {
			dispatch(listAppointments())
		}
	}, [dispatch, history, loadingDelete, errorDelete, successDelete, successCreate, createdAppt])

	React.useEffect(() => {
		if (loadingCreate || loadingDelete) {
			dispatch(subheader("Loading..."));
		} else {
			dispatch(subheader(""));
		}

		if (errorCreate || errorDelete) {
			// dispatch(subheader({ errorCreate }));
			console.log(errorCreate)
		}
	}, [dispatch, loadingDelete, errorDelete, loadingCreate, errorCreate])


	return (
		<div className="container__screen--sidebar">
			<div className="container__admin">
				<div className="admin__header--container">
					<div className="appointments__header">
						All appointments:
					</div>
					<Link to={`${url}/create-appointment`} className="btn__admin--appts-list">
						<span style={{ textAlign: "center" }}>
							{width > 900 ? "Create appointment" : "Create"}
						</span>
					</Link>
				</div>
			<ApptsList type={"admin"} />
			</div>
		</div>
  	);
}
