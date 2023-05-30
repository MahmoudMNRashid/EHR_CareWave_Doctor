import React from 'react'
import { Input } from '../UI_2/Input'
import classes from './LoginForm.module.css'
import { useNavigate } from 'react-router-dom'

export const LoginForm = () => {
    
    const detailsInputs = {
        one: {
            label: ' الرقم الوطني ',
            type: 'text'
        },
        two:{
            label: '  كلمة المرور ',
            type: 'password'
        }
    }
    const nav = useNavigate()

    const handleClickButton = (e)=>{
        e.preventDefault()
        nav('/DashboardDoctor')


    }
  return (


    <form className={classes.form} onSubmit={handleClickButton}>
        <Input  detailsInputs={detailsInputs.one}/>
        <Input detailsInputs={detailsInputs.two}/>
        <button className={classes.btn}>تسجيل دخول</button>
        
        
        
        </form>
  )
}
