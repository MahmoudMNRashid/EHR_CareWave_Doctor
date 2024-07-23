import React, { useEffect, useState } from 'react'
import classes from './MainDiagnosesCard.module.css'

import virus from '../../../../../style/MainInfoDiagnoses/virus.png'
import diagnoses from '../../../../../style/MainInfoDiagnoses/medical-records.png'
import desc from '../../../../../style/MainInfoDiagnoses/job-description.png'
import date from '../../../../../style/MainInfoDiagnoses/calendar.png'
import details from '../../../../../style/MainInfoDiagnoses/file.png'
import { useNavigate } from 'react-router-dom'
import remove from '../../../../../style/MainInfoDiagnoses/delete-file.png'
import edit from '../../../../../style/MainInfoDiagnoses/edit-info.png'
import { ModalForDeleteDiagnose } from './ModalForDeleteDiagnose'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons'
import { ModalForAddDiagnose } from './ModalForAddDiagnose'
import { getToken } from '../../../../../Util/Auth'
import { ToastContainer, toast } from 'react-toastify'

export const MainDiagnosesCard = (props) => {


console.log(props)
 

  const nav = useNavigate()
  // ___________________________________________
  const [ModalForDeleteDiagnosesIsOpen, setModalForDeleteDiagnosesIsOpen] = useState(false)
  const [ModalForAddDiagnosesIsOpen, setModalForAddDiagnosesIsOpen] = useState(false)
  const handleOpenModalForDeleteDiagnoses = _ => {
    setModalForDeleteDiagnosesIsOpen(true)
  }
  const handleCloseModalForDeleteDiagnoses = _ => {
    setModalForDeleteDiagnosesIsOpen(false)
  }
  const handleOpenModalForAddDiagnoses = _ => {
    setModalForAddDiagnosesIsOpen(true)
  }
  const handleCloseModalForAddDiagnoses = _ => {
    setModalForAddDiagnosesIsOpen(false)
  }

  const [idDiagnose, setidDiagnose] = useState('')


  const getIdForDelete = id => {
    setidDiagnose(id)
    handleOpenModalForDeleteDiagnoses()
  }


  return (
    <div className={classes.container}>

      <div className={classes.title}>

        <div>
          <img src={diagnoses} alt='diagnoses' />
          <p> التشخيصات الطبية</p>
        </div>
        <button onClick={handleOpenModalForAddDiagnoses} > <FontAwesomeIcon icon={faAdd} /></button>

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

                  nav(`/DashboardDoctor/HealthRecord/${props.idSyr}/${item.symptomsid}`, { state: { isHasPermission: item.isHasPermission, nameDisease: item.nameDisease, description: item.description, date: formattedAdjustedDate } })
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
                <div className={classes.containerButton}>
                  {item.isHasPermission === true && <button onClick={() => { getIdForDelete(item.symptomsid) }}> <img src={remove} alt='remove' /></button>}
                  
                </div>
              </div>
            </div>
          )



        })) : (<p style={{ margin: 'auto', fontSize: '18px' }}>لايوجد</p>)}









      </div>

      <ToastContainer />
      {ModalForDeleteDiagnosesIsOpen && <ModalForDeleteDiagnose close={handleCloseModalForDeleteDiagnoses} idDiagnose={idDiagnose} />}
      {ModalForAddDiagnosesIsOpen && <ModalForAddDiagnose close={handleCloseModalForAddDiagnoses} idSyr={props.idSyr} />}
    </div>
  )
}
