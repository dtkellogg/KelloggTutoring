import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
	listAppointments, 
	deleteAppointment, 
	// updateAppointment,
	// createAppointment,
} from '../actions/appointmentActions'
import { APPOINTMENT_CREATE_RESET } from '../constants/appointmentConstants'
import AdminAppointmentCreate from './AdminApptCreateScreen'
import AdminAppointmentEdit from './AdminApptEditScreen'
import Loading from '../components/Loading'
import ApptsList from '../components/ApptsList'
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom'


export default function AdminAppointmentsList({ location, history }) {
	const dispatch = useDispatch()
	const { path, url } = useRouteMatch()

	// const redirect = location.search ? location.search.split('=')[1] : '/'

	// const appointmentList = useSelector((state) => state.appointmentList);
	// const { loading, error, appointments } = appointmentList;

	const appointmentDelete = useSelector((state) => state.appointmentDelete);
	const { loading:loadingDelete, error:errorDelete, success:successDelete } = appointmentDelete;

	const loading = []
	const error = []

	const appointmentCreate = useSelector((state) => state.appointmentCreate);
	const { 
			// loading: loadingCreate, 
			// error: errorCreate, 
			success: successCreate, 
			product: createdProduct } = appointmentCreate;

	// const userLogin = useSelector((state) => state.userLogin);
	// const { userInfo } = userLogin;

	React.useEffect(() => {
		dispatch({ type: APPOINTMENT_CREATE_RESET })

		// ADD CHECK FOR ADMIN
		
		if(successCreate) {
				// history.push(`/admin/appointment/${createdProduct._id}/edit}`)
				console.log(`successCreate: ${successCreate}`)
		} else {
				dispatch(listAppointments())
		}
	}, [dispatch, successDelete, successCreate, createdProduct])

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure you want to delete this appointment?')) {
				dispatch(deleteAppointment(id))
		}
	}

	// const createAppointmentHandler = (appt) => {
	//     dispatch(createAppointment())
			
	// }

	console.log(`url: ${url}`)

	return (
		<div className="appointments">
			<div className="text-size-2 appointments__header">
				<div className="text-size-2">Here are your upcoming appointments:</div>
				<Link to={`${url}/create-appointment`} className=""><span className="text-size-6 btn__adminApptsList">Create appointment</span></Link>
			</div>

				{/* <Link to={`/admin/appointments/create-appointment` }> */}
				


		{loadingDelete && <Loading />}
		{errorDelete && <h1>{errorDelete}</h1>}
				{loading ? (
						<Loading />
				) : error ? (
						<h2 className="text-size-2">{error}</h2>
				) : ( ApptsList()
							// <table className="appointments__list text-size-3">
							// 		<thead className="thead">
							// 				<tr className="tr">
							// 						<th>date</th>
							// 						<th>time</th>
							// 						<th>student</th>
							// 						<th>subject</th>
							// 						<th>Btns</th>
							// 				</tr>
							// 		</thead>
							// 		<tbody>
							// 			{appointments.map((appt) => {
							// 					const date = appt.date.split('T')[0].split('-')
							// 					return (
							// 						<tr key={appt._id} className="appointments__list--item">
							// 							<td className="text-size-3 appointments__item--date">{`${date[1]}-${date[2]}`}</td>
							// 							<td className="text-size-3 appointments__item--time">{`${appt.startTime} - ${appt.endTime}`}</td>
							// 							<td className="text-size-3 appointments__item--subject">{appt.student}</td>
							// 							<td className="text-size-3 appointments__item--subject">{appt.subject}</td>
							// 							<td className="btns-container__appointments">
							// 									{
							// 											(!appt.paid) &&
							// 											<button className="btn__pay">Pay</button>
							// 									}
							// 									<Link to={`/admin/appointment/${appt._id}/edit`}><button className="btn__pay">Edit</button></Link>
							// 									<button className="btn__cancel" onClick={() => deleteHandler(appt._id)}>Delete</button>
							// 							</td>
							// 						</tr>
							// 					);
							// 			})}
							// 		</tbody>
							// 	</table>
						)
						}
				<Switch location={location}>
						{/* <Route exact path="/" component={Loading} /> */}
						<Route exact path={`${path}/create-appointment`} component={AdminAppointmentCreate} />
						<Route exact path={`${path}/edit-appointment`} component={AdminAppointmentEdit} />
				</Switch>
		</div>
	);
}
