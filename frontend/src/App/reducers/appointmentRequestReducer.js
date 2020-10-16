import {
    APPOINTMENT_REQUEST_REQUEST,
    APPOINTMENT_REQUEST_SUCCESS,
    APPOINTMENT_REQUEST_FAIL,
    APPOINTMENT_REQUEST_RESET
} from '../constants/appointmentConstants'

export const appointmentRequestCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case APPOINTMENT_REQUEST_REQUEST:
            return { loading: true }
        case APPOINTMENT_REQUEST_SUCCESS:
            return { loading: false, success: true, appointment: action.payload }
        case APPOINTMENT_REQUEST_FAIL:
            return { loading: false, error: action.payload }
        case APPOINTMENT_REQUEST_RESET:
            return {}
        default:
            return state
    }
}