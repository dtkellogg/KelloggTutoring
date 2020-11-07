import { 
    PAYMENT_CREATE_REQUEST, 
    PAYMENT_CREATE_SUCCESS, 
    PAYMENT_CREATE_FAIL, 
    PAYMENT_DETAILS_REQUEST, 
    PAYMENT_DETAILS_SUCCESS, 
    PAYMENT_DETAILS_FAIL, 
    PAYMENT_PAY_REQUEST, 
    PAYMENT_PAY_SUCCESS, 
    PAYMENT_PAY_FAIL, 
    PAYMENT_PAY_RESET, 
    PAYMENT_LIST_MY_REQUEST, 
    PAYMENT_LIST_MY_SUCCESS, 
    PAYMENT_LIST_MY_FAIL, 
    PAYMENT_LIST_MY_RESET, 
    PAYMENT_LIST_REQUEST, 
    PAYMENT_LIST_SUCCESS, 
    PAYMENT_LIST_FAIL, 
    // CART_ADD_ITEM, 
    // CART_REMOVE_ITEM, 
    // CART_SAVE_PAYMENT_METHOD 
} from '../constants/paymentConstants.js'


export const paymentCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PAYMENT_CREATE_REQUEST:
            return {
                loading: true,
            }
        case PAYMENT_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                payment: action.payload,
            }
        case PAYMENT_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

export const paymentDetailsReducer = (
    state = { loading: true, paymentItems: [],
        //  shippingAddress: {} 
        },
    action
) => {
    switch (action.type) {
        case PAYMENT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case PAYMENT_DETAILS_SUCCESS:
            return {
                loading: false,
                payment: action.payload,
            }
        case PAYMENT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

export const paymentPayReducer = (state = {}, action) => {
    switch (action.type) {
        case PAYMENT_PAY_REQUEST:
            return {
                loading: true,
            }
        case PAYMENT_PAY_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case PAYMENT_PAY_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case PAYMENT_PAY_RESET:
            return {}
        default:
            return state
    }
}

export const paymentListMyReducer = (state = { payments: [] }, action) => {
    switch (action.type) {
        case PAYMENT_LIST_MY_REQUEST:
            return {
                loading: true,
            }
        case PAYMENT_LIST_MY_SUCCESS:
            return {
                loading: false,
                payments: action.payload,
            }
        case PAYMENT_LIST_MY_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case PAYMENT_LIST_MY_RESET:
            return { payments: [] }
        default:
            return state
    }
}

export const paymentListReducer = (state = { payments: [] }, action) => {
    switch (action.type) {
        case PAYMENT_LIST_REQUEST:
            return {
                loading: true,
            }
        case PAYMENT_LIST_SUCCESS:
            return {
                loading: false,
                payments: action.payload,
            }
        case PAYMENT_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}