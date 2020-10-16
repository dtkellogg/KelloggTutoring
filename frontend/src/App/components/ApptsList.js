import React from 'react'
// import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { listAppointments } from '../actions/appointmentActions'
import Loading from './Loading'
// import Message from '../components/Message'


export default function ApptsList() {
  ////////////////////////////////
  // Redux code
  const dispatch = useDispatch()
  const appointmentList = useSelector((state) => state.appointmentList);
  const { loading, error, appointments } = appointmentList;

  console.log(`${appointments}`)
  
  React.useEffect(() => {
    dispatch(listAppointments())
  }, [dispatch])
  
  // console.log(`APPOINTMENTS: ${appointments}`)
  // console.log(`APPOINTMENTS-1: ${appointments[0]}`)
  // console.log(`appointments: ${appointments.map((appt) => appt.date)}`);

  return (
  //   <div className="appointments">
  //     <h2 className="text-size-2 appointments__header">
  //       Here are your upcoming appointments:
  //     </h2>

  //     {loading ? (
  //       <Loading />
  //     ) : error ? (
  //       <h2 className="text-size-2">{error}</h2>
  //     ) : (


            <table className="appointments__list text-size-3">
              <thead className="thead">
                <tr className="tr">
                  <th>date</th>
                  <th>time</th>
                  <th>student</th>
                  <th>subject</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => {
                  const date = appt.date.split('T')[0].split('-')
                  // console.log(`appt.date: ${appt.date.prototype.getUTCHours()}`)
                  return (
                    // <li key={appt._id}>{appt.subject}</li>
                    
                    <tr key={appt._id} className="appointments__list--item">
                        <td className="text-size-3 appointments__item--date">{`${date[1]}-${date[2]}`}</td>
                        <td className="text-size-3 appointments__item--time">{`${appt.startTime} - ${appt.endTime}`}</td>
                        <td className="text-size-3 appointments__item--subject">{appt.student}</td>
                        <td className="text-size-3 appointments__item--subject">{appt.subject}</td>
                        <td className="btns-container__appointments">
                          {
                            (!appt.paid) && 
                              <>
                                <button className="btn__pay width-8rem">Pay</button>
                                <button className="btn__cancel">Cancel</button>
                              </>
                            }
                          {/* <button className="btn__cancel">Cancel</button> */}
                        </td>
                    </tr>
                  );
                })}
        </tbody>
    </table>


      // )}
      // </div>
  );


}
