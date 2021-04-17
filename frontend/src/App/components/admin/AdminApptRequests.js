import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// actions
import { listAppointmentRequests, deleteAppointmentRequest } from "../../actions/appointmentRequestActions"; // eslint-disable-line no-unused-vars
import { subheader } from "../../actions/subheader";

// hooks
import useFormatAMPM from "../../hooks/useFormatAMPM"
import { useHistory } from "react-router-dom";


function AMPMTime(time) {
    return useFormatAMPM(time)
}


export default function AdminApptRequests() {
    const dispatch = useDispatch()
    const history = useHistory()

    const appointmentRequestList = useSelector((state) => state.appointmentRequestList)
    const {
        loading,
        error,
        appointmentRequests
    } = appointmentRequestList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const appointmentRequestDelete = useSelector((state) => state.appointmentRequestDelete)
    const { success: successDelete } = appointmentRequestDelete


    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listAppointmentRequests())
        } else {
            // Note: come back and implement the redirect below once useHistory is defined in the right place
            history.push('/login')
        }
    }, [dispatch, history, successDelete, userInfo])

    useEffect(() => {
        if (loading) {
            dispatch(subheader("Loading..."));
        } else {
            dispatch(subheader(""));
        }
        // if (error) {
        //     dispatch(subheader({ error }));
        // }
    }, [dispatch, loading, error])

    // const deleteHandler = (id) => {
    //     if (window.confirm('Are you sure you want to delete this appointment request?')) {
    //         dispatch(deleteAppointmentRequest(id))
    //     }
    // }

    
    if (appointmentRequests) {
        return (
            <div className="container__screen--sidebar">
                <div className="container__admin--appointment-requests">
                    <h2 className="header__appointment-requests">
                        All Appointment Requests:
                    </h2>

                    <div className="container__admin--table">
                        <table className="appointment-requests__list">
                            <thead className="thead">
                                <tr className="tr">
                                    <th className="appointment-requests__th--date">date</th>
                                    <th className="appointment-requests__th--student">student</th>
                                    <th className="appointment-requests__th--subject">subject</th>
                                    <th className="appointment-requests__th--time">time</th>
                                </tr>
                            </thead>
                            <tbody className="tbody">
                                {appointmentRequests.map((request) => {
                                    const date = request.date.split("T")[0].split("-")
                                    return (
                                        <tr key={request._id} className="tr">
                                            <td className="appointment-requests__td--date">
                                                {`${date[1]}-${date[2]}`}
                                            </td>

                                            <td className="appointment-requests__td--student">
                                                {request.student}
                                            </td>

                                            <td className="appointment-requests__td--subject">
                                                {request.subject}
                                            </td>

                                            <td className="appointment-requests__td--time">
                                                {`${AMPMTime(request.startTime)} - ${AMPMTime(request.endTime)}`}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        )
    } else return null
}