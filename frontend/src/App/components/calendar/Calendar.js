import React from "react"
import { useSelector, useDispatch } from "react-redux";

// prop-types
import PropTypes from "prop-types";

// components
import BtnsLeftRightCalendar from '../navigation/BtnsLeftRightCalendar'

// screens
import PleaseLoginScreen from "../PleaseLogin"

// actions
import { listAppointments } from "../../actions/appointmentActions"
import { subheader } from "../../actions/subheader"

// hooks
import { useSort } from '../../hooks/useSort'
import useFormatAMPM from "../../hooks/useFormatAMPM";
import CalendarRowOfDays from "./CalendarRowOfDays";

import {daysOfWeek, months} from '../../data/lists'

// uuid
const { v4: uuid } = require("uuid");


function AMPMTime(time) {
  return useFormatAMPM(time);
}

const days = daysOfWeek

function daysInMonth(month, year) {
  // console.log(`month: ${month}`)
  // console.log(`new Date(Date.now()).getMonth: ${(new Date(Date.now())).getMonth()}`)

  if (month === (new Date(Date.now())).getMonth()) {
    console.log(`HEKKDKD`)
    return new Date(year, month, 0).getDate()
  } else {
    return new Date(year, month, 0).getDate()
  }
}


export default function Calendar({ type }) {
  const dispatch = useDispatch()
  
  const [date, setDate] = React.useState(new Date(Date.now()))
	const [day, setDay] = React.useState(date.getDate())
  const [month, setMonth] = React.useState(months[date.getMonth()])
  const [year, setYear] = React.useState(date.getFullYear())
  const [daysInThisMonth, setDaysInThisMonth] = React.useState(daysInMonth(date.getMonth(), year))
  const [daysInLastMonth, setDaysInLastMonth] = React.useState(daysInMonth(date.getMonth() + 1, year))
	const [calendarDays, setCalendarDays] = React.useState([])
	
	
	const appointmentList = useSelector((state) => state.appointmentList);
	const { loading, error, appointments } = appointmentList;

	const userLogin = useSelector(state => state.userLogin)
	const { userInfo } = userLogin

	const sortedAppts = useSort(appointments, "startTime")



	
  
  // console.log(`date: ${date}`);
  // console.log(`day: ${day}`);
  // console.log(`month: ${month}`);
  // console.log(`year: ${year}`);

	
	const getCalendarDays = (date) => {
    
    //
    // To do: (it is 3 am on 4/4 so these notes r for tmr)
    //
    // Make the variables below state w useState. Put them in getCalendarDays()
    // Set initial state, esp for number of days for current, next, and last months
    
    
    
    // const 
		let monthIdx = date.getMonth()
		let nextMonthStr = months[monthIdx + 1]
		let lastMonthStr = months[monthIdx - 1]
    let year = month === "January" 
      ? date.getFullYear() - 1 
      : date.getFullYear();
    
    // let numDaysOfPreviousMonth = new Date(`01 ${date.getMonth} ${year}`).getDay()


    let numDaysOfPreviousMonth = new Date(year + "-" + month + "01").getDay()

      


    // let firstDayOfCurrentMonth = days[date.getUTCDay()];
    
    // console.log(`firstOfTheMonth: ${firstOfTheMonth}`)
		// let firstDayOfCurrentMonth = days[date.getUTCDay() - 3];
		// let numDaysOfPreviousMonth = days.indexOf(day)
		
		setDaysInThisMonth(daysInMonth(date.getMonth(), year))
    setDaysInLastMonth(daysInMonth(date.getMonth(), year))
    // let totalNumOfDaysInCurrentMonth = daysInMonth(date.getMonth(), year)
    // let totalNumOfDaysInLastMonth = daysInMonth(date.getMonth() - 1, year)

    // let totalNumOfDaysInLastMonth = daysInMonth(date.getMonth(), year)

    // console.log(`date: ${date}`)
    
    // console.log(`totalNumOfDaysInCurrentMonth: ${totalNumOfDaysInCurrentMonth}`)
    console.log(`numDaysOfPreviousMonth: ${numDaysOfPreviousMonth}`)
    console.log(`daysInLastMonth: ${daysInLastMonth}`)
    console.log(`daysInThisMonth: ${daysInThisMonth}`)
    // console.log(`totalNumOfDaysInLastMonth: ${totalNumOfDaysInLastMonth}`)


    // console.log(`date.getMonth(): ${date.getMonth()}`)
    // console.log(`date.getUTCDay(): ${date.getUTCDay()}`)
    // console.log(`date: ${date}`)

		let arrayDaysCurrentMonth = []
		let arrayDaysLastMonth = []
		let arrayDaysNextMonth = []
		
		if (numDaysOfPreviousMonth === -1) {
			for (var i = 1; i < daysInThisMonth + 1; i++) {
				arrayDaysCurrentMonth.push({ num: i, month: month, year: year, appts: [] })
			}
			for (i = 1; i < 43 - daysInThisMonth; i++) {
				arrayDaysNextMonth.push({ num: i, month: nextMonthStr, year: year, appts: [] })
			}

		} else {
			for (i = daysInLastMonth; i > daysInLastMonth - numDaysOfPreviousMonth; i--) {
				arrayDaysLastMonth.unshift({ num: i, month: lastMonthStr, year: year, appts: [] })
			}
			for (i = 1; i < 43 - (daysInThisMonth + numDaysOfPreviousMonth); i++) {
				arrayDaysNextMonth.push({ num: i, month: nextMonthStr, year: year, appts: [] })
			}
			for (i = 1; i < daysInThisMonth + 1; i++) {
				arrayDaysCurrentMonth.push({ num: i, month: month, year: year, appts: [] })
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

  React.useEffect(() => {
    !sortedAppts && dispatch(listAppointments());

    if (sortedAppts) {
      getCalendarDays(date);
    }
  }, [sortedAppts]);

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
      <div className={type === "home" ? "container__calendar" : "container__screen--sidebar"} >
        <PleaseLoginScreen />
      </div>
    )
	 } else {
	 return (
      <div className="calendar">
        <BtnsLeftRightCalendar date={date} day={day} month={month} year={year} setDate={setDate} setDay={setDay} setMonth={setMonth} setYear={setYear} getCalendarDays={getCalendarDays} />
        <CalendarRowOfDays />
        <ul className="calendar__row--numDays">
          {calendarDays.map((numDay) => {
            const dayKey = uuid();
            
            if (numDay.month !== month) {
              if (numDay.appts.length !== 0) {
                return (
                  <li
                    className="calendar__row--element-with-appts"
                    style={{ color: "var(grey-5)" }}
                    key={dayKey}
                  >
                    <div
                      style={{
                        display: "block",
                        color: "var(--grey-5)",
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
                        // paddingLeft: "0.5rem"
                      }}
                    >
                      {numDay.appts.map((appt) => {
                        return (
                          <div key={uuid()}>
                            <span className="calendar__element--subject">{appt.subject}:</span> <br /> {AMPMTime(appt.startTime)} - {AMPMTime(appt.endTime)} 
                          </div>
                        );
                      })}
                    </div>
                  </li>
                );
              } else
                return (
                  <li
                    key={uuid()}
                    className="calendar__row--element"
                    style={{ color: "var(--grey-5)" }}
                  >
                    {numDay.num}
                  </li>
                );
            } else if (
              numDay.num === day &&
              numDay.month === month &&
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
                          <div key={uuid()} className="calendar__appt">
                            <span className="calendar__element--subject">{appt.subject}:</span> <br /> {AMPMTime(appt.startTime)} - {AMPMTime(appt.endTime)} 
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
                          <div key={uuid()} className="calendar__appt">
                            <span className="calendar__element--subject">{appt.subject}:</span> <br /> {AMPMTime(appt.startTime)} - {AMPMTime(appt.endTime)} 
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
   );}
}

Calendar.propTypes = {
  type: PropTypes.string
}

// import React from "react"
// import { useSelector, useDispatch } from "react-redux";

// // prop-types
// import PropTypes from "prop-types";

// // components
// import BtnsLeftRightCalendar from '../navigation/BtnsLeftRightCalendar'

// // screens
// import PleaseLoginScreen from "../../screens/PleaseLoginScreen"

// // actions
// import { listAppointments } from "../../actions/appointmentActions"
// import { subheader } from "../../actions/subheader"

// // hooks
// import { useSort } from '../../hooks/useSort'
// import useFormatAMPM from "../../hooks/useFormatAMPM";
// import CalendarRowOfDays from "./CalendarRowOfDays";

// // uuid
// const { v4: uuid } = require("uuid");


// function AMPMTime(time) {
//   return useFormatAMPM(time);
// }


// export default function Calendar({ type }) {
//   const dispatch = useDispatch()

//   const [date, setDate] = React.useState(new Date())
//   const [day, setDay] = React.useState('')
//   const [month, setMonth] = React.useState('')
//   const [year, setYear] = React.useState(date.getFullYear())
//   const [calendarDays, setCalendarDays] = React.useState([])


//   const appointmentList = useSelector((state) => state.appointmentList);
//   const { loading, error, appointments } = appointmentList;

//   const userLogin = useSelector(state => state.userLogin)
//   const { userInfo } = userLogin

//   const sortedAppts = useSort(appointments, "startTime")

//   const days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"]
//   const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


//   // code below for testing ... trying to get calendar to start on correct day

//   days.forEach(() => (item, index) => {

//   })


//   function daysInMonth(month, year) {
//     return new Date(year, month, 0).getDate()
//   }

//   // console.log(`date: ${date}`);

//   // console.log(`date.getMonth: ${date.getMonth()}`);
//   // console.log(`date.getDate: ${date.getDate()}`);
//   // console.log(`day: ${day}`);


//   const getCalendarDays = (date) => {
//     var monthIdx = date.getMonth()
//     var monthStr = months[monthIdx]
//     var nextMonthStr = months[monthIdx + 1]
//     var lastMonthStr = months[monthIdx - 1]
//     var year = date.getFullYear();

//     setDay(date.getDate())
//     setMonth(monthStr)

//     // testing
//     // let ok = date.setDate(1)

//     // let ok2 = ok.getUTCDay();

//     let firstDayOfCurrentMonth = days[date.getUTCDay()];
//     // let firstDayOfCurrentMonth = days[date.getUTCDay() - 3];
//     let numDaysOfPreviousMonth = days.indexOf(firstDayOfCurrentMonth)

//     let totalNumOfDaysInCurrentMonth = daysInMonth(date.getMonth() + 1, year)
//     let totalNumOfDaysInLastMonth = daysInMonth(date.getMonth(), year)

//     // console.log(`date: ${date}`)
//     // console.log(`ok: ${ok}`)
//     // console.log(`ok2: ${ok2}`)

//     // console.log(`firstDayOfCurrentMonth: ${firstDayOfCurrentMonth}`)
//     // console.log(`date.getDay(): ${date.getDay()}`)
//     // console.log(`date.getUTCDay(): ${date.getUTCDay()}`)
//     // console.log(`date: ${date}`)

//     let arrayDaysCurrentMonth = []
//     let arrayDaysLastMonth = []
//     let arrayDaysNextMonth = []

//     if (numDaysOfPreviousMonth === -1) {
//       for (var i = 1; i < totalNumOfDaysInCurrentMonth + 1; i++) {
//         arrayDaysCurrentMonth.push({ num: i, month: monthStr, year: year, appts: [] })
//       }
//       for (i = 1; i < 43 - totalNumOfDaysInCurrentMonth; i++) {
//         arrayDaysNextMonth.push({ num: i, month: nextMonthStr, year: year, appts: [] })
//       }

//     } else {
//       for (i = totalNumOfDaysInLastMonth; i > totalNumOfDaysInLastMonth - numDaysOfPreviousMonth; i--) {
//         arrayDaysLastMonth.unshift({ num: i, month: lastMonthStr, year: year, appts: [] })
//       }
//       for (i = 1; i < 43 - (totalNumOfDaysInCurrentMonth + numDaysOfPreviousMonth); i++) {
//         arrayDaysNextMonth.push({ num: i, month: nextMonthStr, year: year, appts: [] })
//       }
//       for (i = 1; i < totalNumOfDaysInCurrentMonth + 1; i++) {
//         arrayDaysCurrentMonth.push({ num: i, month: monthStr, year: year, appts: [] })
//       }
//     }

//     let arrayAllDays = arrayDaysLastMonth.concat(arrayDaysCurrentMonth).concat(arrayDaysNextMonth)

//     const allDaysWithAppts = []

//     if (userInfo) {
//       arrayAllDays.forEach((calDay) => {
//         sortedAppts
//           .filter((appt) => appt.student === userInfo.name)
//           .forEach((appt) => {
//             const apptDate = appt.date.split("T")[0].split("-");
//             const apptDay = parseInt(apptDate[2]);
//             const apptMonth = months[apptDate[1] - 1];
//             // const apptYear = apptDate[0]

//             if (apptDay === calDay.num && apptMonth === calDay.month) {
//               calDay.appts.push(appt);
//             }
//           });

//         allDaysWithAppts.push(calDay);
//       })
//     } else {
//       return setCalendarDays(arrayAllDays);
//     }

//     setCalendarDays(allDaysWithAppts)
//   }

//   React.useEffect(() => {
//     dispatch(listAppointments());

//     if (sortedAppts) {
//       getCalendarDays(date);
//     }
//   }, [dispatch]);

//   React.useEffect(() => {
//     if (loading) {
//       dispatch(subheader("Loading..."))
//     } else {
//       dispatch(subheader(""))
//     }
//     if (error) {
//       dispatch(subheader({ error }))
//     }
//   }, [dispatch, loading, error])



//   if (userInfo === null) {
//     return (
//       <div className={type === "home" ? "container__calendar" : "container__screen--sidebar"} >
//         <PleaseLoginScreen />
//       </div>
//     )
//   } else {
//     return (
//       <div className="calendar">
//         <BtnsLeftRightCalendar date={date} day={day} month={month} year={year} setDate={setDate} setMonth={setMonth} setYear={setYear} getCalendarDays={getCalendarDays} />
//         <CalendarRowOfDays />
//         <ul className="calendar__row--numDays">
//           {calendarDays.map((numDay) => {
//             const dayKey = uuid();

//             if (numDay.month !== month) {
//               if (numDay.appts.length !== 0) {
//                 return (
//                   <li
//                     className="calendar__row--element-with-appts"
//                     style={{ color: "var(grey-5)" }}
//                     key={dayKey}
//                   >
//                     <div
//                       style={{
//                         display: "block",
//                         color: "var(--grey-5)",
//                         alignSelf: "flex-end",
//                       }}
//                     >
//                       {numDay.num}
//                     </div>
//                     <br />
//                     <div
//                       className="calendar__row--appt"
//                       style={{
//                         color: "var(--old-blue-2)",
//                         // paddingLeft: "0.5rem",
//                         //   alignSelf: 'flex-end'
//                       }}
//                     >
//                       {numDay.appts.map((appt) => {
//                         return (
//                           <div key={appt._id}>
//                             <span className="calendar__element--subject">{appt.subject}:</span> <br /> {AMPMTime(appt.startTime)} - {AMPMTime(appt.endTime)} 
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </li>
//                 );
//               } else
//                 return (
//                   <li
//                     key={numDay.num}
//                     className="calendar__row--element"
//                     style={{ color: "var(--grey-5)" }}
//                   >
//                     {numDay.num}
//                   </li>
//                 );
//             } else if (
//               numDay.num === day &&
//               numDay.month === months[new Date().getMonth()] &&
//               numDay.year === year
//             ) {
//               if (numDay.appts.length !== 0) {
//                 return (
//                   <li
//                     className="calendar__row--element-with-appts"
//                     style={{ color: "var(--old-blue-2)" }}
//                     key={uuid()}
//                   >
//                     <div
//                       style={{
//                         display: "block",
//                         fontWeight: "bold",
//                         alignSelf: "flex-end",
//                       }}
//                     >
//                       {numDay.num}
//                     </div>
//                     <br />
//                     <div
//                       className="calendar__row--appt"
//                       style={{
//                         color: "var(--old-blue-2)",
//                         // paddingLeft: "0.5rem",
//                       }}
//                     >
//                       {numDay.appts.map((appt) => {
//                         return (
//                           <div key={appt._id}>
//                             <span className="calendar__element--subject">{appt.subject}:</span> <br /> {AMPMTime(appt.startTime)} - {AMPMTime(appt.endTime)} 
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </li>
//                 );
//               } else
//                 return (
//                   <li
//                     key={dayKey}
//                     className="calendar__row--element"
//                     style={{ color: "var(--old-blue-2)" }}
//                   >
//                     {numDay.num}
//                   </li>
//                 );
//             } else {
//               if (numDay.appts.length !== 0) {
//                 return (
//                   <li
//                     key={uuid()}
//                     className="calendar__row--element-with-appts"
//                   >
//                     <div style={{ display: "block", alignSelf: "flex-end" }}>
//                       {numDay.num}
//                     </div>
//                     <br />
//                     <div
//                       className="calendar__row--appt"
//                       style={{
//                         color: "var(--old-blue-2)",
//                         // paddingLeft: "0.5rem",
//                       }}
//                     >
//                       {numDay.appts.map((appt) => {
//                         return (
//                           <div key={uuid()}>
//                             <span className="calendar__element--subject">{appt.subject}:</span> <br /> {AMPMTime(appt.startTime)} - {AMPMTime(appt.endTime)} 
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </li>
//                 );
//               } else


//                 return (
//                   <li
//                     key={dayKey}
//                     className="calendar__row--element"
//                     style={{ color: "var(--black)" }}
//                   >
//                     {numDay.num}
//                   </li>
//                 );
//             }
//           })}
//         </ul>
//       </div>
//     );
//   }
// }

// Calendar.propTypes = {
//   type: PropTypes.string
// }