import React from 'react'
import classes from './DetailsDiagnose.module.css'
import { GeneralDetailsDiagnosesCard } from '../../components/Doctor/GeneralDetailsDiagnosesCard'
import { DrugsCard } from '../../components/Doctor/DrugsCard'
import { ModalDV } from '../../components/UI_2/ModaDiseasesVaccines'
import { ModalDT } from '../../components/UI_2/ModalDrugTest'
import { TestsCard } from '../../components/Doctor/TestsCard'

export const DetailsDiagnose = () => {

const GeneralDetailsDiagnose = {
  name: 'lorem',
  date:'23/1/2023'
}

  return (
    <div className={classes.ThePage}>



      <div className={classes.Bigwrapper}>



        <div className={classes.FirstWrapper}>

          <GeneralDetailsDiagnosesCard GeneralDetailsDiagnose={GeneralDetailsDiagnose} />

        </div>

        <div className={classes.MiddleWrapper}>
          <DrugsCard/>
          <TestsCard/>

        </div>

        <div className={classes.ThirdWrapper}>



        </div>

















      </div>







    </div>
  )
}
