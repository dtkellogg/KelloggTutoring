import React from "react"
import { useSelector, useDispatch } from "react-redux";
import { FaCaretRight, FaCaretLeft } from "react-icons/fa";

// prop-types
import PropTypes from "prop-types";

// components
import {Sidebar} from "./navigation/Sidebar";

// screens
import PleaseLoginScreen from "../screens/user/UserPleaseLoginScreen"

// actions
import { listAppointments } from "../actions/appointmentActions"
import { subheader } from "../actions/subheader"

// hooks
import { useSort } from '../hooks/useSort'
import useFormatAMPM from "../hooks/useFormatAMPM";

// sidebar list
import { apptsList } from '../data/lists'

// uuid
const { v4: uuid } = require("uuid");


function AMPMTime(time) {
  return useFormatAMPM(time);
}


export default function Calendar({ type }) {
  const dispatch = useDispatch()
  
	const [date, setDate] = React.useState(new Date())
	const [day, setDay] = React.useState('')
	const [month, setMonth] = React.useState('')
	const [year, setYear] = React.useState(date.getFullYear())
	const [calendarDays, setCalendarDays] = React.useState([])
	
	
	const appointmentList = useSelector((state) => state.appointmentList);
	const { loading, error, appointments } = appointmentList;

	const userLogin = useSelector(state => state.userLogin)
	const { userInfo } = userLogin

	const sortedAppts = useSort(appointments, "startTime")

	const days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"]
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


  // code below for testing ... trying to get calendar to start on correct day

  days.forEach(() => (item, index) => {

  })


	function daysInMonth(month, year) {
		return new Date(year, month, 0).getDate()
  }
  
  // console.log(`date: ${date}`);

  // console.log(`date.getMonth: ${date.getMonth()}`);
  // console.log(`date.getDate: ${date.getDate()}`);
  // console.log(`day: ${day}`);

	
	const getCalendarDays = (date) => {
		var monthIdx = date.getMonth()
		var monthStr = months[monthIdx]
		var nextMonthStr = months[monthIdx + 1]
		var lastMonthStr = months[monthIdx - 1]
		var year = date.getFullYear();

		setDay(date.getDate())
    setMonth(monthStr)

    // testing
    // let ok = date.setDate(1)
    
    // let ok2 = ok.getUTCDay();

		let firstDayOfCurrentMonth = days[date.getUTCDay()];
		// let firstDayOfCurrentMonth = days[date.getUTCDay() - 3];
		let numDaysOfPreviousMonth = days.indexOf(firstDayOfCurrentMonth)
		
		let totalNumOfDaysInCurrentMonth = daysInMonth(date.getMonth() + 1, year)
    let totalNumOfDaysInLastMonth = daysInMonth(date.getMonth(), year)

    // console.log(`date: ${date}`)
    // console.log(`ok: ${ok}`)
    // console.log(`ok2: ${ok2}`)
    
    // console.log(`firstDayOfCurrentMonth: ${firstDayOfCurrentMonth}`)
    // console.log(`date.getDay(): ${date.getDay()}`)
    // console.log(`date.getUTCDay(): ${date.getUTCDay()}`)
    // console.log(`date: ${date}`)

		let arrayDaysCurrentMonth = []
		let arrayDaysLastMonth = []
		let arrayDaysNextMonth = []
		
		if (numDaysOfPreviousMonth === -1) {
			for (var i = 1; i < totalNumOfDaysInCurrentMonth + 1; i++) {
				arrayDaysCurrentMonth.push({ num: i, month: monthStr, year: year, appts: [] })
			}
			for (i = 1; i < 43 - totalNumOfDaysInCurrentMonth; i++) {
				arrayDaysNextMonth.push({ num: i, month: nextMonthStr, year: year, appts: [] })
			}

		} else {
			for (i = totalNumOfDaysInLastMonth; i > totalNumOfDaysInLastMonth - numDaysOfPreviousMonth; i--) {
				arrayDaysLastMonth.unshift({ num: i, month: lastMonthStr, year: year, appts: [] })
			}
			for (i = 1; i < 43 - (totalNumOfDaysInCurrentMonth + numDaysOfPreviousMonth); i++) {
				arrayDaysNextMonth.push({ num: i, month: nextMonthStr, year: year, appts: [] })
			}
			for (i = 1; i < totalNumOfDaysInCurrentMonth + 1; i++) {
				arrayDaysCurrentMonth.push({ num: i, month: monthStr, year: year, appts: [] })
			}
		}

		let arrayAllDays = arrayDaysLastMonth.concat(arrayDaysCurrentMonth).concat(arrayDaysNextMonth)

    const allDaysWithAppts = []

    if(userInfo) {
      arrayAllDays.forEach((calDay) => {
        sortedAppts
          .filter((appt) => appt.student === userInfo.name)
          .forEach((appt) => {
            const apptDate = appt.date.split("T")[0].split("-");
            const apptDay = parseInt(apptDate[2]);
            const apptMonth = months[apptDate[1] - 1];
            // const apptYear = apptDate[0]

            if (apptDay === calDay.num && apptMonth === calDay.month) {
              calDay.appts.push(appt);
            }
          });

        allDaysWithAppts.push(calDay);
      })
    } else {
      return setCalendarDays(arrayAllDays);
    }
    
		setCalendarDays(allDaysWithAppts)
	}


	const handleBackwards = () => {
		if (months.indexOf(month) > 0) {

			let indexOfCurrentMonth = months.indexOf(month)
			let indexOfPreviousMonth = indexOfCurrentMonth - 1

				
			date.setMonth(indexOfPreviousMonth)
			
			let newMonth = months[months.indexOf(month) - 1]

			if ((newMonth) === 1) {
				newMonth = months[12]
			}

			setDate(date)
			setMonth(newMonth)
			getCalendarDays(date)

    } else {
      let indexOfLastMonth = 11
      date.setMonth(indexOfLastMonth)

      let newMonth = months[11]

      setYear((year) => year - 1)

      setMonth(newMonth)
      setDate(date)
      getCalendarDays(date)
    }
  }
  


	const handleForwards = () => {
		if (months.indexOf(month) < 11) {
			let indexOfCurrentMonth = months.indexOf(month)
			let indexOfNextMonth = indexOfCurrentMonth + 1
			date.setMonth(indexOfNextMonth)
      
			let newMonth = months[months.indexOf(month) + 1]


			setMonth(newMonth)
			setDate(date)
			getCalendarDays(date)
		} else {
			let indexOfNextMonth = 0
			let newMonth = months[0]

			date.setMonth(indexOfNextMonth)

			setYear((year) => year + 1)
			setMonth(newMonth)
			setDate(date)
			getCalendarDays(date)
		}
  }

  React.useEffect(() => {
    dispatch(listAppointments());

    if (sortedAppts) {
      getCalendarDays(date);
    }
  }, [dispatch]);

  React.useEffect(() => {
    if (loading) {
      dispatch(subheader("Loading..."))
    } else {
      dispatch(subheader(""))
    }
    if (error) {
      dispatch(subheader({ error }))
    }
  }, [dispatch, loading, error])



	if(userInfo === null) {
		return (
      <div className={type === "home" ? "home--calendar" : "pg__appointment"} >
        {/* <Sidebar title="Appointments" list={apptsList} /> */}
        <div className="appointments">
          <PleaseLoginScreen />
        </div>
      </div>
    )
	 } else {
	 return (
     <div className={type === "home" ? "home--calendar" : "pg__appointment"}>
       {/* {type !== "home" && <Sidebar title="Appointments" list={apptsList} />} */}
       <div className="calendar">
         <div className="calendar__row--header text-size-2">
           <FaCaretLeft
             size={30}
             fill="var(--old-blue-2)"
             className="btn__calendar"
             onClick={() => handleBackwards()}
           />
           <div className="home--calendar--header">{`${month} ${day}, ${year}`}</div>
           <FaCaretRight
             size={30}
             fill="var(--old-blue-2)"
             className="btn__calendar"
             onClick={() => handleForwards()}
           />
         </div>
         <ul className="calendar__row--days">
           {days.map((day) => (
             <li key={day} className="calendar__row--day">
               {day}
             </li>
           ))}
         </ul>
         <ul className="calendar__row--numDays">
            {calendarDays.map((numDay) => {
              const dayKey = uuid();
              
              if (numDay.month !== month) {
                if (numDay.appts.length !== 0) {
                  return (
                    <li
                      className="calendar__row--element-with-appts"
                      style={{ color: "var(grey-light-5)" }}
                      key={dayKey}
                    >
                      <div
                        style={{
                          display: "block",
                          color: "var(--grey-light-5)",
                          alignSelf: "flex-end",
                        }}
                      >
                        {numDay.num}
                      </div>
                      <br />
                      <div
                        className="calendar__row--appt"
                        style={{
                          color: "var(--old-blue-2)",
                          // paddingLeft: "0.5rem",
                          //   alignSelf: 'flex-end'
                        }}
                      >
                        {numDay.appts.map((appt) => {
                          return (
                            <div key={appt._id}>
                              {AMPMTime(appt.startTime)} - {AMPMTime(appt.endTime)}: <br /><span className="calendar__element--subject">{appt.subject}</span>
                            </div>
                          );
                        })}
                      </div>
                    </li>
                  );
                } else
                  return (
                    <li
                      key={numDay.num}
                      className="calendar__row--element"
                      style={{ color: "var(--grey-light-5)" }}
                    >
                      {numDay.num}
                    </li>
                  );
              } else if (
                numDay.num === day &&
                numDay.month === months[new Date().getMonth()] &&
                numDay.year === year
              ) {
                if (numDay.appts.length !== 0) {
                  return (
                    <li
                      className="calendar__row--element-with-appts"
                      style={{ color: "var(--old-blue-2)" }}
                      key={uuid()}
                    >
                      <div
                        style={{
                          display: "block",
                          fontWeight: "bold",
                          alignSelf: "flex-end",
                        }}
                      >
                        {numDay.num}
                      </div>
                      <br />
                      <div
                        className="calendar__row--appt"
                        style={{
                          color: "var(--old-blue-2)",
                          // paddingLeft: "0.5rem",
                        }}
                      >
                        {numDay.appts.map((appt) => {
                          return (
                            <div key={appt._id}>
                              {AMPMTime(appt.startTime)} - {AMPMTime(appt.endTime)}: <br /><span className="calendar__element--subject">{appt.subject}</span>
                            </div>
                          );
                        })}
                      </div>
                    </li>
                  );
                } else
                  return (
                    <li
                    key={dayKey}
                      className="calendar__row--element"
                      style={{ color: "var(--old-blue-2)" }}
                    >
                      {numDay.num}
                    </li>
                  );
              } else {
                if (numDay.appts.length !== 0) {
                  return (
                    <li
                      key={uuid()}
                    className="calendar__row--element-with-appts"
                    >
                      <div style={{ display: "block", alignSelf: "flex-end" }}>
                        {numDay.num}
                      </div>
                      <br />
                      <div
                        className="calendar__row--appt"
                        style={{
                          color: "var(--old-blue-2)",
                          // paddingLeft: "0.5rem",
                        }}
                      >
                        {numDay.appts.map((appt) => {
                          return (
                            <div key={uuid()}>
                              {AMPMTime(appt.startTime)} - {AMPMTime(appt.endTime)}: <br /><span className="calendar__element--subject">{appt.subject}</span>
                            </div>
                          );
                        })}
                      </div>
                    </li>
                  );
                } else
                

                  return (
                    <li
                      key={dayKey}
                      className="calendar__row--element"
                      style={{ color: "var(--black)" }}
                    >
                      {numDay.num}
                    </li>
                  );
              }
           })}
         </ul>
       </div>
     </div>
   );}
}

Calendar.propTypes = {
  type: PropTypes.string
}