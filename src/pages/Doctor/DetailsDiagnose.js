import React, { useEffect } from 'react'
import classes from './DetailsDiagnose.module.css'
import { getToken, loaderForSaveRoutesWithExpForDoctor } from '../../Util/Auth'
import { redirect, useLoaderData, useLocation, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { MainDetailsDiagnoseCard } from '../../components/Doctor/Section_SearchAboutPatient/DetailsDignoses/MainDetailsDiagnose/MainDetailsDiagnoseCard'
import { AnalysisCard } from '../../components/Doctor/Section_SearchAboutPatient/DetailsDignoses/Analysis/AnalysisCard'
import { XrayCard } from '../../components/Doctor/Section_SearchAboutPatient/DetailsDignoses/Xray/XrayCard'
import { DrugsCard } from '../../components/Doctor/Section_SearchAboutPatient/DetailsDignoses/Drugs/DrugsCard'
import { SurgeryCard } from '../../components/Doctor/Section_SearchAboutPatient/DetailsDignoses/Surgery/SurgeryCard'
import { Helmet } from 'react-helmet'


export const DetailsDiagnose = () => {


 
  

  const { IdSyr, IdDiagnose } = useParams()

  //_____________________________________________
  const bigData = useLoaderData()
  console.log(bigData)

  // _____________________________________________________________
  var apiDate = new Date(bigData.extra.dateRequest); // Assuming the date is in UTC
  var timeZoneOffset = new Date().getTimezoneOffset() / -60; // Convert to hours and negate
  var offsetHours = timeZoneOffset;
  var adjustedDate = new Date(apiDate.getTime() + offsetHours * 60 * 60 * 1000);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedAdjustedDate = adjustedDate.toLocaleDateString("ar", options);
  const hours = adjustedDate.getHours();
  const minutes = adjustedDate.getMinutes();
  const d = `${hours}:${minutes}   ${formattedAdjustedDate}`
  
  const GeneralDetailsDiagnose = {
    name: bigData.extra.nameDisease,
    date: d,
    desc: bigData.extra.description,
    extra:bigData.extra,
    idSyrDoctor:bigData.idSyrDocotor

  }


  // ________________________________________________________________
  const InformationAnalysis = {
    extra: bigData.extra,
    idSyr: IdSyr,
    idDiagnose: IdDiagnose,
    analysis: bigData.data.data.analysis,


  }
  //_______________________________________________________________
  const InformationXray = {
    extra: bigData.extra,
    idSyr: IdSyr,
    idDiagnose: IdDiagnose,
    xrays: bigData.data.data.x_ray,




  }
  //_________________________________________
  const InformationDrugs = {
    extra: bigData.extra,
    idSyr: IdSyr,
    idDiagnose: IdDiagnose,
    drugs: bigData.data.data.durg,

  }
  // ________________________________________
  const InformationSurgery = {
    extra: bigData.extra,
    idSyr: IdSyr,
    idDiagnose: IdDiagnose,
    surgery: bigData.data.data.surgery,


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
  try {

    const responseConfirm = await fetch(`http://localhost:8000/v1/HelpMedical/getinfosick/${params.IdSyr}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${getToken()}`

      },
    })

    if (!responseConfirm.ok) {
      const data = await responseConfirm.json()
      throw data
    }




    const response = await fetch(`http://localhost:8001/v1/Symptoms/getSymptoms/Details/${params.IdDiagnose}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${getToken()}`

      },
    })
    if (!response.ok) {
      console.log('error from loader details dignoses')
      throw new Error('error')
    }
    const iditosResponse = await fetch(`http://localhost:8001/v1/Symptoms/getSymptoms/${params.IdSyr}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${getToken()}`

      },
    })
    if (!iditosResponse.ok) {
      throw new Error('error')
    }
    const iditosdata = await iditosResponse.json()


    const result = iditosdata.data.data.find(item => item.symptomsid === +params.IdDiagnose)
    if (!result) {
      throw new Error('error')
    }
let idSyrDocotor =''
      try {
  
        const response = await fetch(`http://localhost:8000/v1/User/get-doctors/byid/${result.doctorId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${getToken()} `
  
          },
  
        });
        if (!response.ok) {
          const data = await response.json()
          throw data;
        }
        const data = await response.json()
  
         idSyrDocotor= data.data.result.length === 0 ? '' : data.data.result[0].syrid
  
      } catch (error) {
        toast.error('!حدث خطأ ما', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
  
    
  



    const data = await response.json()
    const bigData = { data, extra: result,idSyrDocotor }

    return bigData
  } catch (error) {
    if (error.message === `Can't found account.`) {

      throw new Error('الرقم الوطني غير موجود')
    }
    toast.error('حدث خطأ ما',
      {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    return redirect(`/DashboardDoctor/HealthRecord/${params.IdSyr}`)
  }

}