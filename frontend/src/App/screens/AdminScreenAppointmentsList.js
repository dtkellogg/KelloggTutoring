import React from 'react'
// import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { 
    listAppointments, 
    deleteAppointment, 
    // updateAppointment,
    // createAppointment,
} from '../actions/appointmentActions'
import { APPOINTMENT_CREATE_RESET } from '../constants/appointmentConstants'
import AdminAppointmentCreate from '../screens/AdminScreenAppointmentCreate'
import Loading from '../components/Loading'
import { Link, Route, Switch } from 'react-router-dom'


export default function AdminAppointmentsList({ location, history, match }) {
    const dispatch = useDispatch()

    // const redirect = location.search ? location.search.split('=')[1] : '/'

    const appointmentList = useSelector((state) => state.appointmentList);
    const { loading, error, appointments } = appointmentList;

    const appointmentDelete = useSelector((state) => state.appointmentDelete);
    const { loading:loadingDelete, error:errorDelete, success:successDelete } = appointmentDelete;

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

    return (
        <div className="appointments">
            <h2 className="text-size-2 appointments__header">
                Here are your upcoming appointments:
            </h2>

            {/* <Link to={`/admin/appointments/create-appointment` }> */}
            <Link to="/admin/appointments/create-appointment" ><span>Create appointment</span></Link>
            

        {loadingDelete && <Loading />}
        {errorDelete && <h1>{errorDelete}</h1>}
            {loading ? (
                <Loading />
            ) : error ? (
                <h2 className="text-size-2">{error}</h2>
            ) : (
                    <ul className="appointments__list text-size-3">
                        {appointments.map((appt) => {
                            const date = appt.date.split('T')[0].split('-')
                            return (
                                // <li key={appt._id}>{appt.subject}</li>
                                <li key={appt._id} className="appointments__list--item">
                                    <span className="text-size-3 appointments__item--date">{`${date[1]}-${date[2]}`}</span>{' '}
                                    <span className="text-size-3 appointments__item--time">{appt.time}</span>{' '}
                                    <span className="text-size-3 appointments__item--subject">{appt.subject}</span>
                                    <div className="btns-container__appointments">
                                        {
                                            (!appt.paid) &&
                                            <button className="btn__pay">Pay</button>
                                        }
                                        {/* <button className="btn__pay">Edit</button> */}
                                        <Link to={`/admin/appointments/${appt._id}/edit`}><button className="btn__pay">Edit</button></Link>
                                        <button className="btn__cancel" onClick={() => deleteHandler(appt._id)}>Delete</button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}
            <Switch location={location}>
                <Route exact path="/" component={Loading} />
                <Route exact path="/admin/appointments/create-appointment" component={AdminAppointmentCreate} />
            </Switch>
        </div>
    );
}
