import React from 'react'

function PaymentsTableHead({ type }) {
    console.log(`type: ${type}`)
    return (
        <thead className="thead">
            <tr className="tr">
                <th className="appointments__th--date">date</th>
                <th className="appointments__th--time">time</th>
                <th className="appointments__th--student">price</th>
                <th className="appointments__th--subject">subject</th>
                {type === "checkout" && <th className="appointments__th--btns">remove</th>}
            </tr>
        </thead>
    )
}

export default PaymentsTableHead
