import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
	listAppointments, 
	// deleteAppointment, 
} from '../actions/appointmentActions'
import { APPOINTMENT_CREATE_RESET } from '../constants/appointmentConstants'
import ApptsList from '../components/ApptsList'
import { Link, useRouteMatch } from 'react-router-dom'
import Sidebar from "../components/Sidebar";

import { subheader } from "../actions/subheader";

const adminList = [
	"User List",
	"Appointments",
	// "Reviews",
	// "Blog",
];


export default function AdminAppointmentsList({ location, history }) {
	const dispatch = useDispatch()
	const { 
		// path,
		url
	} = useRouteMatch()

	// const redirect = location.search ? location.search.split('=')[1] : '/'

	const appointmentDelete = useSelector((state) => state.appointmentDelete);
	const {
		// loading:loadingDelete,
		// error:errorDelete,
		success:successDelete
	} = appointmentDelete;


	const appointmentCreate = useSelector((state) => state.appointmentCreate);
	const { 
		loading: loadingCreate, 
		error: errorCreate, 
		success: successCreate, 
		product: createdProduct } = appointmentCreate;


	React.useEffect(() => {
		dispatch({ type: APPOINTMENT_CREATE_RESET })

		// ADD CHECK FOR ADMIN
		
		if(successCreate) {
			// history.push(`/admin/appointment/${createdAppt._id}/edit}`)
			console.log(`successCreate: ${successCreate}`)
		} else {
			dispatch(listAppointments())
		}
	}, [dispatch, successDelete, successCreate, createdProduct])

	React.useEffect(() => {
		if (loadingCreate) {
			dispatch(subheader("Loading..."));
		} else {
			dispatch(subheader(""));
		}
		if (errorCreate) {
			dispatch(subheader({ errorCreate }));
		}
	}, [dispatch, loadingCreate, errorCreate])


	return (
		<div className="pg__meetToshi">
			<Sidebar title="Toshi" list={adminList} />
			<div className="appointments">
				<div className="text-size-2 appointments__header--container">
					<div className="text-size-2 appointments__header">
						Here are your upcoming appointments:
					</div>
					<Link to={`${url}/create-appointment`} className="btn__adminApptsList">
						<span className="text-size-6" style={{ textAlign: "center" }}>
							Create appointment
						</span>
					</Link>
				</div>
			<ApptsList type={"admin"} />
			</div>
		</div>
  	);
}
