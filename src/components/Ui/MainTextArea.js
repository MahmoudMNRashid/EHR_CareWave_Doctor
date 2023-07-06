import React from 'react'
import classes from './MainTextArea.module.css'
export const MainTextArea = (props) => {
    return (
        <div className={classes.inputgroup}>
            <textarea
                required
                className={`${classes.input}  ${props.isInvalid ? classes.invalid : ''}`
                }
                onBlur={props.onBlur}
                onChange={props.onChange}
                value={props.value}
            >
            </textarea>
            <label className={classes.userlabel}>{props.label}</label>
        </div>
    )
}
