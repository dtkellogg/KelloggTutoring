import React from 'react'

const days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"]


function CalendarRowOfDays() {
    return (
        <ul className="calendar__row--days">
            {days.map((day) => (
                <li key={day} className="calendar__row--day">
                    {day}
                </li>
            ))}
        </ul>
    )
}

export default CalendarRowOfDays
