import React from 'react'
import classes from './Login.module.css'
import { SignUpForm } from '../../components/SignIn_SignUp/SignUpForm'
import { Helmet } from 'react-helmet'
export const SignUpPage = () => {
  return (
    <div className={`${classes.w_h} ${classes.center}`}>
      <Helmet><title>التسجيل</title></Helmet>
     <SignUpForm/>
        </div>
  )
}
