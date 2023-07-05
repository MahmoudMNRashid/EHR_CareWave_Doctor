import React from 'react'
import { FormPatientRegistration } from '../../components/Doctor/Section_PatientRegistration/FormPatientRegistration'
import classes from '../Login_Logout_Error_SignUp/Login.module.css'
import { Helmet } from 'react-helmet'
export const PatientRegistration = () => {
  return (
    

    <div className={`${classes.w_h} ${classes.center}`}>
      <Helmet>
        <title> تسجيل مريض</title>
      </Helmet>
    <FormPatientRegistration/>
    </div>
  )
}
