import React from 'react'
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";

// actions
import { listUsers, deleteUser } from "../../actions/userActions";
import LoadingSpinner from '../loading/LoadingSpinner';

function UserList() {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  const dispatch = useDispatch();
  const history = useHistory()

  React.useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      // Note: come back and implement the redirect below once useHistory is defined in the right place
      history.push("/login");
    }
  }, [dispatch, history, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  if(!users) {
    return <LoadingSpinner />
  } else {
  return (
      <tbody className="tbody">
        {users && users.map((user) => { 
          return (
              <tr key={user._id} className="tr">
                <td className="users__td--name">
                {user.name}
                </td>
                <td className="users__td--email">
                <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>

                <td className="users__td--edit">
                <Link to={`/admin/user/${user._id}/edit`}>
                    <button className="btn__admin--edit">edit</button>
                </Link>
                </td>

                <td className="users__td--delete">
                <FaTrash
                    size={20}
                    color="var(--green-2)"
                    fill="var(--red)"
                    className="icon grey-7"
                    type="button"
                    onClick={() => deleteHandler(user._id)}
                />
                </td>
              </tr>
          );
        })}
      </tbody>
    )
  }
}

export default UserList
