import React from 'react'
import ReactDOM from 'react-dom';
import classes from './ModalForShowResultofAnalysis.module.css'
import info from '../../../../../style/DetailsDiagnose/Analysis/info.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const ModalShow = (props) => {

    return (
        <div className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">

            <div className={classes.wrapper}>
                <div className={classes.first}>
                    <img src={info} alt='result' />
                    <p>{props.result}</p>
                </div>

                <div className={classes.second}><button onClick={props.close}><FontAwesomeIcon icon={faClose} /></button> </div>




            </div>



        </div>
    )
}
export const ModalForShowResultofAnalysis = (props) => {

    return (

        ReactDOM.createPortal(<ModalShow close={props.close} result={props.result} />, document.getElementById('modal'))

    )
}
