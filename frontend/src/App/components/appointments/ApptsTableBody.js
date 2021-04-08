import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaCheckSquare, FaTrash, FaTimes } from 'react-icons/fa'

// prop-types
import PropTypes from "prop-types"

// moment
import moment from 'moment'

// hooks
import useFormatAMPM from "../../hooks/useFormatAMPM"

// actions
import { deleteAppointment, updateAppointment } from '../../actions/appointmentActions'


function ApptsTableBody({appts, type}) {

    const dispatch = useDispatch()
    var now = moment()

    function AMPMTime(time) {
        return useFormatAMPM(time)
    }


    const deleteHandler = (id) => {
        if (window.confirm("Are you sure you want to delete this appointment?")) {
            dispatch(deleteAppointment(id))
        }
    }

    const paidHandler = (id) => {

        const selectedAppt = appts.find(x => x._id === id)
        const { paid, user, student, subject, startTime, endTime, date } = selectedAppt

        if (window.confirm("Are you sure you want to toggle the paid status?")) {
            dispatch(updateAppointment({ _id: id, paid: !paid, user, student, subject, startTime, endTime, date }))
        }
    }

    return (
        <tbody className="tbody">
            {appts
                .map((appt) => {
                    const date = appt.date.split("T")[0].split("-");
                    return (
                        <tr key={appt._id} className="tr">
                            <td className="appointments__td--upcoming-date">{`${date[1]}-${date[2]}`}</td>
                            <td className="appointments__td--upcoming-time">{`${AMPMTime(
                                appt.startTime
                            )} - ${AMPMTime(appt.endTime)}`}</td>
                            <td className="appointments__td--upcoming-student">
                                {appt.student}
                            </td>
                            <td className="appointments__td--upcoming-subject">
                                {appt.subject}
                            </td>
                            <td className="appointments__item--btns">
                                {(type === 'admin') ? (
                                    appt.paid ? (
                                        <>
                                            <FaCheckSquare
                                                size={20}
                                                color="var(--green-dark)"
                                                fill="var(--green)"
                                                className="icon__square grey-light-7"
                                                type="button"
                                                onClick={() => paidHandler(appt._id)}
                                            />
                                        </>
                                    ) : (
                                            <FaTimes
                                                size={20}
                                                color="var(--green-dark)"
                                                fill="var(--grey-light-5)"
                                                className="icon--times"
                                                type="button"
                                                onClick={() => paidHandler(appt._id)}
                                            />
                                    )) : (
                                        appt.paid ? (
                                            <>
                                                <FaCheckSquare
                                                    size={20}
                                                    color="var(--green-dark)"
                                                    fill="var(--green)"
                                                    className="icon__square grey-light-7"
                                                    type="button"
                                                    // onClick={() => paidHandler(appt._id)}
                                                />
                                            </>
                                        ) : (
                                                <FaTimes
                                                    size={20}
                                                    color="var(--green-dark)"
                                                    fill="var(--grey-light-5)"
                                                    className="icon--times"
                                                    type="button"
                                                    // onClick={() => paidHandler(appt._id)}
                                                />
                                        )
                                    )
                                }
                            </td>

                            <td className="appointments__item--cancel">
                                {(type === 'admin' || moment(appt.date).isAfter(now.subtract(1, 'days'))) ? (
                                    <FaTrash
                                        size={20}
                                        fill="var(--red)"
                                        className="icon__trash grey-light-7"
                                        type="button"
                                        onClick={() => deleteHandler(appt._id)}
                                    />
                                 ) : (
                                    <FaTrash
                                        size={20}
                                        fill="var(--grey-light-5)"
                                        className="icon__trash grey-light-7"
                                        type="button"
                                        // onClick={() => deleteHandler(appt._id)}
                                    />
                                 )
                                }
                            </td>
                        </tr>
                    );
                })}
        </tbody>
    )
}

export default ApptsTableBody
