import React from 'react'
import { SearchForm } from '../../components/Doctor/SearchForm'
import classes from '../../components/Doctor/SearchForm.module.css'
export const FindPatient = () => {
    return (

        <div className={ classes.wrapper}>
            <div className={classes.text}>
                <p>
                    Lorem ipsum odor amet, consectetuer adipiscing elit.
                    Non diam platea netus cras pretium elementum congue quisque.
                    Facilisis lorem sagittis neque lacinia; nec
                    Facilisis lorem sagittis neque lacinia; nec
                    Facilisis lorem sagittis neque lacinia; nec
                </p>
            </div>
            <SearchForm />
        </div>
    )
}
