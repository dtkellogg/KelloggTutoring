import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from 'react-icons/fa'

// components
import {Sidebar} from "../navigation/Sidebar";
import AdminUserList from "../users/UserList";

// actions
import { listUsers, deleteUser } from "../../actions/userActions";
import { subheader } from "../../actions/subheader";

// data
import { adminList } from "../../data/lists"



export default function AdminUsers () {
	const dispatch = useDispatch()

	// React.useEffect(() => {
	// 	if (loading) {
	// 		dispatch(subheader("Loading..."));
	// 	} else {
	// 		dispatch(subheader(""));
	// 	}
	// 	if (error) {
	// 		dispatch(subheader({ error }));
	// 	}
  // }, [dispatch, loading, error])
  
	// if(users) {
    return (
      <div className="container__toshi">
        {/* <Sidebar title="Toshi" list={adminList} /> */}
        <div className="users">
          <div className="text-size-2 users__header--container">
            <div className="text-size-2 users__header">
              All active users:
            </div>
          </div>

          <div className="admin__table--container">
            <table className="users__list text-size-3">
              <thead className="thead">
                <tr className="tr">
                  <th className="users__th--name">name</th>
                  <th className="users__th--email">email</th>
                  <th className="users__th--edit">edit</th>
                  <th className="users__th--delete">delete</th>
                </tr>
              </thead>
              
                <AdminUserList />
            </table>
          </div>
        </div>
      </div>
    )
  // } else return null
}