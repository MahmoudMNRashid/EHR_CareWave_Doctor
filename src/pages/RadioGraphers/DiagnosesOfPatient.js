import React from 'react'
import classes from '../Login_Logout_Error_SignUp/Login.module.css'
import { FindPatientForm } from '../../components/Doctor/Section_SearchAboutPatient/FindPatient/FindPatientForm'
export const DiagnosesOfPatient = () => {
  return (
    <div className={`${classes.w_h} ${classes.center}`}>
            <FindPatientForm />
        </div>
  )
}
