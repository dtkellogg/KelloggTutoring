import React from "react";
import { Link,Switch, Route, useRouteMatch } from "react-router-dom";
import AdminUserEdit from "./AdminUserEditScreen"
import { useDispatch, useSelector } from "react-redux";
import { listUsers, deleteUser } from "../actions/userActions";
import {
	FaCheckSquare,
	FaTrash,
	FaTimes
} from 'react-icons/fa'
import Sidebar from "../components/Sidebar";

import { subheader } from "../actions/subheader";


const adminList = [
	"User List",
	"Appointments",
	// "Reviews",
	// "Blog",
];

export default function AdminUserList ({ location, history }) {
	const dispatch = useDispatch()

	const { path } = useRouteMatch()

	const userList = useSelector((state) => state.userList)
	const {
		loading, 
		error, 
		users } = userList

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	// // console.log(`users: ${users}`)
	// console.log(`userInfo: ${userInfo}`)
	// console.log(`userInfo: ${userInfo}`)


	// renaming success to successDelete below
	const userDelete = useSelector((state) => state.userDelete)
	const { success: successDelete } = userDelete

	React.useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listUsers())
		} else {
			// Note: come back and implement the redirect below once useHistory is defined in the right pace
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
          <div className="text-size-2 appointments__header--container">
            <div
              className="text-size-2 appointments__header"
              style={{ marginBottom: "1rem" }}
            >
              Here are all active users:
            </div>
          </div>

          <table className="appointments__list text-size-3">
            <thead className="thead">
              <tr className="tr">
                <th className="appointments__th--upcoming-date">name</th>
                <th className="appointments__th--upcoming-time">email</th>
                <th className="appointments__th--upcoming-student">
                  appointments
                </th>
                <th className="appointments__th--upcoming-subject">admin?</th>
                <th className="appointments__th--upcoming-btns">btns</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user._id} className="tr">
                    <td className="text-size-3 appointments__td--upcoming-date">
                      {user.name}
                    </td>
                    <td className="text-size-3 appointments__td--upcoming-time">
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td className="text-size-3 appointments__td--upcoming-student">
                      ***
                    </td>

                    {user.isAdmin ? (
                      <td className="text-size-3 appointments__td--upcoming-subject">
                        <FaCheckSquare
                          size={20}
                          color="var(--green-dark)"
                          fill="var(--green-dark)"
                          className="social-media-icon grey-light-7"
                        />
                      </td>
                    ) : (
                      <td className="text-size-3 appointments__td--upcoming-subject">
                        <FaTimes
                          size={20}
                          color="var(--green-dark)"
                          fill="var(--red)"
                          className="social-media-icon grey-light-7"
                        />
                      </td>
                    )}

                    <td className="appointments__td--upcoming-btns">
                      <Link to={`/admin/user/${user._id}/edit`}>
                        <button className="btn__edit">Edit</button>
                      </Link>
                      <FaTrash
                        size={20}
                        color="var(--green-dark)"
                        fill="var(--red)"
                        className="social-media-icon grey-light-7"
                        type="button"
                        onClick={() => deleteHandler(user._id)}
                      />
                      {/* </button> */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <Switch location={location}>
            {/* <Route exact path="/" component={Loading} /> */}
            <Route exact path={`${path}/edit-user`} component={AdminUserEdit} />
            {/* <Route exact path={`${path}/delete-user`} component={UsertEdit} /> */}
          </Switch>
        </div>
      </div>
    );
  } else return null
}



// {
//     users.map(user => (
//         <div key={user._id}>
//             <div>{user._id}</div>
//             <div>{user.student}</div>
//             <div><a href={`mailto:${user.email}`}>{user.email}</a></div>
//             {/* <div>
//                     {user.isAdmin 
//                         ? (<FaCheck />)
//                         : (<FaCheck />)
//                         }
//                 </div> */}
//             <div>
//                 <button className="btn">Edit</button>
//                 <button className="btn" onClick={() => deleteHandler(user._id)}>
//                     {/* <FaTrash /> */}
//                     Delete
//                         </button>
//             </div>
//         </div>
//     ))
// }


//     <div className="appointments">
			//   <h2 className="text-size-2 appointments__header">
			//     Here are your upcoming appointments:
			//   </h2>

			//   {loading ? (
			//     <Loading />
			//   ) : error ? (
			//     <h2 className="text-size-2">{error}</h2>
			//   ) : (
			//     <ul className="appointments__list text-size-3">
			//       {users.map((user) => {
			//         console.log(`USER: ${user}`)
			//         return (
			//           // <li key={user._id}>{user.subject}</li>
			//           <li key={user.student} className="appointments__list--item">
			//               <span className="text-size-3 appointments__item--time">{user.student}</span>{' '}
			//               {/* <span className="text-size-3 appointments__item--subject">{user.subject}</span> */}
			//           </li>
			//         );
			//       })}
			//     </ul>
			//   )}
			// </div>