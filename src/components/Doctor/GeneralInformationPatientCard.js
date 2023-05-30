import React from 'react'
import classes from './GeneralInformationPatientCard.module.css'
export const GeneralInformationPatientCard = (props) => {

   
  return (
    <div className={classes.GeneralInformationPatient}>
    <div >
        <span>المريض:</span>
        <p>  {props.patient.name}  </p>
    </div>
    <div>
        <span>العمر:</span>
        <p>{props.patient.age} </p>
    </div>
    <div>
        <span>المحافظة:</span>
        <p> {props.patient.Governorate}</p>
    </div>
    <div>
        <span>العنوان:</span>
        <p> {props.patient.address}  </p>
    </div>
    <div>

        <span>زمرة الدم :</span>
        <p>{props.patient.bloodType}</p>
    </div>
</div>
  )
}
