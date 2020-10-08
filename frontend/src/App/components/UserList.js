import React from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading"
import { useDispatch, useSelector } from "react-redux";
import { listUsers, deleteUser } from "../actions/userActions";
import { 
    // FaCheck,
    //  FaTrash
    } from 'react-icons'

const UserList = ({ history }) => {
  const dispatch = useDispatch()

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin


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

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id))
    }
  }

  return (
      <div>
          <h1 className="text-size-1">Users</h1>
          {/* {loading && <Loading />} */}
          <div className="user-list">
                <ul className="appointments__list text-size-3">
                  {users.map((user) => {
                      return (
                          // <li key={user._id}>{user.subject}</li>
                          <li key={user._id} className="appointments__list--item">
                                <div>{user._id}</div>
                                <div>{user.name}</div>
                                <div><a href={`mailto:${user.email}`}>{user.email}</a></div>

                                {/* {user.isAdmin ? (
                                  <i className='fas fa-check' style={{ color: 'green' }}></i>
                                ) : (
                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                  )} */}

                                <div className="btns-container__appointments">
                                <Link to={`/admin/user/${user._id}/edit`}><button className="btn__pay">Edit</button></Link>
                                <button className="btn__cancel" onClick={() => deleteHandler(user._id)}>Delete</button>
                                </div>
                          </li>
                      );
                  })}
              </ul>
          </div>
          
      </div>

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
  )
}

export default UserList


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