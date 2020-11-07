import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { appointmentListReducer, appointmentDetailsReducer,appointmentDeleteReducer, appointmentCreateReducer, appointmentUpdateReducer  } from './reducers/appointmentReducers'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer} from './reducers/userReducers'
import subheader from './reducers/subheader'
import { appointmentRequestCreateReducer } from './reducers/appointmentRequestReducer'
import { cartReducer } from './reducers/cartReducers'
import { paymentCreateReducer,
    paymentDetailsReducer,
    paymentPayReducer,
    paymentListMyReducer,
    paymentListReducer
 } from './reducers/paymentReducers'
import { 
    reviewDetailsReducer, 
    reviewUpdateReducer,
    reviewListReducer,
    reviewDeleteReducer,
    reviewCreateReducer
} from './reducers/reviewReducer'

const reducer = combineReducers({
    appointmentList: appointmentListReducer,
    appointmentDetails: appointmentDetailsReducer,
    appointmentDelete: appointmentDeleteReducer,
    appointmentCreate: appointmentCreateReducer,
    appointmentUpdate: appointmentUpdateReducer,
    appointmentRequestCreate: appointmentRequestCreateReducer,
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