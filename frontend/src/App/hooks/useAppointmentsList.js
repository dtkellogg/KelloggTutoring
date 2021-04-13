import React from 'react'
// import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { listAppointments } from '../actions/appointmentActions'
// import Message from '../components/Message'


export default function useAppointmentsList() {
    ////////////////////////////////
    // Redux code
    const dispatch = useDispatch()
    const appointmentList = useSelector((state) => state.appointmentList);
    const { loading, error, appointments } = appointmentList;

    console.log(`${appointments}`)

    useEffect(() => {
        dispatch(listAppointments())
    }, [dispatch])

    // console.log(`APPOINTMENTS: ${appointments}`)
    // console.log(`APPOINTMENTS-1: ${appointments[0]}`)
    // console.log(`appointments: ${appointments.map((appt) => appt.date)}`);

    return (
        <div className="container__appointments">
            {appointments}
        </div>
    );
}
