import React from 'react'
import classes from './Main_Details_Information_EHR.module.css'
import { redirect, useLoaderData } from 'react-router-dom'
import { getToken } from '../../Util/Auth'
import { ToastContainer, toast } from 'react-toastify'
import { ChronicDiseasesCard } from '../../components/Doctor/Section_SearchAboutPatient/Main_Details_Information_EHR/Chronic/ChronicDiseasesCard'
import { GeneticDiseasesCard } from '../../components/Doctor/Section_SearchAboutPatient/Main_Details_Information_EHR/Genetic/GeneticDiseasesCard'
import { AllergicDiseasesCard } from '../../components/Doctor/Section_SearchAboutPatient/Main_Details_Information_EHR/Allergic/AllergicDiseasesCard'
import { VaccinesDiseasesCard } from '../../components/Doctor/Section_SearchAboutPatient/Main_Details_Information_EHR/Vaccines/VaccinesDiseasesCard'
import { MainInformationPatientCard } from '../../components/Doctor/Section_SearchAboutPatient/Main_Details_Information_EHR/MainInformationPatient/MainInformationPatientCard'
import { MainDiagnosesCard } from '../../components/Doctor/Section_SearchAboutPatient/Main_Details_Information_EHR/MainDiagnoses/MainDiagnosesCard'
import ehr from '../../style/42332040.jpg'
import { Helmet } from 'react-helmet'

export const MainDetailsInformationEHR = () => {
    // _____________________
    const BigData = useLoaderData()

    // _____________________
    // const [AddDiagnosesModal, setAddDiagnosesModal] = useState(false)
    // const handleopenAddDiagnosesModal = _ => setAddDiagnosesModal(true);
    // const handlecloseAddDiagnosesModal = _ => setAddDiagnosesModal(false);

    // const nav = useNavigate()
    // const buttonClickChangeHandler = (idDiagnose, isHasPermission, nameDisease, date) => {

    //     nav(`${idDiagnose}+${isHasPermission}+${nameDisease}+${date}`)
    // }
    // __________________________
    const currentYear = new Date().getFullYear();
    const yearOfBirth = currentYear - BigData.patientInformation.age;
    const mainPatient = {
        idPatient: BigData.patientInformation.id,
        name: BigData.patientInformation.name,
        age: BigData.patientInformation.age,
        year: yearOfBirth,
        bloodType: BigData.patientInformation.bloodGroup,
        address: BigData.patientInformation.address,
        phone: '',
        governorate: ''
    }
    // __________________________
    const chronic = {
        idPatient: BigData.patientInformation.id,
        idSyr: BigData.idSyr,
        diseases: BigData.patientInformation.chronicDiseases
    }

    const genetic = {
        idPatient: BigData.patientInformation.id,
        idSyr: BigData.idSyr,
        diseases: BigData.patientInformation.geneticDiseases

    }

    const allergic = {
        idPatient: BigData.patientInformation.id,
        idSyr: BigData.idSyr,
        diseases: BigData.patientInformation.drugAllergy
    }

    const vaccines = {
        idPatient: BigData.patientInformation.id,
        idSyr: BigData.idSyr,
        vaccines:
            BigData.patientInformation.vaccinesEntity
    }
    // __________________________


    const diagnoses = BigData.mainDiagnoses
    const idSyr= BigData.idSyr
    const idPatient = BigData.patientInformation.id
    // __________________________

    return (
        <div className={classes.ThePage}>
            <Helmet>
                <title>السجل الصحي</title> </Helmet>
            <div className={classes.Bigwrapper}>
                <div className={classes.FirstWrapper}>
                    <MainInformationPatientCard info={mainPatient} />
                    <img style={{ width: '400px', height: '300px' }} src={ehr} alt='' />
                </div>
                <div className={classes.MiddleWrapper}>
                    <ChronicDiseasesCard info={chronic} />
                    <GeneticDiseasesCard info={genetic} />
                    <AllergicDiseasesCard info={allergic} />
                    <VaccinesDiseasesCard info={vaccines} />
                </div>
                <div className={classes.ThirdWrapper}>

                    <MainDiagnosesCard info={diagnoses} idSyr={idSyr} idPatient={idPatient} />

                </div>
                <ToastContainer />
            </div>
        </div>


    )
}

export const api = async ({ params }) => {
    try {
        const response = await fetch(`http://localhost:8000/v1/HelpMedical/getinfosick/${params.IdSyr}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${getToken()}`

            },
        })

        if (!response.ok) {
            throw new Error('error')
        }

        const data = await response.json()


        const response1 = await fetch(`http://localhost:8001/v1/Symptoms/getSymptoms/${params.IdSyr}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${getToken()}`

            },
        })
        if (!response1.ok) {
            throw new Error('error')
        }
        const data1 = await response1.json()



        const ALLData = {
            idSyr: params.IdSyr,
            patientInformation: data.data, /* objects*/
            mainDiagnoses: data1.data.data /* مصفوفة objects */
        }

        return ALLData






        // return BigData

    } catch (error) {
        toast.error('حدث خطأ ما')
        return redirect('/DashboardDoctor/HealthRecord')
    }










}




