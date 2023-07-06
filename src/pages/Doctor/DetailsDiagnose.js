import React from 'react'
import classes from './DetailsDiagnose.module.css'
import { getToken, loaderForSaveRoutesWithExpForDoctor } from '../../Util/Auth'
import { redirect, useLoaderData } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { MainDetailsDiagnoseCard } from '../../components/Doctor/Section_SearchAboutPatient/DetailsDignoses/MainDetailsDiagnose/MainDetailsDiagnoseCard'
import { AnalysisCard } from '../../components/Doctor/Section_SearchAboutPatient/DetailsDignoses/Analysis/AnalysisCard'
import { XrayCard } from '../../components/Doctor/Section_SearchAboutPatient/DetailsDignoses/Xray/XrayCard'
import { DrugsCard } from '../../components/Doctor/Section_SearchAboutPatient/DetailsDignoses/Drugs/DrugsCard'
import { SurgeryCard } from '../../components/Doctor/Section_SearchAboutPatient/DetailsDignoses/Surgery/SurgeryCard'
import { Helmet } from 'react-helmet'


export const DetailsDiagnose = () => {

 
  const bigData = useLoaderData()


  // _____________________________________________________________

  const GeneralDetailsDiagnose = {
    name: `${bigData.nameOfDieses}`,
    date: `${bigData.date}`,
    desc: `${bigData.desc}`
  }


  // ________________________________________________________________
  const InformationAnalysis = {
    isHasPermission: bigData.isHasPermission,
    idSyr: bigData.idSyr,
    idDiagnose: bigData.idDiagnose,
    fullPath: bigData.fullPath,
    analysis: bigData.data.data.analysis


  }
  //_______________________________________________________________
  const InformationXray = {
    isHasPermission: bigData.isHasPermission,
    idSyr: bigData.idSyr,
    idDiagnose: bigData.idDiagnose,
    fullPath: bigData.fullPath,
    xrays: bigData.data.data.x_ray





  }
  //_________________________________________
  const InformationDrugs = {
    isHasPermission: bigData.isHasPermission,
    idSyr: bigData.idSyr,
    idDiagnose: bigData.idDiagnose,
    fullPath: bigData.fullPath,
    drugs: bigData.data.data.durg

  }
  // ________________________________________
  const InformationSurgery = {
    isHasPermission: bigData.isHasPermission,
    idSyr: bigData.idSyr,
    idDiagnose: bigData.idDiagnose,
    fullPath: bigData.fullPath,
    surgery: bigData.data.data.surgery


  }




  return (
    <div className={classes.ThePage}>
      <Helmet><title> تفاصيل التشخيص</title></Helmet>
      <div className={classes.Bigwrapper}>
        <div className={classes.FirstWrapper}>
          <MainDetailsDiagnoseCard info={GeneralDetailsDiagnose} />
        </div>
        <div className={classes.MiddleWrapper}>
          <DrugsCard info={InformationDrugs} />
          <AnalysisCard info={InformationAnalysis} />
          <XrayCard info={InformationXray} />
          <SurgeryCard info={InformationSurgery} />
        </div>

        

      </div>
      <ToastContainer />
    </div>
  )
}

export const apiDetailsDiagnose = async ({ params }) => {
  loaderForSaveRoutesWithExpForDoctor()
  const param = params.IdDiagnose;
  const values = param.split("+");

  // Storing values in variables
  const idDiagnose = values[0];
  const isHasPermission = values[1];
  const nameOfDieses = values[2];
  const date = values[3];
  const desc = values[4]

  try {
    const response = await fetch(`http://localhost:8001/v1/Symptoms/getSymptoms/Details/${idDiagnose}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${getToken()}`

      },
    })
    if (!response.ok) {
      console.log('error from loader details dignoses')
      throw new Error('error')
    }
    const data = await response.json()


    const bigData = {
      idDiagnose,
      idSyr: params.IdSyr,
      isHasPermission,
      nameOfDieses,
      fullPath: params.IdDiagnose,
      desc,
      date,
      data
    }

    return bigData
  } catch (error) {
    toast.error('حدث خطأ ما')
    return redirect(`/DashboardDoctor/HealthRecord/${params.IdSyr}`)
  }

}