import React, { useRef, useState } from 'react'
import classes from './AnalysisCard.module.css'
import title from '../../../../../style/DetailsDiagnose/Analysis/blood-tube.png'
import name from '../../../../../style/DetailsDiagnose/Analysis/blood-tube (1).png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faAngleDown, faAngleUp, faEdit, faLongArrowLeft, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { ModalForEditAnalysis } from './ModalForEditAnalysis'
import { ModalForShowResultofAnalysis } from './ModalForShowResultofAnalysis'
import { ModalForAddAnalysis } from './ModalForAddAnalysis'
import { getToken } from '../../../../../Util/Auth'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'

export const AnalysisCard = (props) => {
   
    const { IdSyr, IdDiagnose } = useParams()
    // _______________________________________________________
    const [ModalEditAnalysisIsOpen, setModalEditAnalysisIsOpen] = useState(false)
    const handleOpenModalEditAnalysisIsOpen = _ => setModalEditAnalysisIsOpen(true)
    const handleCLoseModalEditAnalysisIsOpen = _ => setModalEditAnalysisIsOpen(false)

    const [isDo, SetIsDo] = useState(false)
    const [info, setinfo] = useState({})
    const handleCollectData = (isDo, id, name) => {
        SetIsDo(isDo)
        setinfo({ id, name })
        handleOpenModalEditAnalysisIsOpen()
    }

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
    const [ModalForAddAnalysisIsOpen, setModalForAddAnalysisIsOpen] = useState(false)
    const handleOpenModalForAddAnalysisIsOpen = _ => setModalForAddAnalysisIsOpen(true)
    const handleCLoseModalForAddAnalysisIsOpen = _ => setModalForAddAnalysisIsOpen(false)



    //___________________________________
    const nav = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const handleDeleteAnalysis = async (id) => {
        try {
            setIsLoading(true)
            const response = await fetch(`http://localhost:8001/v1/Symptoms/Analysis/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${getToken()} `

                },


            });
            if (!response.ok) {
                const data = await response.json()
                throw data;
            }
            const data = await response.json()
            if (data.data.message === 'Delete successfully.') {
                toast.success('تم التحديث بنجاح', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })

                nav(`/DashboardDoctor/HealthRecord/${IdSyr}/${IdDiagnose}`, { replace: true });
            }


        } catch (error) {
            if (error.message === `Can't found analysis.`) {
                toast.error('!ممنوع الحذف', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

            } else if (error.message === `Can't delete.`) {
                toast.error('!ممنوع الحذف', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

            } else {
                toast.error('!حدث خطأ ما', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

            }
        }
        setIsLoading(false)
    }

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


                {props.info.extra.isHasPermission && !props.info.extra.isHasResult && <button onClick={handleOpenModalForAddAnalysisIsOpen}><FontAwesomeIcon icon={faAdd} /> </button>}


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
                                    <div className={classes.containerButtons}>
                                        {item.isDo === false && props.info.extra.isHasPermission && <button onClick={() => {
                                            handleCollectData(isDo, item.id, item.name)
                                        }}> <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></button>}
                                        {item.isDo === false && props.info.extra.isHasPermission && <button onClick={() => {
                                            handleDeleteAnalysis(item.id)
                                        }}> <FontAwesomeIcon color='#f05261' icon={faTrashAlt}></FontAwesomeIcon></button>}


                                    </div>

                                </div>


                            )


                        })


                    ) : (<p> لا يوجد تحاليل</p>)
                }
                {isDo === false && props.info.extra.isHasPermission && ModalEditAnalysisIsOpen && <ModalForEditAnalysis close={handleCLoseModalEditAnalysisIsOpen} info={info} idSyr={props.info.idSyr} fullPath={props.info.fullPath} />}
                {isDo1 === true && ModalShowResultofAnalysisIsOpen && <ModalForShowResultofAnalysis close={handleCLoseModalShowResultofAnalysisIsOpen} result={result} />}
                {props.info.extra.isHasPermission && ModalForAddAnalysisIsOpen && <ModalForAddAnalysis close={handleCLoseModalForAddAnalysisIsOpen} />}
            </div>

            {isLoading && <LoadingBar shadowStyle={{ display: 'none' }} color='#31af99' progress={100} height={5} loaderSpeed={15000} transitionTime={15000} />}
        </div>
    )
}
