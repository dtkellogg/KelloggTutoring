import axios from 'axios';
import {
  APPOINTMENT_LIST_REQUEST,
  APPOINTMENT_LIST_SUCCESS,
  APPOINTMENT_LIST_FAIL,
} from "../constants/appointmentConstants";

export const listAppointments = () => async (dispatch) => {
    try {
        dispatch({ type: APPOINTMENT_LIST_REQUEST })

        const { data }= await axios.get("/api/appointments")

        dispatch({ 
            type: APPOINTMENT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        console.log(`error.response: ${error.response}`)
        console.log(`error.response.data.message: ${error.response.data.message}`)
        dispatch({
            type: APPOINTMENT_LIST_FAIL,
            payload: 
                error.response && error.response.data.message 
                    ? error.response.data.message 
                    : error.message
        })
    }
}