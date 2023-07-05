import React from 'react'
import classes from './MainDetailsDiagnoseCard.module.css'
import date from '../../../../../style/DetailsDiagnose/DetailsDigCard/calendar (1).png'
import desc from '../../../../../style/DetailsDiagnose/DetailsDigCard/file (1).png'
import name from '../../../../../style/DetailsDiagnose/DetailsDigCard/infectious.png'
import title from '../../../../../style/DetailsDiagnose/DetailsDigCard/medical-report.png'



export const MainDetailsDiagnoseCard = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <img src={title} alt='title' />
        <p>معلومات عامة عن التشخيص</p>
      </div>

      <div className={classes.contaienerInfo}>
        <div className={classes.info}>
          <img src={name} alt='name' />
          <p>{props.info.name}</p>

        </div>
        <div className={classes.info}>
          <img src={date} alt='date' />
          <p>{props.info.date}</p>

        </div>
        <div className={classes.info}>
          <img src={desc} alt='desc' />
          <p>{props.info.desc}</p>


        </div>



      </div>



    </div>
  )
}
