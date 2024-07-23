import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import classes1 from './Login.module.css'
import { useNavigate, useRouteError } from 'react-router-dom'
import classes from './Error.module.css'
export const Error = () => {
    const errorr = useRouteError()
    const nav = useNavigate()
    const moveToSerachAgain = _ => nav('/DashboardDoctor/HealthRecord',{replace:true})
   

  return (
 <div className={`${classes1.w_h} ${classes1.center}`}>
{errorr.message==='الرقم الوطني غير موجود' &&

<div className={classes.container1}>
  <p>الرقم الوطني غير موجود</p>
  <button onClick={moveToSerachAgain}>ابحث مرة اخرى <FontAwesomeIcon icon={faLongArrowAltLeft} /></button>
</div>



}

{
  errorr.message==='server' &&
  <div className={classes.container1}>
  <p>حدث خطأ ما الرجاء إعادة المحاولة</p>
  <button onClick={moveToSerachAgain}>ابحث مرة اخرى <FontAwesomeIcon icon={faLongArrowAltLeft} /></button>
</div>

}

 </div>

  )
}
