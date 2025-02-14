import React from 'react'
import classes from './MainDiagnosesOfPaitentCard.module.css'

import virus from '../../style/MainInfoDiagnoses/virus.png'
import diagnoses from '../../style/MainInfoDiagnoses/medical-records.png'
import desc from '../../style/MainInfoDiagnoses/job-description.png'
import date from '../../style/MainInfoDiagnoses/calendar.png'
import details from '../../style/MainInfoDiagnoses/file.png'
import { useNavigate, useParams } from 'react-router-dom'
import { getRole } from '../../Util/Auth'
export const MainDiagnosesOfPaitentCard = (props) => {
  console.log(props)
  const nav = useNavigate()
  const { IdSyr } = useParams()
  console.log(IdSyr)

  return (
    <div className={classes.container}>

      <div className={classes.title}>


        <img src={diagnoses} alt='diagnoses' />
        <p> التشخيصات الطبية</p>

      </div>


      <div className={classes.containerDiagnoses}>

        {props.info.length ? (props.info.map((item) => {
          const options = { year: "numeric", month: "long", day: "numeric" };
          const formattedDate = new Date(item.dateRequest).toLocaleDateString("en-US", options);
          return (
            <div key={item.symptomsid} className={classes.diagnose}>
              <div className={classes.info}>
                <div className={classes.a}>
                  <img src={virus} alt='' />
                  <p>{item.nameDisease?item.nameDisease:'لم تظهر النتيجة بعد'}</p>
                </div>

                <button onClick={() => {

                  if (getRole() === 'radiographer') {
                    nav(`/DashboardRadioGraphers/DiagnosesOfPatient/${IdSyr}/${item.symptomsid}`)
                  } else if (getRole() === 'pharmaceutical') {
                    nav(`/DashboardPharmacist/DiagnosesOfPatient/${IdSyr}/${item.symptomsid}`)
                  } else if (getRole() === 'analyzer') {
                    nav(`/DashboardMLS/DiagnosesOfPatient/${IdSyr}/${item.symptomsid}`)
                  }
                  else{
                    nav('/DashboardMLS')
                  }


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
                <p>{item.description?item.description:'لم تظهر النتيجة بعد'}</p>
              </div>


            </div>
          )


        })) : (<p style={{ margin: 'auto', fontSize: '18px' }}>لايوجد</p>)}









      </div>




    </div>
  )
}
