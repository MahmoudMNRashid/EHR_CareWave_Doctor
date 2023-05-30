import React from 'react'
import classes from './Input.module.css'

export const Input = (props) => {
console.log(props.detailsInputs)
    return (
<div className={classes.inputgroup}>
  <input
  required=" "
    type={props.detailsInputs.type}
    className={classes.input}
  />
  <label className={ classes.userlabel}>{props.detailsInputs.label}</label>
</div>
    )
}


// Remeber the required
