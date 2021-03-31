import React from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import {Sidebar} from "../../components/navigation/Sidebar";


// actions
import { listAppointmentRequests, deleteAppointmentRequest } from "../../actions/appointmentRequestActions"; // eslint-disable-line no-unused-vars
import { subheader } from "../../actions/subheader";

// hooks
import { useSortMultiple } from '../../hooks/useSort' // eslint-disable-line no-unused-vars
import useFormatAMPM from "../../hooks/useFormatAMPM"


import { adminList } from "../../data/lists"



export default function AdminApptRequests({ location, history }) {
    const dispatch = useDispatch()


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


    React.useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listAppointmentRequests())
        } else {
            // Note: come back and implement the redirect below once useHistory is defined in the right place
            history.push('/login')
        }
    }, [dispatch, history, successDelete, userInfo])

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


    // const deleteHandler = (id) => {
    //     if (window.confirm('Are you sure you want to delete this user?')) {
    //         dispatch(deleteAppointmentRequest(id))
    //     }
    // }

    function AMPMTime(time) {
        return useFormatAMPM(time)
    }


    if (appointmentRequests) {
        return (
            <div className="container__toshi">
                <Sidebar title="Toshi" list={adminList} />
                <div className="appointment-requests">
                    <div className="text-size-2 appointment-requests__header--container">
                        <div className="text-size-2 appointment-requests__header">
                            All Appointment Requests:
                        </div>
                    </div>

                    <div className="admin__table--container">
                        <table className="appointment-requests__list text-size-3">
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
                                            <td className="text-size-3 appointment-requests__td--date">
                                                {`${date[1]}-${date[2]}`}
                                            </td>

                                            <td className="text-size-3 appointment-requests__td--student">
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