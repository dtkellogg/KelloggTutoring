import axios from 'axios'
import { CART_ADD_ITEM, CART_SAVE_PAYMENT_METHOD, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/appointments/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            appointment: data._id,
            student: data.student,
            subject: data.subject,
            date: data.date,
            // price: data.price,
            // countInStock: data.countInStock,
            // qty,
        },
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}