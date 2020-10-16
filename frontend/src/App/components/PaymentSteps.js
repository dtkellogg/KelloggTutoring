import React from 'react'
import { NavLink } from 'react-router-dom'

const CheckoutSteps = ({ step1, step2, step3 }) => {
    return (
        <ul className='nav'>
            <li>
                {step1 ? (
                    <NavLink
                        to="/login"
                        activeStyle={activeStyle}
                        className="nav__link text-size-5 letter-spacing-sm"
                    >Sign In</NavLink>
                ) : (
                        <Nav.Link disabled>Sign In</Nav.Link>
                    )}
            </li>

            <li>
                {step2 ? (
                    <NavLink
                        to="/payment"
                        activeStyle={activeStyle}
                        className="nav__link text-size-5 letter-spacing-sm"
                    >Sign In</NavLink>
                ) : (
                        <Nav.Link disabled>Payment</Nav.Link>
                    )}
            </li>

            <li>
                {step3 ? (
                    <NavLink
                        to="/login"
                        activeStyle={activeStyle}
                        className="nav__link text-size-5 letter-spacing-sm"
                    >Sign In</NavLink>
                ) : (
                        <Nav.Link disabled></Nav.Link>
                    )}
            </li>
        </ul>
    )
}

export default CheckoutSteps