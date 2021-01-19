// Redux
import { 
    createStore, 
    combineReducers, 
    applyMiddleware 
} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// Reducers
import { 
    appointmentListReducer, 
    appointmentDetailsReducer,
    appointmentDeleteReducer, 
    appointmentCreateReducer, 
    appointmentUpdateReducer  
} from './reducers/appointmentReducers'

import { 
    userLoginReducer, 
    userRegisterReducer, 
    userDetailsReducer, 
    userUpdateProfileReducer, 
    userListReducer, 
    userDeleteReducer, 
    userUpdateReducer
} from './reducers/userReducers'

import { 
    appointmentRequestCreateReducer, 
    appointmentRequestDeleteReducer, 
    appointmentRequestDetailsReducer, 
    appointmentRequestListReducer 
} from './reducers/appointmentRequestReducer'

import { 
    paymentDetailsReducer,
    paymentPayReducer,
    paymentListMyReducer,
    paymentListReducer,
    paymentCreateReducer
} from './reducers/paymentReducers'

import { 
    reviewDetailsReducer, 
    reviewUpdateReducer,
    reviewListReducer,
    reviewDeleteReducer,
    reviewCreateReducer
} from './reducers/reviewReducer'

import { messageCreateReducer } from './reducers/msgReducers'
import { cartReducer } from './reducers/cartReducers'
import subheader from './reducers/subheader'





// combined reducer
const reducer = combineReducers({
    appointmentList: appointmentListReducer,
    appointmentDetails: appointmentDetailsReducer,
    appointmentDelete: appointmentDeleteReducer,
    appointmentCreate: appointmentCreateReducer,
    appointmentUpdate: appointmentUpdateReducer,
    appointmentRequestCreate: appointmentRequestCreateReducer,
    appointmentRequestList: appointmentRequestListReducer,
    appointmentRequestDetails: appointmentRequestDetailsReducer,
    appointmentRequestDelete: appointmentRequestDeleteReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    cart: cartReducer,
    paymentCreate: paymentCreateReducer,
    paymentDetails: paymentDetailsReducer,
    paymentPay: paymentPayReducer,
    paymentListMy: paymentListMyReducer,
    paymentList: paymentListReducer,
    reviewList: reviewListReducer,
    reviewDetails: reviewDetailsReducer,
    reviewDelete: reviewDeleteReducer,
    reviewCreate: reviewCreateReducer,
    reviewUpdate: reviewUpdateReducer,
    messageCreate: messageCreateReducer,
    subheader
})

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const cartItemsFromStorage = localStorage.getItem("cartItems") 
    ? JSON.parse(localStorage.getItem("cartItems")) 
    : []

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
    cart: { cartItems: cartItemsFromStorage }
}

const middleware = [thunk]

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store