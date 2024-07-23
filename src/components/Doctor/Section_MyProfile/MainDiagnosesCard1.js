import React  from 'react'
import classes from './MainDiagnosesCard1.module.css'

import diagnoses from '../../../style/MainInfoDiagnoses/medical-records.png'
import date from '../../../style/MainInfoDiagnoses/calendar.png'
import details from '../../../style/MainInfoDiagnoses/file.png'
import { useNavigate } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'

export const MainDiagnosesCard1 = (props) => {




  const nav = useNavigate()


  return (
    <div className={classes.container}>

      <div className={classes.title}>

        <div>
          <img src={diagnoses} alt='diagnoses' />
          <p> التشخيصات الطبية</p>
        </div>

      </div>


      <div className={classes.containerDiagnoses}>

        {props.info.length ? (props.info.map((item) => {
          // Sample full date received from API
          // Sample full date received from API
          var apiDate = new Date(item.dateRequest); // Assuming the date is in UTC
       

          // Get the time zone offset for your region
          var timeZoneOffset = new Date().getTimezoneOffset() / -60; // Convert to hours and negate

          // Adjust the offset to hours for your region
          var offsetHours = timeZoneOffset;

          // Calculate the new date with adjusted time zone
          var adjustedDate = new Date(apiDate.getTime() + offsetHours * 60 * 60 * 1000);


          // Formatting options for toLocaleDateString
          const options = { year: "numeric", month: "long", day: "numeric" };

          // Format the adjusted date using the 'ar' locale
          const formattedAdjustedDate = adjustedDate.toLocaleDateString("ar", options);




          return (
            <div key={item.symptomsid} className={classes.diagnose}>
            
              <div className={classes.info}>
                {/* <div className={classes.a}>
                  <img src={virus} alt='' />
                  <p>{item.nameDisease}</p>
                </div> */}

                <button onClick={() => {

                  nav(`/DashboardDoctor/Profile/${props.idSyr}/${item.symptomsid}`, { state: { isHasPermission: item.isHasPermission, nameDisease: item.nameDisease, description: item.description, date: formattedAdjustedDate } })
                  // nav(`/DashboardDoctor/HealthRecord/${props.idSyr}/${item.symptomsid}+${item.isHasPermission}+${item.nameDisease}+${formattedDate}+${item.description}`)

                }} className={classes.btn}>
                  <img src={details} alt='' />
                </button>

              </div>


              <div className={classes.info}>
                <img src={date} alt='date' />
                <p>{formattedAdjustedDate}</p>
              </div>

              {/* <div className={classes.info}>
                <img src={desc} alt='description' />
                <p>{item.description}</p>
              </div> */}

              {item.isHasResult && !item.canUpdate ? (<p className={classes.end}> التشخيص مغلق</p>) : <p className={classes.end}> التشخيص مفتوح</p>}
              
              <div className={classes.info}>
                
              </div>
            </div>
          )



        })) : (<p style={{ margin: 'auto', fontSize: '18px' }}>لايوجد</p>)}









      </div>

      <ToastContainer />
    </div>
  )
}
