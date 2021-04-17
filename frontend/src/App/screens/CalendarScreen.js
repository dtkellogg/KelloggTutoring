import React from 'react'
import { useSelector } from 'react-redux'

// screens
import PleaseLoginScreen from "../components/PleaseLogin"

// components
import Calendar from '../components/calendar/Calendar'


function CalendarScreen() {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    if (userInfo === null) {
        return <PleaseLoginScreen />
    } else {
        return (
            <div className="container__screen--sidebar">
                <Calendar />
            </div>
        );
    }
}

export default CalendarScreen