import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Outlet, useNavigation } from 'react-router-dom'
import classes from './RootLayoutDoctor.module.css'
import { Nav } from '../../components/Ui/Nav'
import { Sidebar } from '../../components/Ui/Sidebar'
import LoadingBar from 'react-top-loading-bar'
import { faLaptopMedical, faRegistered, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { Helmet } from 'react-helmet'

export const RootLayoutDoctor = () => {


 
    
    const navigation = useNavigation();

    const np = [

        {
            name: 'السجل الصحي',
            path: 'HealthRecord',
            icon: faLaptopMedical
        },
        {
            name: 'تسجيل مريض',
            path: 'Patient_Registration',
            icon: faRegistered
        },
        {
            name: 'تسجيل الخروج',
            path: "../../logout",
            icon: faRightFromBracket
        }
    ]

    const svgPartOne = [
        {
            icon: faLaptopMedical,
            explanation: ' السجل الصحي',
            path: 'HealthRecord'
        },
        {
            icon: faRegistered,
            explanation: 'تسجيل مريض',
            path: 'Patient_Registration'
        },
        {
            path: '../../logout',
            icon: faRightFromBracket,
            explanation: 'تسجيل الخروج'
        }



    ]


    return (
        <Container style={{ padding: '0px', }} fluid >
            <Helmet> <title>الصفحة الرئيسية </title></Helmet>
            <Row className={classes.row} >
                <Col sm="2" xs="2" md="2" className={classes.col1}>
                    <Nav svgPartOne={svgPartOne} className={classes.minisidebar} />
                    <Sidebar np={np} className={classes.bigsidebar} />
                </Col>
                <Col sm="10" xs="10" md="10" className={classes.col2}>
                    <Outlet />
                </Col>
            </Row>
            {
                navigation.state === 'loading' && <LoadingBar shadowStyle={{ display: 'none' }} color='#31af99' progress={100} height={5} loaderSpeed={15000} transitionTime={15000} />
            }
        </Container>
    )
}
