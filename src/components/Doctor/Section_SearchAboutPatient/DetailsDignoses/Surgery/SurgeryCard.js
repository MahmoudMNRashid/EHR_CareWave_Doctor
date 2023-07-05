import React, { useState } from 'react'
import classes from './SurgeryCard.module.css'
import title from '../../../../../style/DetailsDiagnose/Surgery/surgery.png'
import res from '../../../../../style/DetailsDiagnose/Surgery/notepad.png'
import name from '../../../../../style/DetailsDiagnose/Surgery/surgery (1).png'
import desc from '../../../../../style/DetailsDiagnose/Surgery/info.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faEdit, faLongArrowLeft, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { getRole, getToken } from '../../../../../Util/Auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import { ModalForAddSurgery } from './ModalForAddSurgery'
import { ModalForEditSurgery } from './ModalForEditSurgery'
import { ModalForAddResultofSurgery } from './ModalForAddResultofSurgery'
import { ModalForShowResult } from './ModalForShowResult'
export const SurgeryCard = (props) => {
  
    // _______________________________________________________
    const [ModalEditSurgeryIsOpen, setModalEditSurgeryIsOpen] = useState(false)
    const handleOpenModalEditSurgeryIsOpen = _ => setModalEditSurgeryIsOpen(true)
    const handleCLoseModalEditSurgeryIsOpen = _ => setModalEditSurgeryIsOpen(false)

    const [isDo, SetIsDo] = useState(false)
    const [info, setinfo] = useState({})
    const handleCollectData = (isDo, id, name, desc) => {
        SetIsDo(isDo)
        setinfo({ id, name, desc })
        handleOpenModalEditSurgeryIsOpen()
    }

    // ________________________________________________________
    const [isDo1, setIsDo1] = useState(false)
    const [ModalShowResultofSurgeryIsOpen, setModalShowResultofSurgeryIsOpen] = useState(false)
    const handleOpenModalShowResultofSurgeryIsOpen = _ => setModalShowResultofSurgeryIsOpen(true)
    const handleCLoseModalShowResultofSurgeryIsOpen = _ => setModalShowResultofSurgeryIsOpen(false)
    const [result, setresult] = useState({})
    const getResult = (name,description,descriptionresult,successRate,isDo) => {
        setresult(
            {name,description,descriptionresult,successRate}
        )
        setIsDo1(isDo)
        
        handleOpenModalShowResultofSurgeryIsOpen()
    }
    // __________________________________________
    const [ModalForAddSurgeryisIsOpen, setModalForAddSurgeryIsOpen] = useState(false)
    const handleOpenModalForAddSurgeryIsOpen = _ => setModalForAddSurgeryIsOpen(true)
    const handleCLoseModalForAddSurgeryIsOpen = _ => setModalForAddSurgeryIsOpen(false)


    const infoForaddSurgery = {
        idSyr: props.info.idSyr,
        idDiagnose: props.info.idDiagnose,
        fullPath: props.info.fullPath
    }
    //___________________________________
    const [ModalForAddResultofSurgeryIsOpen, setModalForAddResultofSurgeryIsOpen] = useState(false)
    const handleOpenModalForAddResultofSurgeryIsOpen = _ => setModalForAddResultofSurgeryIsOpen(true)
    const handleCLoseModalForAddResultofSurgeryIsOpen = _ => setModalForAddResultofSurgeryIsOpen(false)

    const [idSurgery, setidSurgery] = useState('')
    const infoForaddResultofSurgery = {
        idSyr: props.info.idSyr,
        idDiagnose: props.info.idDiagnose,
        fullPath: props.info.fullPath
    }

    const getidSurgery = (id) => {
        setidSurgery(id)
        handleOpenModalForAddResultofSurgeryIsOpen()
    }
    // ________________________________________________________
    const nav = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const handleDeleteAnalysis = async (id) => {
        try {
            setIsLoading(true)
            const response = await fetch(`http://localhost:8001/v1/Symptoms/surgery/${id}`, {
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
            if (data.data.message === 'deleted successfully.') {
                toast.success('تم الحذف  بنجاح', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })

                nav(`/DashboardDoctor/HealthRecord/${props.info.idSyr}/${props.info.fullPath}`, { replace: true });
            }


        } catch (error) {
            if (error.message === `Can't found surgery.`) {
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






    return (
        <div className={classes.container}>

            <div className={classes.title}>

                <div>

                    <img src={title} alt='' />

                    <p> العمليات الجراحية</p>
                </div>


                {props.info.isHasPermission==='true' && props.info.surgery.length === 0 && <button onClick={handleOpenModalForAddSurgeryIsOpen}><FontAwesomeIcon icon={faAdd} /> </button>}


            </div>
            <div className={classes.containerInfo}>

                {
                    props.info.surgery.length > 0 ? (
                        props.info.surgery.map((item) => {


                            return (

                                <div key={item.id} className={classes.info}>


                                    <div className={classes.one} >
                                        <div className={classes.one1}>
                                            <div className={classes.one11}>
                                                <img src={name} alt='name' />
                                                <p>{item.name}</p>
                                            </div>
                                            <div className={classes.one11}>
                                                <img src={desc} alt='' />
                                                <p>{item.description}</p>
                                            </div>
                                        </div>

                                        {item.isDo === false && getRole() === 'doctor' && <button onClick={() => { getidSurgery(item.id) }}> <img src={res} alt='add-Result' /> </button>}
                                    </div>

                                    {item.isDo === false ? <p> لم تظهر نتيجة العملية  بعد</p> : <button onClick={() => { getResult(item.name, item.description,item.descriptionresult,item.successRate,item.isDo) }} className={classes.after}>النتيجة جاهزة<FontAwesomeIcon icon={faLongArrowLeft} /></button>}

                                    <div className={classes.containerButtons}>
                                        {item.isDo === false && props.info.isHasPermission && <button onClick={() => {
                                            handleCollectData(isDo, item.id, item.name, item.description)
                                        }}> <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></button>}
                                        {item.isDo === false && props.info.isHasPermission && <button onClick={() => {
                                            handleDeleteAnalysis(item.id)
                                        }}> <FontAwesomeIcon color='#f05261' icon={faTrashAlt}></FontAwesomeIcon></button>}


                                    </div>

                                </div>


                            )


                        })


                    ) : (<p> sdsds</p>)
                }
                {isDo === false && props.info.isHasPermission && ModalEditSurgeryIsOpen && <ModalForEditSurgery close={handleCLoseModalEditSurgeryIsOpen} info={info} fullPath={props.info.fullPath} idSyr={props.info.idSyr} />}
                {/* {isDo1 === true && ModalShowResultofAnalysisIsOpen && <ModalForShowResultofAnalysis close={handleCLoseModalShowResultofAnalysisIsOpen} result={result} />} */}
                {props.info.isHasPermission && ModalForAddSurgeryisIsOpen && <ModalForAddSurgery close={handleCLoseModalForAddSurgeryIsOpen} info={infoForaddSurgery} />}
                {  ModalForAddResultofSurgeryIsOpen&& <ModalForAddResultofSurgery close={handleCLoseModalForAddResultofSurgeryIsOpen} id={idSurgery} info={infoForaddResultofSurgery}/>}
                    { isDo1&& ModalShowResultofSurgeryIsOpen  && <ModalForShowResult close={handleCLoseModalShowResultofSurgeryIsOpen} info={result}/>}
            </div>

            {isLoading && <LoadingBar shadowStyle={{ display: 'none' }} color='#31af99' progress={100} height={5} loaderSpeed={15000} transitionTime={15000} />}
        </div>
    )
}
