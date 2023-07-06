import React from 'react'
import classes from './MainDiagnosesCard.module.css'

import virus from '../../../../../style/MainInfoDiagnoses/virus.png'
import diagnoses from '../../../../../style/MainInfoDiagnoses/medical-records.png'
import desc from '../../../../../style/MainInfoDiagnoses/job-description.png'
import date from '../../../../../style/MainInfoDiagnoses/calendar.png'
import details from '../../../../../style/MainInfoDiagnoses/file.png'
import { useNavigate } from 'react-router-dom'

export const MainDiagnosesCard = (props) => {
  const nav = useNavigate()
  return (
    <div className={classes.container}>

      <div className={classes.title}>


        <img src={diagnoses} alt='diagnoses' />
        <p> التشخيصات الطبية</p>

      </div>


      <div className={classes.containerDiagnoses}>

        {props.info.length ? (props.info.map((item) => {
          const options = { year: "numeric", month: "long", day: "numeric" };
          const formattedDate = new Date(item.date).toLocaleDateString("en-US",options);
          return (
            <div key={item.symptomsid} className={classes.diagnose}>
              <div className={classes.info}>
                <div className={classes.a}>
                  <img src={virus} alt='' />
                  <p>{item.nameDisease}</p>
                </div>

                <button onClick={() => {


                  nav(`/DashboardDoctor/HealthRecord/${props.idSyr}/${item.symptomsid}+${item.isHasPermission}+${item.nameDisease}+${formattedDate}+${item.description}`)

                }} className={classes.btn}>
                  <img src={details} alt='' />
                </button>
              </div>



              <div className={classes.info}>
                <img src={date} alt='date' />
                <p>{formattedDate}</p>
              </div>
              <div className={classes.info}>
                <img src={desc} alt='description' />
                <p>{item.description}</p>
              </div>


            </div>
          )


        })) : (<p style={{ margin: 'auto', fontSize: '18px' }}>لايوجد</p>)}









      </div>




    </div>
  )
}
