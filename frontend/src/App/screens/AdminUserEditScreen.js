import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import Loading from '../components/Loading'
import { subheader } from "../actions/subheader";
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

export default function AdminUserEdit ({ match, history, location }) {
    console.log(`match: ${match}`)
    const userId = match.params.id

    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [isAdmin, setIsAdmin] = React.useState(false)

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { 
        // loading, 
        // error, 
        user } = userDetails

    const userUpdate = useSelector((state) => state.userUpdate)
    const {
        // loading: loadingUpdate,
        // error: errorUpdate,
        success: successUpdate,
    } = userUpdate

    React.useEffect(() => {
        dispatch(subheader("Admin"));
    }, [location, dispatch]);

    React.useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/admin/userlist')
        } else {
            if (!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [dispatch, history, userId, user, successUpdate])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: userId, name, email, isAdmin }))
    }

    return (
        <React.Fragment>
            <Link to='/admin/userList' className="btn" >Go Back</Link>
            <form onSubmit={handleSubmit} className="userEditScreen user__page">
                <div className="userEditScreen__header">
                    <h2 className="text-size-2 letter-spacing-sm">
                        {/* Any Questions? */}
                        Edit User
                    </h2>

                    {/* {message && <h1>{message}</h1>} */}
                </div>
                <div className="userEditScreen__content">
                    <div className="userEditScreen__element">
                        <label
                            className="text-size-4 letter-spacing-md userEditScreen__label"
                            for="name"
                        >
                            name
                        </label>
                        <input
                            type="text"
                            className="userEditScreen__input userEditScreen__input-contact text-size-3"
                            placeholder="Your name address"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="userEditScreen__element">
                        <label
                            className="text-size-4 letter-spacing-md userEditScreen__label"
                            for="email"
                        >
                            email
                        </label>
                        <input
                            type="email"
                            className="userEditScreen__input userEditScreen__input-contact text-size-3"
                            placeholder="Your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="userEditScreen__element">
                        <label className="text-size-4 letter-spacing-md userEditScreen__label">
                            Is Admin
                        </label>
                        <input
                            type="radio"
                            checked={isAdmin}
                            className="userEditScreen__input userEditScreen__input-contact text-size-3"
                            placeholder="Admin?"
                            value={isAdmin}
                            onChange={(isAdmin) => setIsAdmin(!isAdmin)}
                        />
                    </div>

                    <button
                        className="btn btn__userEditScreen"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Submit changes
                    </button>
                </div>
            </form>
        </React.Fragment>
    );
}