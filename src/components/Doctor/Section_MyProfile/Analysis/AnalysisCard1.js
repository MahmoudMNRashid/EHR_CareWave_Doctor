import React, { useRef, useState } from 'react'
import classes from './AnalysisCard1.module.css'
import title from '../../../../style/DetailsDiagnose/Analysis/blood-tube.png'
import name from '../../../../style/DetailsDiagnose/Analysis/blood-tube (1).png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faAngleDown, faAngleUp,  faLongArrowLeft } from '@fortawesome/free-solid-svg-icons'

import { ModalForShowResultofAnalysis } from './ModalForShowResultofAnalysis1'


export const AnalysisCard1 = (props) => {
   
    
    // ________________________________________________________
    const [isDo1, setIsDo1] = useState(false)
    const [ModalShowResultofAnalysisIsOpen, setModalShowResultofAnalysisIsOpen] = useState(false)
    const handleOpenModalShowResultofAnalysisIsOpen = _ => setModalShowResultofAnalysisIsOpen(true)
    const handleCLoseModalShowResultofAnalysisIsOpen = _ => setModalShowResultofAnalysisIsOpen(false)
    const [result, setresult] = useState('')
    const getResult = (result, isDo) => {
        setresult(result)
        setIsDo1(isDo)

        handleOpenModalShowResultofAnalysisIsOpen()
    }
    // __________________________________________
   


    //___________________________________
   ;
   

    const divRef = useRef(null);

    const handleScrollDown = () => {
        divRef.current.scrollTo({
            top: divRef.current.scrollTop + 100,
            behavior: 'smooth',
        });
    };

    const handleScrollUp = () => {
        divRef.current.scrollTo({
            top: divRef.current.scrollTop - 100,
            behavior: 'smooth',
        });
    };


    return (
        <div className={classes.container}>
            {props.info.analysis.length > 4 && <button onClick={handleScrollUp} className={classes.up}><FontAwesomeIcon color={'#4f5e75'} icon={faAngleUp} /> </button>}
            {props.info.analysis.length > 4 && <button onClick={handleScrollDown} className={classes.down}><FontAwesomeIcon color={'#4f5e75'} icon={faAngleDown} /> </button>}
            <div className={classes.title}>

                <div>

                    <img src={title} alt='' />

                    <p> التحاليل</p>
                </div>




            </div>
            <div ref={divRef} className={classes.containerInfo}>

                {
                    props.info.analysis.length > 0 ? (
                        props.info.analysis.map((item) => {

                            var apiDate = new Date(item.dateRequest); // Assuming the date is in UTC
                            var timeZoneOffset = new Date().getTimezoneOffset() / -60; // Convert to hours and negate
                            var offsetHours = timeZoneOffset;
                            var adjustedDate = new Date(apiDate.getTime() + offsetHours * 60 * 60 * 1000);
                            const options = { year: "numeric", month: "long", day: "numeric" };
                            const formattedAdjustedDate = adjustedDate.toLocaleDateString("ar", options);
                            const hours = adjustedDate.getHours();
                            const minutes = adjustedDate.getMinutes();
                            const dateRequest = `${formattedAdjustedDate}`

                            var apiDate1 = new Date(item.dateUpload); // Assuming the date is in UTC
                            // Convert to hours and negate
                            var adjustedDate1 = new Date(apiDate1.getTime() + offsetHours * 60 * 60 * 1000);

                            const formattedAdjustedDate1 = adjustedDate1.toLocaleDateString("ar", options);
                            const hours1 = adjustedDate1.getHours();
                            const minutes1 = adjustedDate1.getMinutes();
                            const dateUpload = `${formattedAdjustedDate1}`


                            return (

                                <div key={item.id} className={classes.info}>


                                    <div>
                                        <div>
                                            <img src={name} alt='name' />
                                            <p>{item.name}</p>

                                        </div>
                                        {item.isDo === false && <p className={classes.req}>{dateRequest}</p>}
                                        {item.isDo === true && <p className={classes.upl}>{dateUpload}</p>}

                                    </div>

                                    {item.isDo === false ? <p> لم تظهر النتيجة بعد</p> : <button onClick={() => { getResult(item.result, item.isDo) }} className={classes.after}>النتيجة جاهزة<FontAwesomeIcon icon={faLongArrowLeft} /></button>}
                                    

                                </div>


                            )


                        })


                    ) : (<p> لا يوجد تحاليل</p>)
                }
                {isDo1 === true && ModalShowResultofAnalysisIsOpen && <ModalForShowResultofAnalysis close={handleCLoseModalShowResultofAnalysisIsOpen} result={result} />}
            </div>

        </div>
    )
}
