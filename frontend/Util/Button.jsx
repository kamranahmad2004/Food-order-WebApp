import React from 'react'

const Button = ({ children, className, cssClasses, textOnly, ...props }) => {
    className === textOnly ? cssClasses = "button" : cssClasses = "text-button"
    return (
        <button className={cssClasses} {...props}>{children}</button>
    )
}

export default Button