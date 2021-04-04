import React from "react";

// components
import AdminUserList from "../users/UserList";


export default function AdminUsers () {

  return (
    <div className="container__screen--sidebar">
      <div className="container__admin">
        <div className="font-size-2 users__header--container">
          <div className="font-size-2 users__header">
            All active users:
          </div>
        </div>

        <div className="admin__table--container">
          <table className="users__list font-size-3">
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
  
}