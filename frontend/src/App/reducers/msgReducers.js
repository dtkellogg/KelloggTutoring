import { MESSAGE_CREATE_REQUEST, MESSAGE_CREATE_SUCCESS, MESSAGE_CREATE_FAIL } from "../constants/msgConstants";

export const messageCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case MESSAGE_CREATE_REQUEST:
            return { loading: true };
        case MESSAGE_CREATE_SUCCESS:
            return { loading: false, success: true, message: action.payload };
        case MESSAGE_CREATE_FAIL:
            return { loading: false, error: action.payload };
        // case MESSAGE_CREATE_RESET:
        //   return {};
        default:
            return state;
    }
};