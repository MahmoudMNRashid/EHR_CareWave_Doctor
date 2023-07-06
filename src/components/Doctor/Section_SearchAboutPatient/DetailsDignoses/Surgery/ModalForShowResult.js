import React from 'react'
import ReactDOM from 'react-dom';
import classes from './ModalForShowResult.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const ModalShow = (props) => {
console.log(props)
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
