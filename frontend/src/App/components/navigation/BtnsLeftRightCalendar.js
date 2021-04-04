import React from 'react'
import { FaCaretRight, FaCaretLeft } from "react-icons/fa";

function BtnsLeftRightCalendar({ date, day, month, year, setDate, setDay, setMonth, setYear, getCalendarDays }) {

    const days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"]
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    
    const handleBackwards = async (month) => {
        
        let previousMonth
        let newDate 

        // console.log(`month: ${month}`)
        // console.log(`months.indexOf(month): ${months.indexOf(month)}`)
        
        if (months.indexOf(month) > 0) {
            previousMonth = await months[months.indexOf(month) - 1]
            newDate = await new Date(year + "-" + previousMonth + day)
            
            // console.log(`previousMonth: ${previousMonth}`)
            setMonth(previousMonth)
            setDate(newDate)
            setDay(day)
            setYear(year)
            getCalendarDays(date)

        } else {
            previousMonth = months[11]
            newDate = await new Date(`${year - 1}-${previousMonth} ${day}`)

            setMonth(previousMonth)
            setDate(newDate)
            setYear((year) => year - 1)
            setDay(day)
            getCalendarDays(date)
        }
    }
        // if (months.indexOf(month) > 0) {

        //     let indexOfCurrentMonth = months.indexOf(month)
        //     let indexOfPreviousMonth = indexOfCurrentMonth - 1


        //     date.setMonth(indexOfPreviousMonth)

        //     let newMonth = months[months.indexOf(month) - 1]

        //     if ((newMonth) === 1) {
        //         newMonth = months[12]
        //     }

        //     setDate(date)
        //     setMonth(newMonth)
        //     getCalendarDays(date)

        // } else {
        //     let indexOfLastMonth = 11
        //     date.setMonth(indexOfLastMonth)

        //     let newMonth = months[11]

        //     setYear((year) => year - 1)

        //     setMonth(newMonth)
        //     setDate(date)
        //     getCalendarDays(date)
        // }
    // }

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


    return (
        <div className="calendar__row--header font-size-2">
            <FaCaretLeft
                size={30}
                fill="var(--old-blue-2)"
                className="btn__calendar"
                onClick={() => handleBackwards(month)}
            />
            <div className="header__calendar">{`${month} ${day}, ${year}`}</div>
            <FaCaretRight
                size={30}
                fill="var(--old-blue-2)"
                className="btn__calendar"
                onClick={() => handleForwards()}
            />
        </div>
    )
}

export default BtnsLeftRightCalendar
