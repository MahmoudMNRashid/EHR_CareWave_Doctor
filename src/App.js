import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./pages/Doctor/Login";
import { RootLayoutDoctor } from "./pages/Doctor/RootLayoutDoctor";
import { FindPatient } from "./pages/Doctor/FindPatient";
import { GeneralDetails } from "./pages/Doctor/GeneralDetails";
import { DetailsDiagnose } from "./pages/Doctor/DetailsDiagnose";
// import { LoginPage } from "./pages/Manager/LoginPage";
// import { RootLayoutManager } from "./pages/Manager/RootLayoutManager";
// import { NewAssistant } from "./pages/Manager/NewAssistant";
// import { Complaints } from "./pages/Manager/Complaints";
// import { MedicalTips } from "./pages/Manager/MedicalTips";
// import { Reports } from "./pages/Manager/Reports";
// import { DoctorSearchIdSyr } from "./pages/Manager/DoctorSearchIdSyr";
// import { DoctorsSearchName } from "./pages/Manager/DoctorsSearchName";
// import { AddTips } from "./pages/Manager/AddTips";
// import { RootLayoutAsst } from "./pages/Asst_Manger/RootLayoutAsst";
// import { VerifyDoctorAccount } from "./pages/Asst_Manger/VerifyDoctorAccount";
// import {ChangeNumber} from './pages/Asst_Manger/ChangeNumber';
// import { UpgradeAccount } from "./pages/Asst_Manger/UpgradeAccount";
// import { DeleteAccountDoctor } from "./pages/Manager/DeleteAccountDoctor";



// const router = createBrowserRouter([
//   {
//     path: '/', element: <LoginPage />
//   },
//   {
//     path: '/dashboardSysAdmin',
//     element: <RootLayoutManager />,
//     children: [
//       { path: 'NewAssistant', element: <NewAssistant /> },
//       { path: 'Complaints', element: <Complaints /> },
//       {
//         path: 'MedicalTips', children: [

//           { index:true, element: <MedicalTips />, }
//           , { path: 'AddTips', element: <AddTips /> }]
//       },
//       { path: 'DeleteAccountDoctor', element: <DeleteAccountDoctor /> },
//       { path: 'DoctorsSearchName', element: <DoctorsSearchName /> },
//       { path: 'DoctorSearchIdSyr', element: <DoctorSearchIdSyr /> },
//       { path: 'Reports', element: <Reports /> },
//     ]
//   },
//   {
//     path: '/dashboardAsst',
//     element: <RootLayoutAsst />,
//     children: [
//       { path: 'VerifyDoctorAccount', element: <VerifyDoctorAccount/> },
//       { path: 'UpgradeAccount', element: <UpgradeAccount/> },
//       { path: 'ChangeNumber', element: <ChangeNumber /> },
//     ]
//   }
// ])


const router = createBrowserRouter([

  {
    path: '/', element: <Login />
  },
  {
    path: '/DashboardDoctor',
    element: <RootLayoutDoctor />,
    children: [
      {
        path: 'Find_Patient', children: [
          { index: true, element: <FindPatient /> },
          {
            path: ':IdSyr', children: [

              { index: true, element: <GeneralDetails /> },
              { path: 'DetailsDiagnose', element: <DetailsDiagnose /> }
            ]
          },


        ]
      }
    ]
  },


])
function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;
