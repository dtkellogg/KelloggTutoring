import React from 'react'

function BookingElement({htmlFor, text, type, placeholder, style, value, onChange}) {
    return (
        <div className="booking__element" style={style}>
            <label
                className="font-size-5 letter-spacing-md booking__label"
                htmlFor={htmlFor}
            >
                {text}
            </label>
            <input
                type={type}
                className="booking__input font-size-4"
                placeholder={placeholder}
                style={style}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default BookingElement
