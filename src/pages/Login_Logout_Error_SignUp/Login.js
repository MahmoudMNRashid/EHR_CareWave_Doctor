import React from 'react'
import classes from './Login.module.css'
import { LoginForm } from '../../components/SignIn_SignUp/LoginForm'
import { ToastContainer } from 'react-toastify'
import { Helmet } from 'react-helmet'

export const Login = () => {

    return (
        <div className={`${classes.w_h} ${classes.center}`}>

            <Helmet><title>تسجيل الدخول</title></Helmet>
           <LoginForm/>
           <ToastContainer/>
        </div>
    )
}
