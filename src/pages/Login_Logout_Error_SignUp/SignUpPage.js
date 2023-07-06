import React from 'react'
import classes from './Login.module.css'
import { SignUpForm } from '../../components/SignIn_SignUp/SignUpForm'
export const SignUpPage = () => {
  return (
    <div className={`${classes.w_h} ${classes.center}`}>
     <SignUpForm/>
        </div>
  )
}
