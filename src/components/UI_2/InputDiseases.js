import React from 'react'
import classes from './InputDiseases.module.css'

export const InputDiseases = (props) => {
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