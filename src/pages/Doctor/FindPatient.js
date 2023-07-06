import React from 'react'

import classes from '../Login_Logout_Error_SignUp/Login.module.css'

import { FindPatientForm } from '../../components/Doctor/Section_SearchAboutPatient/FindPatient/FindPatientForm'
import { Helmet } from 'react-helmet'

export const FindPatient = () => {
    return (
        <div className={`${classes.w_h} ${classes.center}`}>
            <Helmet>
<title>البحث عن مريض</title>

            </Helmet>
            <FindPatientForm />
        </div>




    )
}
