import axios from 'axios'
import { MESSAGE_CREATE_SUCCESS, MESSAGE_CREATE_FAIL, MESSAGE_CREATE_REQUEST } from '../constants/msgConstants';

export const sendMessageToNodeMailer = (
    name,
    email,
    subject,
    phone,
    message
) => async (dispatch, getState) => {
    try {
        dispatch({
            type: MESSAGE_CREATE_REQUEST,
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
            `/api/messages`,
            { name, email, subject, phone, message },
            config
        );

        dispatch({
            type: MESSAGE_CREATE_SUCCESS,
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
            type: MESSAGE_CREATE_FAIL,
            payload: message,
        });
    }
};