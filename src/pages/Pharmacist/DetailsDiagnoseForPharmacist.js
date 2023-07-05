import React from 'react'
import classes from '../Login_Logout_Error_SignUp/Login.module.css'
import { getToken, loaderForSaveRoutesWithExpForPharmacist } from '../../Util/Auth'
import { toast } from 'react-toastify'
import { redirect, useLoaderData } from 'react-router-dom'
import { DrugsCardForPharmacist } from '../../components/Pharmacist/DrugsCardForPharmacist'
export const DetailsDiagnoseForPharmacist = () => {
  const information = useLoaderData()
  

  return (
    <div className={`${classes.w_h} ${classes.center}`}>

             
    <DrugsCardForPharmacist  info ={information.data.data}/>
    
        </div>
  )
}


export const apiForGetDetailsForDiagnoseForPharmacist = async ({ params })=>{
    loaderForSaveRoutesWithExpForPharmacist()
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
      return redirect(`/DashboardPharmacist/DiagnosesOfPatient/${params.IdSyr}`)
  }
  
  }