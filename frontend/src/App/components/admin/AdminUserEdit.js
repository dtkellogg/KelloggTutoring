import React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
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
	const location = useLocation()

	const [name, setName] = React.useState('')
	const [email, setEmail] = React.useState('')
	const [isAdmin, setIsAdmin] = React.useState(false)

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



	React.useEffect(() => {
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
			<form onSubmit={handleSubmit} className="userEditScreen user__page">

				<Link to='/admin/users' className="btn__user-edit">Go Back</Link>

				<h2 className="header__userEditScreen">Edit User</h2>

				<div className="userEditScreen__content">
					<div className="userEditScreen__element--container">
						<Input containerClass="userEditScreen__element" labelClass="userEditScreen__label" inputClass="userEditScreen__input userEditScreen__input-contact"
							htmlFor="" label="name" type="name" value={name} placeholder="name" onChange={(e) => setName(e.target.value)}
						/>
						<Input containerClass="userEditScreen__element" labelClass="userEditScreen__label" inputClass="userEditScreen__input userEditScreen__input-contact"
							htmlFor="email" label="email" type="email" value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)}
						/>
						<Input containerClass="userEditScreen__element" labelClass="userEditScreen__label" inputClass="userEditScreen__input userEditScreen__input-contact"
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