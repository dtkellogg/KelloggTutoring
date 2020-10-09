import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import Loading from '../components/Loading'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

export default function AdminUserEdit ({ match, history }) {
    console.log(`match: ${match}`)
    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

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

    useEffect(() => {
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
        <div className="form user__page">
            <Link to='/admin/userList' className="btn" >Go Back</Link>
            <form onSubmit={handleSubmit}>
                <div className="form__header">
                    <h2 className="text-size-2 letter-spacing-sm">
                        {/* Any Questions? */}
                        Edit User
                    </h2>

                    {/* {message && <h1>{message}</h1>} */}
                </div>
                <div className="form__content">
                    <div className="form__element">
                        <label
                            className="text-size-4 letter-spacing-md form__label"
                            for="name"
                        >
                            Name
                        </label>
                        <input
                            type="name"
                            className="form__input form__input-contact text-size-3"
                            placeholder="Your name address"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="form__element">
                        <label
                            className="text-size-4 letter-spacing-md form__label"
                            for="email"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            className="form__input form__input-contact text-size-3"
                            placeholder="Your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form__element">
                        <label className="text-size-4 letter-spacing-md form__label">
                            Is Admin
                        </label>
                        <input
                            type="text"
                            className="form__input form__input-contact text-size-3"
                            placeholder="Your Is Admin"
                            value={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.value)}
                        />
                    </div>

                    <button
                        className="btn btn__form"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Edit User
                    </button>
                </div>
            </form>
        </div>
    );
}