import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./pages/Login_Logout_Error_SignUp/Login";
import { RootLayoutDoctor } from "./pages/Doctor/RootLayoutDoctor";
import { FindPatient } from "./pages/Doctor/FindPatient";
import { api, MainDetailsInformationEHR } from "./pages/Doctor/Main_Details_Information_EHR";
import { apiDetailsDiagnose, DetailsDiagnose } from "./pages/Doctor/DetailsDiagnose";
import { RootLayoutMLS } from "./pages/MLS/RootLayoutMLS";
import { RootLayoutPharmacist } from "./pages/Pharmacist/RootLayoutPharmacist";
import { RootLayoutRadioGraphers } from "./pages/RadioGraphers/RootLayoutRadioGraphers";
import { action as logoutAction } from "./pages/Login_Logout_Error_SignUp/Logout";
import { Error } from "./pages/Login_Logout_Error_SignUp/Error";
import { PatientRegistration } from "./pages/Doctor/PatientRegistration";
import { SignUpPage } from "./pages/Login_Logout_Error_SignUp/SignUpPage";
import {  loaderForLogin, loaderForSaveRoutesWithExpForDoctor, loaderForSaveRoutesWithExpForMLS, loaderForSaveRoutesWithExpForPharmacist, loaderForSaveRoutesWithExpForRadioGrapher } from "./Util/Auth";
import { DiagnosesOfPatient } from "./pages/RadioGraphers/DiagnosesOfPatient";
import { apiGetMainDiagnoses, MainDiagnosesEHR } from "./pages/RadioGraphers/MainDiagnosesEHR";
import { apiForGetDetailsForDiagnoseForRadioGraphers, DetailsDiagnoseForRadioGraphers } from "./pages/RadioGraphers/DetailsDiagnoseForRadioGraphers";
import { apiForGetDetailsForDiagnoseForPharmacist, DetailsDiagnoseForPharmacist } from "./pages/Pharmacist/DetailsDiagnoseForPharmacist";
import { apiForGetDetailsForDiagnoseForMLS, DetailsDiagnoseForMLS } from "./pages/MLS/DetailsDiagnoseForMLS";
import { MyProfile } from "./pages/Doctor/MyProfile";
import { MyProfileDetails } from "./pages/Doctor/MyProfileDetails";


const router = createBrowserRouter([

  {
    path: '/', element: <Login />, loader: loaderForLogin
  },



  {
    path: 'SignUp', element: <SignUpPage />

  },



  {
    path: '/DashboardDoctor',
    element: <RootLayoutDoctor />,
    errorElement: <Error />,
    loader: loaderForSaveRoutesWithExpForDoctor,
    children: [
      {
        path: 'HealthRecord', loader: loaderForSaveRoutesWithExpForDoctor, children: [
          { index: true, element: <FindPatient /> },
          {
            path: ':IdSyr', loader: loaderForSaveRoutesWithExpForDoctor, children: [

              { index: true, element: <MainDetailsInformationEHR />, loader: api },
              { path: ':IdDiagnose', element: <DetailsDiagnose />, loader: apiDetailsDiagnose }
            ]
          },


        ]
      },
      {
        path: 'Patient_Registration', element: <PatientRegistration />, loader: loaderForSaveRoutesWithExpForDoctor
      },
      {
        path:'Profile',loader:loaderForSaveRoutesWithExpForDoctor,children:[
          {
            path: ':IdSyr', loader: loaderForSaveRoutesWithExpForDoctor, children: [

              { index: true, element: <MyProfile />, loader: api },
              { path: ':IdDiagnose', element: <MyProfileDetails />, loader: apiDetailsDiagnose }
            ]
          },
        ]
      },
    ]
  },


  {
    path: '/DashboardRadioGraphers', element: <RootLayoutRadioGraphers />, loader: loaderForSaveRoutesWithExpForRadioGrapher, children: [
      {
        path: 'DiagnosesOfPatient', loader: loaderForSaveRoutesWithExpForRadioGrapher, children: [
          { index: true, element: <DiagnosesOfPatient /> },
          {
            path: ':IdSyr', loader: loaderForSaveRoutesWithExpForRadioGrapher, children: [

              { index: true, element: <MainDiagnosesEHR />, loader: apiGetMainDiagnoses },
              { path: ':IdDiagnose', element: <DetailsDiagnoseForRadioGraphers />, loader: apiForGetDetailsForDiagnoseForRadioGraphers }
            ]
          },



        ]
      },
      {
        path: 'Patient_Registration', element: <PatientRegistration />, loader: loaderForSaveRoutesWithExpForRadioGrapher
      },
      {
        path:'Profile',loader:loaderForSaveRoutesWithExpForRadioGrapher,children:[
          {
            path: ':IdSyr', loader: loaderForSaveRoutesWithExpForRadioGrapher, children: [

              { index: true, element: <MyProfile />, loader: api },
              { path: ':IdDiagnose', element: <MyProfileDetails />, loader: apiDetailsDiagnose }
            ]
          },
        ]
      },


    ]
  },



  {
    path: '/DashboardPharmacist', element: <RootLayoutPharmacist />, loader: loaderForSaveRoutesWithExpForPharmacist, children: [

      {
        path: 'DiagnosesOfPatient', loader: loaderForSaveRoutesWithExpForPharmacist, children: [
          { index: true, element: <DiagnosesOfPatient /> },
          {
            path: ':IdSyr', loader: loaderForSaveRoutesWithExpForPharmacist, children: [

              { index: true, element: <MainDiagnosesEHR />, loader: apiGetMainDiagnoses },
              { path: ':IdDiagnose', element: <DetailsDiagnoseForPharmacist />, loader: apiForGetDetailsForDiagnoseForPharmacist }
            ]
          },



        ]
      },
      {
        path: 'Patient_Registration', element: <PatientRegistration />, loader: loaderForSaveRoutesWithExpForPharmacist
      }

    ]
  },



  {
    path: '/DashboardMLS', element: <RootLayoutMLS />, loader: loaderForSaveRoutesWithExpForMLS, children: [

      {
        path: 'DiagnosesOfPatient', loader: loaderForSaveRoutesWithExpForMLS, children: [
          { index: true, element: <DiagnosesOfPatient /> },
          {
            path: ':IdSyr', loader: loaderForSaveRoutesWithExpForMLS, children: [

              { index: true, element: <MainDiagnosesEHR />, loader: apiGetMainDiagnoses },
              { path: ':IdDiagnose', element: <DetailsDiagnoseForMLS />, loader: apiForGetDetailsForDiagnoseForMLS }
            ]
          },



        ]
      },
      {
        path: 'Patient_Registration', element: <PatientRegistration />, loader: loaderForSaveRoutesWithExpForMLS
      }


    ]
  },



  {
    path: 'logout',
    loader: logoutAction,
  }


]
)

function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;
