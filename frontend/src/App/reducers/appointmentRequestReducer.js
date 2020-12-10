import {
    APPOINTMENT_REQUEST_CREATE_REQUEST,
    APPOINTMENT_REQUEST_CREATE_SUCCESS,
    APPOINTMENT_REQUEST_CREATE_FAIL,
    APPOINTMENT_REQUEST_CREATE_RESET,
    APPOINTMENT_REQUEST_LIST_REQUEST,
    APPOINTMENT_REQUEST_LIST_SUCCESS,
    APPOINTMENT_REQUEST_LIST_FAIL,
    APPOINTMENT_REQUEST_DETAILS_REQUEST,
    APPOINTMENT_REQUEST_DETAILS_SUCCESS,
    APPOINTMENT_REQUEST_DETAILS_FAIL,
    APPOINTMENT_REQUEST_DELETE_REQUEST,
    APPOINTMENT_REQUEST_DELETE_SUCCESS,
    APPOINTMENT_REQUEST_DELETE_FAIL,
} from '../constants/appointmentRequestConstants'

export const appointmentRequestCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case APPOINTMENT_REQUEST_CREATE_REQUEST:
            return { loading: true }
        case APPOINTMENT_REQUEST_CREATE_SUCCESS:
            return { loading: false, success: true, appointment: action.payload }
        case APPOINTMENT_REQUEST_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case APPOINTMENT_REQUEST_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const appointmentRequestListReducer = (
    state = { appointmentRequests: [] },
    action
) => {
    switch (action.type) {
        case APPOINTMENT_REQUEST_LIST_REQUEST:
            return { loading: true, appointmentRequests: [] };

        case APPOINTMENT_REQUEST_LIST_SUCCESS:
            return { loading: false, appointmentRequests: action.payload };

        case APPOINTMENT_REQUEST_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const appointmentRequestDetailsReducer = (
    state = { appointmentRequest: {} },
    action
) => {
    switch (action.type) {
        case APPOINTMENT_REQUEST_DETAILS_REQUEST:
            return { ...state, loading: true };

        case APPOINTMENT_REQUEST_DETAILS_SUCCESS:
            return { loading: false, appointmentRequest: action.payload };

        case APPOINTMENT_REQUEST_DETAILS_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};

export const appointmentRequestDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case APPOINTMENT_REQUEST_DELETE_REQUEST:
            return { loading: true };

        case APPOINTMENT_REQUEST_DELETE_SUCCESS:
            return { loading: false, success: true };

        case APPOINTMENT_REQUEST_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
