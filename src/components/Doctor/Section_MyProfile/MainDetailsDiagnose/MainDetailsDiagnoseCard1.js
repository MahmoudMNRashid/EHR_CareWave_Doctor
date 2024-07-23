import React from 'react'
import classes from './MainDetailsDiagnoseCard1.module.css'
import date from '../../../../style/DetailsDiagnose/DetailsDigCard/calendar (1).png'
import desc from '../../../../style/DetailsDiagnose/DetailsDigCard/file (1).png'
import name from '../../../../style/DetailsDiagnose/DetailsDigCard/infectious.png'
import title from '../../../../style/DetailsDiagnose/DetailsDigCard/medical-report.png'




export const MainDetailsDiagnoseCard1 = (props) => {


  return (
    <div className={classes.container}>

      <p className={classes.pos}>

        <div  >

         <p>من قبل :</p>
         <p>{props.info.idSyrDoctor}</p>

        </div>

      </p>

      <div className={classes.title}>
        <img src={title} alt='title' />
        <p>  نتيجة التشخيص</p>
      </div>

      <div className={classes.contaienerInfo}>
        <div className={classes.info}>
          <img src={date} alt='date' />
          <p>{props.info.date}</p>

        </div>
        <div className={classes.info}>
          <img src={name} alt='name' />

          {props.info.extra.isHasResult === false ? (<p style={{ color: '#f05261 ' }}>لم تظهر النتيجة بعد</p>) : <p>{props.info.extra.nameDisease}</p>}

        </div>
        <div className={classes.info}>
          <img src={desc} alt='desc' />

          {props.info.extra.isHasResult === false ? (<p style={{ color: '#f05261' }}>لم تظهر النتيجة بعد</p>) : <p>{props.info.extra.description}</p>}

        </div>

      

        

      </div>



    </div>
  )
}
