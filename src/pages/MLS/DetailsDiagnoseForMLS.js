import React from 'react'
import classes from '../Login_Logout_Error_SignUp/Login.module.css'
import { getToken, loaderForSaveRoutesWithExpForMLS } from '../../Util/Auth'
import { redirect, useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AnalysisCardForMLS } from '../../components/MLS/AnalysisCardForMLS'

export const DetailsDiagnoseForMLS = () => {
  const information = useLoaderData()

  return (
    <div className={`${classes.w_h} ${classes.center}`} >
      
      
      
  <AnalysisCardForMLS info ={information.data.data}/>
      </div>
  )
}




export const apiForGetDetailsForDiagnoseForMLS = async ({ params })=>{
    loaderForSaveRoutesWithExpForMLS()
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