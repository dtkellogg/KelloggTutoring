import axios from 'axios'
import { CART_ADD_ITEM, CART_SAVE_PAYMENT_METHOD, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const addToCart = (id) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/appointments/${id}`)

    // console.log(`IN THE ADDTOCART ACTION`)
    // console.log(`IN THE ADDTOCART ACTION: ${data._id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            appointment: data._id,
            student: data.student,
            subject: data.subject,
            date: data.date,
            startTime: data.startTime,
            endTime: data.endTime,
            // qty,
        },
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {

    // console.log(`IN THE ADDTOCART ACTION: ${id}`)
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