import axios from 'axios';
import {
  APPOINTMENT_LIST_REQUEST,
  APPOINTMENT_LIST_SUCCESS,
  APPOINTMENT_LIST_FAIL,
  APPOINTMENT_DELETE_SUCCESS,
  APPOINTMENT_DELETE_FAIL,
  APPOINTMENT_UPDATE_FAIL,
  APPOINTMENT_UPDATE_SUCCESS,
  APPOINTMENT_UPDATE_REQUEST,
  APPOINTMENT_CREATE_FAIL,
  APPOINTMENT_CREATE_SUCCESS,
  APPOINTMENT_CREATE_REQUEST,
  APPOINTMENT_DELETE_REQUEST,
  APPOINTMENT_DETAILS_SUCCESS,
  APPOINTMENT_DETAILS_FAIL,
  APPOINTMENT_DETAILS_REQUEST,
	APPOINTMENT_REQUEST_REQUEST,
	APPOINTMENT_REQUEST_SUCCESS,
	APPOINTMENT_REQUEST_FAIL,
} from "../constants/appointmentConstants";
import { logout } from './userActions'

export const listAppointments = () => async (dispatch) => {
	try {
		dispatch({ type: APPOINTMENT_LIST_REQUEST })

		const { data } = await axios.get("/api/appointments")

		dispatch({ 
				type: APPOINTMENT_LIST_SUCCESS,
				payload: data
		})
	} catch (error) {
		dispatch({
			type: APPOINTMENT_LIST_FAIL,
			payload: 
				error.response && error.response.data.message 
					? error.response.data.message 
					: error.message
		})
	}
}

export const getAppointmentDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: APPOINTMENT_DETAILS_REQUEST,
		})

		// Note: destructuring twice
		const { userLogin: { userInfo } } = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`
			},
		};

		const { data } = await axios.get(
			`/api/appointments/${id}`,
			config
		);

		dispatch({
			type: APPOINTMENT_DETAILS_SUCCESS,
			payload: data,
		});

	} catch (error) {
		
		dispatch({
			type: APPOINTMENT_DETAILS_FAIL,
			payload:
					error.response && error.response.data.message
							? error.response.data.message
							: error.message,
		});
	}
};

export const deleteAppointment = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: APPOINTMENT_DELETE_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
					Authorization: `Bearer ${userInfo.token}`,
			},
		}

		await axios.delete(`/api/appointments/${id}`, config)

		dispatch({
			type: APPOINTMENT_DELETE_SUCCESS,
		})

	} catch (error) {

		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message

		if (message === 'Not authorized, token failed') {
			dispatch(logout())
		}

		dispatch({
			type: APPOINTMENT_DELETE_FAIL,
			payload: message,
		})
	}
}

export const createAppointment = (subject, student, date, startTime, endTime, paid, user) => async (dispatch, getState) => {
	try {
		console.log(startTime)
		dispatch({
				type: APPOINTMENT_CREATE_REQUEST,
		})

		const {
				userLogin: { userInfo },
		} = getState()

		const config = {
				headers: {
						Authorization: `Bearer ${userInfo.token}`,
				},
		}

		const { data } = await axios.post(`/api/appointments`, { subject, student, date, startTime, endTime, paid, user }, config)

		console.log(data.startTime)

		dispatch({
				type: APPOINTMENT_CREATE_SUCCESS,
				payload: data,
		})
	} catch (error) {
		const message =
				error.response && error.response.data.message
						? error.response.data.message
						: error.message
		if (message === 'Not authorized, token failed') {
				dispatch(logout())
		}
		dispatch({
				type: APPOINTMENT_CREATE_FAIL,
				payload: message,
		})
	}
}

export const requestAppointment = (subject, student, date, startTime, endTime, paid, user) => async (dispatch, getState) => {
	try {
		dispatch({
			type: APPOINTMENT_REQUEST_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.post(`/api/appointmentRequests`, { subject, student, date, startTime, endTime, paid, user }, config)

		dispatch({
			type: APPOINTMENT_REQUEST_SUCCESS,
			payload: data,
		})
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if (message === 'Not authorized, token failed') {
			dispatch(logout())
		}
		dispatch({
			type: APPOINTMENT_REQUEST_FAIL,
			payload: message,
		})
	}
}

export const updateAppointment = (appointment) => async (dispatch, getState) => {
	try {
		dispatch({
				type: APPOINTMENT_UPDATE_REQUEST,
		})

		const {
				userLogin: { userInfo },
		} = getState()

		const config = {
				headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${userInfo.token}`,
				},
		}

		const { data } = await axios.put(
				`/api/appointments/${appointment._id}`,
				appointment,
				config
		)

		dispatch({
				type: APPOINTMENT_UPDATE_SUCCESS,
				payload: data,
		})
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message

		if (message === 'Not authorized, token failed') {
			dispatch(logout())
		}

		dispatch({
			type: APPOINTMENT_UPDATE_FAIL,
			payload: message,
		})
	}
}