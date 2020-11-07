import axios from 'axios'
import {
    // CART_ADD_ITEM,
    // CART_REMOVE_ITEM,
    // CART_SAVE_PAYMENT_METHOD,
    PAYMENT_CREATE_REQUEST,
    PAYMENT_CREATE_SUCCESS,
    PAYMENT_CREATE_FAIL,
    PAYMENT_DETAILS_REQUEST,
    PAYMENT_DETAILS_SUCCESS,
    PAYMENT_DETAILS_FAIL,
    PAYMENT_PAY_REQUEST,
    PAYMENT_PAY_SUCCESS,
    PAYMENT_PAY_FAIL,
    PAYMENT_LIST_MY_REQUEST,
    PAYMENT_LIST_MY_SUCCESS,
    PAYMENT_LIST_MY_FAIL,
    PAYMENT_LIST_REQUEST,
    PAYMENT_LIST_SUCCESS,
    PAYMENT_LIST_FAIL,
} from '../constants/paymentConstants'
import { logout } from './userActions'

export const createPayment = (payment) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PAYMENT_CREATE_REQUEST,
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

        const { data } = await axios.post(`/api/payments`, payment, config)

        dispatch({
            type: PAYMENT_CREATE_SUCCESS,
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
            type: PAYMENT_CREATE_FAIL,
            payload: message,
        })
    }
}

export const getPaymentDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PAYMENT_DETAILS_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`/api/payments/${id}`, config)

        dispatch({
            type: PAYMENT_DETAILS_SUCCESS,
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
            type: PAYMENT_DETAILS_FAIL,
            payload: message,
        })
    }
}

export const payPayment = (paymentId, paymentResult) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({
            type: PAYMENT_PAY_REQUEST,
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
            `/api/payments/${paymentId}/pay`,
            paymentResult,
            config
        )

        dispatch({
            type: PAYMENT_PAY_SUCCESS,
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
            type: PAYMENT_PAY_FAIL,
            payload: message,
        })
    }
}

export const listMyPayments = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PAYMENT_LIST_MY_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`/api/payments/mypayments`, config)

        dispatch({
            type: PAYMENT_LIST_MY_SUCCESS,
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
            type: PAYMENT_LIST_MY_FAIL,
            payload: message,
        })
    }
}

export const listPayments = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PAYMENT_LIST_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`/api/payments`, config)

        dispatch({
            type: PAYMENT_LIST_SUCCESS,
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
            type: PAYMENT_LIST_FAIL,
            payload: message,
        })
    }
}