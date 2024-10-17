import React from 'react'

const Input = ({label, defineType, forId, ...props}) => {
  return (
    <div className='control'>
      <label htmlFor={forId}>{label}</label>
      <input type={defineType} id={forId} {...props} required />
    </div>
  )
}

export default Input