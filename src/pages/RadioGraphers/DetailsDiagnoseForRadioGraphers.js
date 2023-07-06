import React from 'react'
import { getToken, loaderForSaveRoutesWithExpForRadioGrapher } from '../../Util/Auth'
import { toast } from 'react-toastify'
import { redirect, useLoaderData } from 'react-router-dom'
import classes from '../Login_Logout_Error_SignUp/Login.module.css'
import { XrayCardForRadioGaphers } from '../../components/RadioGraphers/XrayCardForRadioGaphers'
export const DetailsDiagnoseForRadioGraphers = () => {

    const information = useLoaderData()
  
  return (

    <div className={`${classes.w_h} ${classes.center}`}>

             
<XrayCardForRadioGaphers info ={information.data.data}/>

    </div>
  )
}



export const apiForGetDetailsForDiagnoseForRadioGraphers = async ({ params })=>{
    loaderForSaveRoutesWithExpForRadioGrapher()
try {
    const response = await fetch(`http://localhost:8001/v1/Symptoms/getSymptoms/Details/other/${params.IdDiagnose}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${getToken()}`

        },
    })

    if (!response.ok) {
        throw new Error('error')
    }

    const data = await response.json()
return data

} catch (error) {
    toast.error('حدث خطأ ما')
    return redirect(`/DashboardRadioGraphers/DiagnosesOfPatient/${params.IdSyr}`)
}

}