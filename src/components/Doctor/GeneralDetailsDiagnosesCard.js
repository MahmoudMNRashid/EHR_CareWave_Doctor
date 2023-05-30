import React from 'react'
import classes from './GeneralDetailsDiagnosesCard.module.css'
export const GeneralDetailsDiagnosesCard = (props) => {
    return (



        <div className={classes.GeneralDetailsDiagnoses}>
            <div >
                <span>اسم المرض:</span>
                <p>  {props.GeneralDetailsDiagnose.name}  </p>
            </div>
            <div>
                <span>التاريخ:</span>
                <p>{props.GeneralDetailsDiagnose.date} </p>
            </div>

        </div>






    )
}
