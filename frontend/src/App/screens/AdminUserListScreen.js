import React from "react";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaCheckSquare, FaTrash, FaTimes } from 'react-icons/fa'

// components
import Sidebar from "../components/Sidebar";

// screens
import AdminUserEdit from "./AdminUserEditScreen"

// actions
import { listUsers, deleteUser } from "../actions/userActions";
import { subheader } from "../actions/subheader";


const adminList = [ "User List", "Appointments", "Reviews", "Blog" ]



export default function AdminUserList ({ location, history }) {
	const dispatch = useDispatch()

	const { path } = useRouteMatch()


	const userList = useSelector((state) => state.userList)
	const {
		loading, 
		error, 
    users
  } = userList

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete


	React.useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listUsers())
		} else {
			// Note: come back and implement the redirect below once useHistory is defined in the right place
			history.push('/login')
		}
	}, [dispatch, history, successDelete, userInfo])

	React.useEffect(() => {
		if (loading) {
			dispatch(subheader("Loading..."));
		} else {
			dispatch(subheader(""));
		}
		if (error) {
			dispatch(subheader({ error }));
		}
  }, [dispatch, loading, error])
  

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure you want to delete this user?')) {
				dispatch(deleteUser(id))
		}
  }
  

	if(users) {
    return (
      <div className="pg__meetToshi">
        <Sidebar title="Toshi" list={adminList} />
        <div className="users">
          {/* {loading && <Loading />} */}
          <div className="text-size-2 users__header--container">
            <div
              className="text-size-2 users__header"
              style={{ marginBottom: "1rem" }}
            >
              Here are all active users:
            </div>
          </div>

          <table className="users__list text-size-3">
            <thead className="thead">
              <tr className="tr">
                <th className="users__th--name">name</th>
                <th className="users__th--email">email</th>
                <th className="users__th--edit">edit</th>
                <th className="users__th--delete">delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user._id} className="tr">
                    <td className="text-size-3 users__td--name">
                      {user.name}
                    </td>
                    <td className="text-size-3 users__td--email">
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>

                    <td className="users__td--edit">
                      <Link to={`/admin/user/${user._id}/edit`}>
                        <button className="btn__edit">Edit</button>
                      </Link>
                    </td>

                    <td className="users__td--delete">
                      <FaTrash
                        size={20}
                        color="var(--green-dark)"
                        fill="var(--red)"
                        className="social-media-icon grey-light-7"
                        type="button"
                        onClick={() => deleteHandler(user._id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  } else return null
}