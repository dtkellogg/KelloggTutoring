import React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// actions
import { subheader } from "../../actions/subheader";
import { getUserDetails, updateUser } from '../../actions/userActions'

// constants
import { USER_UPDATE_RESET } from '../../constants/userConstants'

// components
import {Sidebar} from "../navigation/Sidebar";



import { adminList } from "../../data/lists"


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
			{/* <Sidebar title="Toshi" list={adminList} /> */}
			<form onSubmit={handleSubmit} className="userEditScreen user__page">
			<Link to='/admin/users' className="btn__user-edit" >Go Back</Link>
				<div className="userEditScreen__header">
					<h2 className="font-size-2 letter-spacing-sm">
							Edit User
					</h2>
				</div>

				<div className="userEditScreen__content">
					<div className="userEditScreen__element--container">
						<div className="userEditScreen__element">
							<label
								className="font-size-4 letter-spacing-md userEditScreen__label"
								for="name"
							>
								name
							</label>
							<input
								type="text"
								className="userEditScreen__input userEditScreen__input-contact font-size-3"
								placeholder="Your name address"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>

						<div className="userEditScreen__element">
							<label
								className="font-size-4 letter-spacing-md userEditScreen__label"
								for="email"
							>
								email
							</label>
							<input
								type="email"
								className="userEditScreen__input userEditScreen__input-contact font-size-3"
								placeholder="Your email address"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>

						<div className="userEditScreen__element">
							<label className="font-size-4 letter-spacing-md userEditScreen__label">
								Is Admin
							</label>
							<input
								type="radio"
								checked={isAdmin}
								className="userEditScreen__input userEditScreen__input-contact font-size-3"
								placeholder="Admin?"
								value={isAdmin}
								onChange={(isAdmin) => setIsAdmin(!isAdmin)}
							/>
						</div>
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