import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// prop-types
import PropTypes from "prop-types"

// components
import ApptsTableHead from "./AppointmentsHead"
import ApptsTableBody from "./ApptsTableBody"
import PleaseLogin from '../PleaseLogin'

// hooks
import {useSortMultiple} from '../../hooks/useSort'

// actions
import { subheader } from "../../actions/subheader"
import { listAppointments } from '../../actions/appointmentActions'

const formatDate = (appt) => {
  const dataDestructured = appt.date.split("-")
  const month = (dataDestructured[1].replace(/^0+/, '')) - 1
  const day = dataDestructured[2].split("T")[0]

  const dateObject = new Date(dataDestructured[0], month, day, appt.startTime.split(":")[0], appt.startTime.split(":")[1])
  return dateObject
}



export default function ApptsList({ type }) {
  const [appts, setAppts] = useState([])
  const today = new Date(Date.now())

  const dispatch = useDispatch()

  const appointmentList = useSelector((state) => state.appointmentList)
  const { loading, error, appointments } = appointmentList

  const appointmentUpdate = useSelector((state) => state.appointmentUpdate);
  const {
    loading: loadingUpdate, // eslint-disable-line no-unused-vars
    error: errorUpdate, // eslint-disable-line no-unused-vars
    success: successUpdate
  } = appointmentUpdate;

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const sortedAppts = useSortMultiple(appointments, "date", "startTime")

  useEffect(() => {
    if (loading) {
      dispatch(subheader("Loading..."))
    } else {
      dispatch(subheader(""))
    }
    if (error) {
      dispatch(subheader({ error }))
    }
  }, [dispatch, loading, error])


  useEffect(() => {
    dispatch(listAppointments())
  }, [])

  useEffect(() => {
    if(userInfo) {
      
      if (type === "all") {
        setAppts(sortedAppts.filter((appt) => appt.student === userInfo.name))

      } else if (type === "upcoming" && userInfo) {
        setAppts(sortedAppts
          .filter((appt) => appt.student === userInfo.name)
          .filter((appt) => {
            const dateObject = formatDate(appt)
            return dateObject > today
          })
        )

      } else if (type === "admin") {
        setAppts(appointments)
      }
    }
  }, [appointments])

  console.log("IN APPTS LIST")



  if (!userInfo || userInfo === null) {
    return <PleaseLogin />
  } else if (type === "upcoming" && appts.length > 0) {
    return (
      <div className="">
        <table className="appointments__list">
          <ApptsTableHead />
          <ApptsTableBody appts={appts} type={type} />
        </table>
      </div>
    );
  } else if (type === "all" && userInfo && appts.length) {
    return (
      <div className="container__screen--sidebar">
        <table className="appointments__list--all">
          <ApptsTableHead />
          <ApptsTableBody appts={appts} type={type} />
        </table>
      </div>
    );
  } else if (type === "admin" && userInfo && appts.length ) {
    return (
      <div className="container__admin--table">
        <table className="appointments__list--all">
          <ApptsTableHead />
          <ApptsTableBody appts={appts} type={type} />
        </table>
      </div>
    )
  } else if (type === "upcoming") {
  return (
    <h2 className="font-size-2" style={{ textAlign: "center" }}>
      You have no upcoming sessions
    </h2>
  )} else if (type === "all") {
    return (
      <div className="container__screen--sidebar">
        <h2 className="msg__no-prev-appts">
          You have no appointment history
        </h2>
      </div>
    )
  } else return null
}

ApptsList.propTypes = {
  type: PropTypes.string,
}