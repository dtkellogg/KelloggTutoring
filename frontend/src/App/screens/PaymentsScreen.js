import React from 'react'
// import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import {
    Link, 
    Route,
    Switch,
    useRouteMatch, 
    useLocation} from 'react-router-dom'
import { listAppointments } from '../actions/appointmentActions'
import Loading from '../components/Loading'
// import Message from '../components/Message'
// import PageHeader from '../screens/HeaderScreen'
import Checkout from '../screens/CheckoutScreen'


export default function Payments({ history, match }) {
    const [checkedAppointments, setCheckedAppointments] = React.useState([])
    const [submit, setSubmit] = React.useState(false)
    const dispatch = useDispatch()
    const location = useLocation()

    const appointmentList = useSelector((state) => state.appointmentList);
    const { loading, error, appointments } = appointmentList;
    const { url } = useRouteMatch();
    const redirect = location.search ? location.search.split('=')[1] : '/'


    React.useEffect(() => {
        dispatch(listAppointments())
    }, [dispatch])

    React.useEffect(() => {
        if (submit) {
            history.push(redirect)
        }
    }, [history, submit, redirect])


    const handleCheckBox = (appt) => {
        setCheckedAppointments([...checkedAppointments, appt])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmit(true)
        // console.log(`checkedAppointments: ${checkedAppointments}`)
    }

    return (
        <div className="appointments">
            <h2 className="text-size-2 appointments__header">
                Here are your unpaid appointments:
      </h2>

            {loading ? (
                <Loading />
            ) : error ? (
                <h2 className="text-size-2">{error}</h2>
            ) : (
                    <form>
                        <ul className="appointments__list text-size-3">

                            {appointments.filter((appt) => appt.paid === false).map((appt, idx) => {
                            // appointments.map((appt) => {
                                const date = appt.date.split('T')[0].split('-')
                                // { console.log(`appt.paid: ${appt.paid}`) }
                                // console.log(`appt.date: ${appt.date.prototype.getUTCHours()}`)
                                return (
                                    // if(appt.isPaid)
                                    
                                    // <li key={appt._id}>{appt.subject}</li>
                                    <li key={appt._id} className="appointments__list--item">
                                        <input type='checkbox' onClick={handleCheckBox}/>
                                        <span className="text-size-3 appointments__item--date">{`${date[1]}-${date[2]}`}</span>{' '}
                                        <span className="text-size-3 appointments__item--time">{appt.time}</span>{' '}
                                        <span className="text-size-3 appointments__item--subject">{appt.subject}</span>
                                        <div className="btns-container__appointments">
                                            {
                                                (!appt.paid) &&
                                                    <Link to={{
                                                        pathname: `${url}/checkout`,
                                                        search: location.search,
                                                    }}
                                                    ><button className="btn__pay" onClick={handleSubmit}>Pay</button></Link>
                                            }
                                            {/* <button className="btn__cancel">Cancel</button> */}
                                        </div>
                                    </li>
                                );
                                }
                            )})
                            }
                        </ul>
                            <Link to={redirect ? `/appointments/payments/checkout?redirect=${redirect}` : `/appointments/payments`} className="btn" 
                            // onClick={handleSubmit}
                            >Pay for selected</Link>
                    </form>
                    )}

            <Switch location={location}>
                <Route exact path={'/'} component={Payments} />
                <Route path={`/checkout`} component={Checkout} />
            </Switch>
        </div>
    );
}
