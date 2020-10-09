import React from 'react'
// import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { listAppointments } from '../actions/appointmentActions'
import Loading from '../components/Loading'
// import Message from '../components/Message'


export default function AppointmentsList() {
  ////////////////////////////////
  // Old code but important for learing - this was used to get data from the db before redux was implemented
  // const [appointments, setAppointments] = React.useState([]);

  // React.useEffect(() => {
  //   const fetchAppointments = async () => {
  //     const { data } = await axios.get("/api/appointments");
  //     setAppointments(data);
  //   };

  //   fetchAppointments();
  // }, []);

  ////////////////////////////////
  // Redux code
  const dispatch = useDispatch()
  const appointmentList = useSelector((state) => state.appointmentList);
  const { loading, error, appointments } = appointmentList;
  // console.log(`APPOINTMENTS: ${appointments}`)
  // console.log(`APPOINTMENTS-1: ${appointments[0]}`)
  
  React.useEffect(() => {
    dispatch(listAppointments())
  }, [dispatch])


  

  // console.log(`appointments: ${appointments.map((appt) => appt.date)}`);

  return (
    <div className="appointments">
      <h2 className="text-size-2 appointments__header">
        Here are your upcoming appointments:
      </h2>

      {loading ? (
        <Loading />
      ) : error ? (
        <h2 className="text-size-2">{error}</h2>
      ) : (
        <ul className="appointments__list text-size-3">
          {appointments.map((appt) => {
            const date = appt.date.split('T')[0].split('-')
            // console.log(`appt.date: ${appt.date.prototype.getUTCHours()}`)
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
                    {/* <button className="btn__cancel">Cancel</button> */}
                  </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
