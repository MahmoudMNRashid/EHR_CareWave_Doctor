import React, { useRef, useState } from 'react'
import classes from './AnalysisCardForMLS.module.css'
import title from '../../style/DetailsDiagnose/Analysis/blood-tube.png'
import name from '../../style/DetailsDiagnose/Analysis/blood-tube (1).png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp, faLongArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer } from 'react-toastify'
import { ModalForUploadResult } from './ModalForUploadResult'
import { ModalForShowResultofAnalysis } from '../Doctor/Section_SearchAboutPatient/DetailsDignoses/Analysis/ModalForShowResultofAnalysis'
export const AnalysisCardForMLS = (props) => {
    console.log(props)
    // _______________________________________________________


    const [ModalUploadResultIsOpen, setModalUploadResultIsOpen] = useState(false)
    const handleOpenModalUploadResultIsOpen = _ => setModalUploadResultIsOpen(true)
    const handleCLoseModalUploadResultIsOpen = _ => setModalUploadResultIsOpen(false)
    const [id, setid] = useState('')
    const getId = (id) => {
        setid(id)

        handleOpenModalUploadResultIsOpen()
    }
    // __________________________________________

    const [ModalGetResultIsOpen, setModalGetResultIsOpen] = useState(false)
    const handleOpenModalGetResultIsOpen = _ => setModalGetResultIsOpen(true)
    const handleCLoseModalGetResultIsOpen = _ => setModalGetResultIsOpen(false)
    const [result, setresult] = useState('')
    const getresult = (result) => {
        setresult(result)

        handleOpenModalGetResultIsOpen()
    }


    //   __________________________
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
    //  ______________________________  
    return (

        <div className={classes.container}>
            {props.info.length > 4 && <button onClick={handleScrollUp} className={classes.up}><FontAwesomeIcon color={'#4f5e75'} icon={faAngleUp} /> </button>}
            {props.info.length > 4 && <button onClick={handleScrollDown} className={classes.down}><FontAwesomeIcon color={'#4f5e75'} icon={faAngleDown} /> </button>}
            <div className={classes.title}>
                <div>
                    <img src={title} alt='' />
                    <p> طلبات   التحاليل</p>
                </div>


            </div>
            <div ref={divRef} className={classes.containerInfo}>
                {
                    props.info.length > 0 ? (
                        props.info.map((item) => {
                            return (
                                <div key={item.id} className={classes.info}>


                                    <div>
                                        <div>
                                            <img src={name} alt='name' />
                                            <p>{item.name}</p>

                                        </div>


                                    </div>
                                    {item.result === '' ? <button style={{ color: '#ef5261' }} onClick={() => { getId(item.id) }} className={classes.after}> رفع نتيجة التحليل <FontAwesomeIcon icon={faLongArrowLeft} /></button> : <button onClick={() => { getresult(item.result) }} className={classes.after}>  نتيجة التحليل جاهزة <FontAwesomeIcon icon={faLongArrowLeft} /></button>}
                                </div>
                            )
                        })
                    ) : (<p style={{ color: '#4f5e75', fontSize: '26px', fontWeight: '600' }}> لا يوجد طلبات </p>)
                }

                {ModalUploadResultIsOpen && <ModalForUploadResult close={handleCLoseModalUploadResultIsOpen} id={id} />}
                {ModalGetResultIsOpen && <ModalForShowResultofAnalysis close={handleCLoseModalGetResultIsOpen} result={result} />}

            </div>
            <ToastContainer />

        </div>


    )
}
