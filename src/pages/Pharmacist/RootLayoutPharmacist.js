import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Outlet, useNavigation } from 'react-router-dom'
import classes from './RootLayoutPharmacist.module.css'
import { Nav } from '../../components/Ui/Nav'
import { Sidebar } from '../../components/Ui/Sidebar'
import LoadingBar from 'react-top-loading-bar'
import { faDiagnoses, faRegistered, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
export const RootLayoutPharmacist = () => {
  const navigation = useNavigation();
  const np = [

      {
          name: 'تشخيصات مريض ',
          path: 'DiagnosesOfPatient',
          icon:faDiagnoses
      },
      {
          name: 'تسجيل مريض',
          path: 'Patient_Registration',
          icon:faRegistered
      },
      {
          name: 'تسجيل الخروج',
          path: "../../logout",
          icon:faRightFromBracket
      }
  ]

  const svgPartOne = [
      {
          icon: faDiagnoses,
          explanation: 'تشخيصات مريض ',
          path: 'DiagnosesOfPatient'
      },
      {
          icon:faRegistered,
          explanation: 'تسجيل مريض',
          path: 'Patient_Registration'
      },
      {
          path: '../../logout',
          icon:faRightFromBracket,
          explanation:'تسجيل الخروج'
      }
     


  ]

  return (
    <Container style={{ padding: '0px', }} fluid >
    <Row className={classes.row} >
        <Col sm="2" xs="2" md="2" className={classes.col1}>
            <Nav svgPartOne={svgPartOne}  className={classes.minisidebar} />
            <Sidebar np={np} className={classes.bigsidebar} />
        </Col>
        <Col sm="10" xs="10" md="10" className={classes.col2}>
            <Outlet />
        </Col>
    </Row>
    {
        navigation.state === 'loading' &&  <LoadingBar shadowStyle={{ display: 'none' }} color='#31af99' progress={100} height={5} loaderSpeed={15000} transitionTime={15000}  />
    }
</Container>
  )
}
