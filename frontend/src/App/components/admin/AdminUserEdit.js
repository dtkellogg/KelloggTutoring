import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// components
import Input from "../Input"

// actions
import { subheader } from "../../actions/subheader";
import { getUserDetails, updateUser } from '../../actions/userActions'

// constants
import { USER_UPDATE_RESET } from '../../constants/userConstants'


export default function AdminUserEdit ({ match }) {
	const userId = match.params.id
	const history = useHistory()

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [isAdmin, setIsAdmin] = useState(false)

	const dispatch = useDispatch()

	const userDetails = useSelector((state) => state.userDetails)
	const { 
		loading, 
		error, 
		user } = userDetails

	const userUpdate = useSelector((state) => state.userUpdate)
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = userUpdate



	useEffect(() => {
		if (loading || loadingUpdate) {
			dispatch(subheader("Loading..."));
		} else {
			dispatch(subheader(""));
		}
		
		if (error || errorUpdate) {
			dispatch(subheader({ error }));
		}

		if (successUpdate) {
			dispatch({ type: USER_UPDATE_RESET })
			history.push('/admin/users')
		} else {
			if (!user.name || user._id !== userId) {
				dispatch(getUserDetails(userId))
			} else {
				setName(user.name)
				setEmail(user.email)
				setIsAdmin(user.isAdmin)
			}
		}
	}, [dispatch, loading, error, loadingUpdate, errorUpdate, history, userId, user, successUpdate])



	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(updateUser({ _id: userId, name, email, isAdmin }))
	}

	return (
		<div className="toshi">
			<form onSubmit={handleSubmit} className="container__admin--edit-user">

				<Link to='/admin/users' className="btn__admin--user-edit">Go Back</Link>

				<h2 className="header__admin--edit-user">Edit User</h2>

				<div className="user-edit__content">
					<div className="container__user-edit--element">
						<Input containerClass="user-edit__element" labelClass="user-edit__label" inputClass="user-edit__input user-edit__input-contact"
							htmlFor="" label="name" type="name" value={name} placeholder="name" onChange={(e) => setName(e.target.value)}
						/>
						<Input containerClass="user-edit__element" labelClass="user-edit__label" inputClass="user-edit__input user-edit__input-contact"
							htmlFor="email" label="email" type="email" value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)}
						/>
						<Input containerClass="user-edit__element" labelClass="user-edit__label" inputClass="user-edit__input user-edit__input-contact"
							htmlFor="" label="admin?" type="radio" value={isAdmin} placeholder="Admin?" onChange={(isAdmin) => setIsAdmin(!isAdmin)}
						/>
					</div>

					<button
						className="btn__edit-user"
						type="submit"
						onClick={handleSubmit}
					>
						Submit changes
					</button>
				</div>
			</form>
		</div>
	)
}