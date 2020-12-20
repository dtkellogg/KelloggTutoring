import axios from 'axios'
import {
    APPOINTMENT_REQUEST_LIST_REQUEST,
    APPOINTMENT_REQUEST_LIST_SUCCESS,
    APPOINTMENT_REQUEST_LIST_FAIL,
    APPOINTMENT_REQUEST_DETAILS_REQUEST,
    APPOINTMENT_REQUEST_DETAILS_SUCCESS,
    APPOINTMENT_REQUEST_DETAILS_FAIL,
    APPOINTMENT_REQUEST_DELETE_REQUEST,
    APPOINTMENT_REQUEST_DELETE_SUCCESS,
    APPOINTMENT_REQUEST_DELETE_FAIL,
    APPOINTMENT_REQUEST_CREATE_REQUEST,
    APPOINTMENT_REQUEST_CREATE_SUCCESS,
    APPOINTMENT_REQUEST_CREATE_FAIL,
} from "../constants/appointmentRequestConstants";

export const createAppointmentRequest = (
    name,
    relation,
    msg,
    date,
    approved,
    user
) => async (dispatch, getState) => {
    try {
        dispatch({
            type: APPOINTMENT_REQUEST_CREATE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(
            `/api/appointmentrequest`,
            { name, relation, date, msg, approved, user },
            config
        );

        dispatch({
            type: APPOINTMENT_REQUEST_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            //   dispatch(logout());
        }
        dispatch({
            type: APPOINTMENT_REQUEST_CREATE_FAIL,
            payload: message,
        });
    }
};

export const listAppointmentRequests = () => async (dispatch) => {
    try {
        dispatch({ type: APPOINTMENT_REQUEST_LIST_REQUEST });

        const { data } = await axios.get("/api/appointmentrequests");

        dispatch({
            type: APPOINTMENT_REQUEST_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: APPOINTMENT_REQUEST_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getAppointmentRequestDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: APPOINTMENT_REQUEST_DETAILS_REQUEST,
        });

        // Note: destructuring twice
        const { userLogin: { userInfo }, } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/appointmentrequest/${id}`, config);

        dispatch({
            type: APPOINTMENT_REQUEST_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: APPOINTMENT_REQUEST_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteAppointmentRequest = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: APPOINTMENT_REQUEST_DELETE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`/api/appointmentrequest/${id}`, config);

        dispatch({
            type: APPOINTMENT_REQUEST_DELETE_SUCCESS,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            //   dispatch(logout());
        }
        dispatch({
            type: APPOINTMENT_REQUEST_DELETE_FAIL,
            payload: message,
        });
    }
};

