import React from 'react'

function Input({ containerClass, labelClass, inputClass, htmlFor, label, type, value, placeholder, onChange, pattern, textarea, id, name}) {
    return (
        <div className={containerClass} htmlFor={htmlFor}>
            <label className={labelClass}>
                {label}
            </label>
            {!textarea 
                ? <input
                    type={type}
                    className={inputClass}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    pattern={pattern}
                    id={id}
                    name={name}
                />
                : <textarea
                    type={type}
                    className={inputClass}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    pattern={pattern}
                />
                
            }

        </div>
    )
}

export default Input

Input.defaultProps = {
    textarea: false,
    pattern: "",
    htmlFor: ""
}
