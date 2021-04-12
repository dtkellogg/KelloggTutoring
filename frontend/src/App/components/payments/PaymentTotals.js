import React from 'react'
import { useSelector } from "react-redux";

function PaymentTotals() {
    const cart = useSelector((state) => state.cart);

    return (
        <div className="checkout__totals">
            <div className="font-size-3">
                <strong>
                    Subtotal:
                    {" "}
                </strong>
                {cart.cartItems.length} &times; $50.00 = $
                {cart.cartItems.length * 50}.00
          </div>
            <div className="font-size-3">
                <strong className="">
                    Tax:
                    {" "}
                </strong>
                ${cart.cartItems.length * 50}.00 &times; 0.08 = $
            {cart.cartItems.length * 50 * 0.08}.00
          </div>
            <div className="font-size-3">
                <strong className="">
                    Total:
                    {" "}
                </strong>
                ${cart.cartItems.length * 50 * 0.08}.00 + $
            {cart.cartItems.length * 50}
                .00 = $
            {cart.cartItems.length * 50 * 0.08 + cart.cartItems.length * 50}.00
          </div>
        </div>
    )
}

export default PaymentTotals
