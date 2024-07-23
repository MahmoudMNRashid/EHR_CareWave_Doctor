import React from 'react'
import ReactDOM from 'react-dom';
import classes from './ModalForShowResult1.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const ModalShow = (props) => {
console.log('show',props)
var apiDate = new Date(props.info.dateRequest); // Assuming the date is in UTC
var timeZoneOffset = new Date().getTimezoneOffset() / -60; // Convert to hours and negate
var offsetHours = timeZoneOffset;
var adjustedDate = new Date(apiDate.getTime() + offsetHours * 60 * 60 * 1000);
const options = { year: "numeric", month: "long", day: "numeric" };
const formattedAdjustedDate = adjustedDate.toLocaleDateString("ar", options);
const hours = adjustedDate.getHours();
const minutes = adjustedDate.getMinutes();
const dateRequest = ` (${hours}:${minutes})  ${formattedAdjustedDate}`

var apiDate1 = new Date(props.info.dateUpload); // Assuming the date is in UTC
// Convert to hours and negate
var adjustedDate1 = new Date(apiDate1.getTime() + offsetHours * 60 * 60 * 1000);
const formattedAdjustedDate1 = adjustedDate1.toLocaleDateString("ar", options);
const hours1 = adjustedDate1.getHours();
const minutes1 = adjustedDate1.getMinutes();
const dateUpload = `(${hours1}:${minutes1})       ${formattedAdjustedDate1}`

    return (
        <div className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">

            <div className={classes.wrapper}>
                <div className={classes.first}>
                <div className={classes.info}>
                    <p>اسم العملية </p>
                    <p> {props.info.name}</p>
                </div>
                <div className={classes.info}>
                    <p> وصف العملية</p>
                    <p>{props.info.description}</p>
                </div>
                <div className={classes.info}>
                    <p> النتيجة</p>
                    <p>{props.info.descriptionresult}</p>
                </div>
                <div className={classes.info}>
                    <p> نسبة النجاح</p>
                    <p> {`% ${props.info.successRate}`}</p>
                </div>
                <div className={classes.info}>
                    <p>  تاريخ طلب العملية</p>
                    <p> {` ${dateRequest}`}</p>
                </div>
                <div className={classes.info}>
                    <p> تاريخ القيام بالعملية</p>
                    <p> {` ${dateUpload}`}</p>
                </div>
                <div className={classes.info}>
                    <p>   القائم بالعملية</p>
                    <p> {`${props.info.syriddoctor}`}</p>
                </div>





                </div>

                <div className={classes.second}><button onClick={props.close}><FontAwesomeIcon icon={faClose} /></button> </div>




            </div>



        </div>
    )
}
export const ModalForShowResult = (props) => {

    return (

        ReactDOM.createPortal(<ModalShow close={props.close} info={props.info} />, document.getElementById('modal'))

    )
}
