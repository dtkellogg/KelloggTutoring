import React from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import {Sidebar} from "../navigation/Sidebar";

// actions
import { listAppointments } from "../../actions/appointmentActions";
import { subheader } from "../../actions/subheader";

// hooks
import { useSortMultiple } from '../../hooks/useSort' // eslint-disable-line no-unused-vars
import useFormatAMPM from "../../hooks/useFormatAMPM"


import { adminList } from "../../data/lists"

export default function AdminStatsScreen({history, location}) {
    const dispatch = useDispatch()

    // const [students, setStudents] = React.useState([])
    const students = []

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const appointmentList = useSelector((state) => state.appointmentList)
    const { loading, error, appointments } = appointmentList


    React.useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listAppointments())
        } else {
            // Note: come back and implement the redirect below once useHistory is defined in the right place
            history.push('/login')
        }
    }, [dispatch, history, userInfo])

    React.useEffect(() => {
        if (loading) {
            dispatch(subheader("Loading..."));
        } else {
            dispatch(subheader(""));
        }
        // if (error) {
        //     dispatch(subheader({ error }));
        // }
    }, [dispatch, loading, error])

    React.useEffect(() => {
        appointments.forEach((appt) => {
            // console.log(`appt.student: ${appt.student}`)
            students.push(appt.student)
            // console.log(students)
        })
    }, [appointments, students])


    function AMPMTime(time) { // eslint-disable-line no-unused-vars
        return useFormatAMPM(time)
    }

    console.log(appointments)
    console.log(students)

    

    console.log(`students: ${students}`)

    

    if (appointments) {

    
        return (
            <div className="container__screen--sidebar">
            {/* <Sidebar title="Toshi" list={adminList} /> */}
            <div className="appointment-requests">
              <div className="font-size-2 appointment-requests__header--container">
                <div className="font-size-2 appointment-requests__header">
                  Stats:
                </div>
              </div>

              {/* <div className="">
                        <h3 className="">Appt Lengths</h3>
                        <ul className="">
                            {appointments.map((appt) => {
                                const {startTime, endTime} = appt
                                const startTimeTotalMin = Number(startTime.split(':')[0]) * 60 + Number(startTime.split(':')[1])
                                const endTimeTotalMin = Number(endTime.split(':')[0]) * 60 + Number(endTime.split(':')[1])
                                // const startTimeInMin = appt.startTime;
                                // startTimeInMin.split(':')
                                // console.log(`startTime: ${startTime}`)
                                // console.log(`startTime.split(':')[0] * 60: ${startTime.split(':')[0] * 60}`)
                                // console.log(`startTime.split(':')[1]: ${startTime.split(':')[1]}`)
                                // console.log(`startTimeTotalMin: ${startTimeTotalMin}`)
                                return (
                                    <li className="">{endTimeTotalMin - startTimeTotalMin}</li>
                                )
                            })}
                        </ul>
                    </div> */}

              <div className="">
                <h3 className="">Owe me:</h3>
                {students && (
                  <ul className="">
                    {students.map((student) => {
                      return <li className="">{student}</li>;
                    })}
                  </ul>
                )}
              </div>

              <div className="">
                <h3 className="">Total Hours</h3>
                <span>This Week:</span>
                <span>This Month:</span>
                <span>This Year:</span>
              </div>

              {/* <div className="admin__table--container">
                        <table className="appointment-requests__list font-size-3">
                            <thead className="thead">
                                <tr className="tr">
                                    <th className="appointment-requests__th--date">date</th>
                                    <th className="appointment-requests__th--student">student</th>
                                    <th className="appointment-requests__th--subject">subject</th>
                                    <th className="appointment-requests__th--time">time</th>
                                </tr>
                            </thead>
                            <tbody className="tbody">
                                {appointments.map((appt) => {
                                    const date = appt.date.split("T")[0].split("-")
                                    return (
                                        <tr key={appt._id} className="tr">
                                            <td className="font-size-3 appointment-requests__td--date">
                                                {`${date[1]}-${date[2]}`}
                                            </td>

                                            <td className="font-size-3 appointment-requests__td--student">
                                                {appt.student}
                                            </td>

                                            <td className="appointment-requests__td--subject">
                                                {appt.subject}
                                            </td>

                                            <td className="appointment-requests__td--time">
                                                {`${AMPMTime(appt.startTime)} - ${AMPMTime(appt.endTime)}`}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div> */}
            </div>
          </div>
        );
    }
}
