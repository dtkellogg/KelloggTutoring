import {combineReducers} from 'redux'
import authedUser from './authedUser'
import subheader from './subheader'

export default combineReducers({
    authedUser,
    subheader,
})