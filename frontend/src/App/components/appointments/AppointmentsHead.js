import React from 'react'

function ApptsTableHead() {
    return (
        <thead className="thead">
            <tr className="tr">
                <th className="th appointments__th--upcoming-date">date</th>
                <th className="th appointments__th--upcoming-time">time</th>
                <th className="th appointments__th--upcoming-student">student</th>
                <th className="th appointments__th--upcoming-subject">subject</th>
                <th className="th appointments__th--upcoming-btns">paid?</th>
                <th className="th appointments__th--upcoming-btns">cancel</th>
            </tr>
        </thead>
    )
}

export default ApptsTableHead
