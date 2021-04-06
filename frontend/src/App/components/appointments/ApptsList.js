import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// prop-types
import PropTypes from "prop-types"

// components
import ApptsTableHead from "./AppointmentsHead"
import ApptsTableBody from "./ApptsTableBody"
import PleaseLogin from '../PleaseLogin'

// moment
import moment from 'moment'

// hooks
import {useSortMultiple} from '../../hooks/useSort'

// actions
import { subheader } from "../../actions/subheader"
import { listAppointments } from '../../actions/appointmentActions'



export default function ApptsList({ type }) {
  const [appts, setAppts] = React.useState([])
  const today = new Date(Date.now())
  var now = moment()

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
  }, [dispatch, userInfo, successUpdate])

  useEffect(() => {
    if(userInfo) {
      if (type === "all") {
        setAppts(sortedAppts.filter((appt) => appt.student === userInfo.name))
      } else if (type === "upcoming" && userInfo) {
        setAppts(sortedAppts
          .filter((appt) => appt.student === userInfo.name)
          .filter((appt) => (new Date(appt.date)) > today)

          
        )

        //--------------solution-to-below--------------//

        //--------------appts' date is not saved into db... need to go thru model and controller--------------//

        const test = sortedAppts
          .filter((appt) => appt.student === userInfo.name)
          // .map((appt) => console.log(moment(appt.date).isAfter(now)))
          // .map((appt) => console.log(`${new Date(appt.date)} ${today}`))
          .map((appt) => console.log((new Date(appt.date))))
          .map((appt) => console.log(today))
          // .map((appt) => console.log(new Date(appt.date) > today))

          // .map((appt) => console.log(today))


          // .map((appt) => console.log(moment(appt.date).isAfter(now.subtract(0, 'days'))))
          // .filter((appt) => moment(appt.date).isAfter(now))

        // console.log("NOW")
        // console.log(now)
        // console.log(test)
        // console.log(appts)
      } else if (type === "admin") {
        setAppts(appointments)
      }
    }
  }, [appointments])

  // console.log(sortedAppts.filter((appt) => appt.student === userInfo.name).filter((appt) => moment(appt.date).isAfter(now.subtract(0, 'days'))))
  // console.log("sortedAppts")


  //////////////////////////////////////
  //////////////////////////////////////
  if (!userInfo || userInfo === null) {
    return <PleaseLogin />
  }
 else if (type === "upcoming" && appts.length > 0) {
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
        <div className="appointments__table--container">
          <table className="appointments__list--all">
            <ApptsTableHead />
            <ApptsTableBody appts={appts} type={type} />
          </table>
        </div>
      </div>
    );
  } else if (type === "admin" && userInfo && appts.length ) {
    return (
      <div className="admin__table--container">
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