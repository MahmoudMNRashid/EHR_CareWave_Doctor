import React from 'react'
import { getToken } from '../../Util/Auth'
import { useLoaderData } from 'react-router-dom'
import classes from '../Login_Logout_Error_SignUp/Login.module.css'
import { MainDiagnosesOfPaitentCard } from '../../components/RadioGraphers/MainDiagnosesOfPaitentCard'
export const MainDiagnosesEHR = () => {

 // _____________________
 const information = useLoaderData()
 console.log('xxx')
 console.log(information)
 console.log('xxx')
 // _____________________

    
  return (


    <div className={`${classes.w_h} ${classes.center}`}>

      <MainDiagnosesOfPaitentCard info={information.data.data}/>


    </div>
  )
}



export const apiGetMainDiagnoses= async({ params })=>{
try {
    
    const response = await fetch(`http://localhost:8001/v1/Symptoms/getSymptoms/${params.IdSyr}`, {
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
    
}




}
