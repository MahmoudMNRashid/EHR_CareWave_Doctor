import React from 'react'
import classes from './GeneralDiagnosesCard.module.css'


export const GeneralDiagnosesCard = (props) => {

    return (
        <button onClick={props.onClick} className={classes.GeneralInformationDiagnose}>



            <div>
                <span>المرض:</span>
                <p>  {props.diagnoses.disease}  </p>
            </div>
            <div>
                <span>الوصف:</span>
                <p>{props.diagnoses.desc} </p>
            </div>
            <div>
                <span>التاريخ:</span>
                <p> {props.diagnoses.date}</p>
            </div>





        </button>
    )
}
