import React, { useRef, useState } from 'react'
import classes from './XrayCard.module.css'
import title from '../../../../../style/DetailsDiagnose/X-ray/radiograph.png'
import name from '../../../../../style/DetailsDiagnose/X-ray/x-ray.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faAngleDown, faAngleUp, faEdit, faLongArrowLeft, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { ModalForEditXray } from './ModalForEditXray'
import { ModalForShowPhotos } from './ModalForShowPhotos'
import { ModalForAddXray } from './ModalForAddXray'
import { getToken } from '../../../../../Util/Auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
export const XrayCard = (props) => {
    // _______________________________________________________
    const [ModalEditXrayIsOpen, setModalEditXrayIsOpen] = useState(false)
    const handleOpenModalEditXrayIsOpen = _ => setModalEditXrayIsOpen(true)
    const handleCLoseModalEditXrayIsOpen = _ => setModalEditXrayIsOpen(false)

    const [isDo, SetIsDo] = useState(false)
    const [info, setinfo] = useState({})
    const handleCollectData = (isDo, id, name) => {
        SetIsDo(isDo)
        setinfo({ id, name })
        handleOpenModalEditXrayIsOpen()
    }

    // ________________________________________________________
    const [isDo1, setIsDo1] = useState(false)
    const [ModalShowPhotosofXrayIsOpen, setModalShowPhotosofXrayIsOpen] = useState(false)
    const handleOpenModalShowPhotosofXrayIsOpen = _ => setModalShowPhotosofXrayIsOpen(true)
    const handleCLoseModalShowPhotosofXrayIsOpen = _ => setModalShowPhotosofXrayIsOpen(false)
    const [Photos, setPhotos] = useState([])
    const getPhotos = (Photos, isDo) => {
        setPhotos(Photos)
        setIsDo1(isDo)
        console.log(Photos)
        handleOpenModalShowPhotosofXrayIsOpen()
    }
    // __________________________________________
    const [ModalForAddXrayIsOpen, setModalForAddXrayIsOpen] = useState(false)
    const handleOpenModalForAddXrayIsOpen = _ => setModalForAddXrayIsOpen(true)
    const handleCLoseModalForAddXrayIsOpen = _ => setModalForAddXrayIsOpen(false)


    const infoForaddXray = {
        idSyr: props.info.idSyr,
        idDiagnose: props.info.idDiagnose,
        fullPath: props.info.fullPath
    }
    //___________________________________
    const nav = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const handleDeleteXray = async (id) => {
        try {

            const response = await fetch(`http://localhost:8001/v1/Symptoms/x_ray/${id}`, {
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
            if (data.data.message === 'Updated successfully.') {
                toast.success('تم التحديث بنجاح', {
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
            setIsLoading(false)

        } catch (error) {
            if (error.message === `Can't found x_ray.`) {
                toast.error('!ممنوع الحذف', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

            } else if (error.message === `Can't update.`) {
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


    }
    // _______________________________________

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
            {props.info.xrays.length > 4 && <button onClick={handleScrollUp} className={classes.up}><FontAwesomeIcon color={'#4f5e75'} icon={faAngleUp} /> </button>}
            {props.info.xrays.length > 4 && <button onClick={handleScrollDown} className={classes.down}><FontAwesomeIcon color={'#4f5e75'} icon={faAngleDown} /> </button>}
            <div className={classes.title}>

                <div>

                    <img src={title} alt='' />

                    <p> الصور الشعاعية</p>
                </div>


                {props.info.isHasPermission && <button onClick={handleOpenModalForAddXrayIsOpen}><FontAwesomeIcon icon={faAdd} /> </button>}


            </div>
            <div ref={divRef} className={classes.containerInfo}>

                {
                    props.info.xrays.length > 0 ? (
                        props.info.xrays.map((item) => {



                            return (

                                <div key={item.id} className={classes.info}>


                                    <div>
                                        <div>
                                            <img src={name} alt='name' />
                                            <p>{item.name}</p>

                                        </div>


                                    </div>

                                    {item.isDo === false ? <p> لم تجهز الصور بعد</p> : <button onClick={() => { getPhotos(item.paths, item.isDo) }} className={classes.after}>الصور جاهزة<FontAwesomeIcon icon={faLongArrowLeft} /></button>}
                                    <div className={classes.containerButtons}>
                                        {item.isDo === false && props.info.isHasPermission && <button onClick={() => {
                                            handleCollectData(isDo, item.id, item.name)
                                        }}> <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></button>}
                                        {item.isDo === false && props.info.isHasPermission && <button onClick={() => {
                                            handleDeleteXray(item.id)
                                        }}> <FontAwesomeIcon color='#f05261' icon={faTrashAlt}></FontAwesomeIcon></button>}


                                    </div>

                                </div>


                            )


                        })


                    ) : (<p> sdsds</p>)
                }
                {isDo === false && props.info.isHasPermission && ModalEditXrayIsOpen && <ModalForEditXray close={handleCLoseModalEditXrayIsOpen} info={info} idSyr={props.info.idSyr} fullPath={props.info.fullPath} />}
                {isDo1 === true && ModalShowPhotosofXrayIsOpen && <ModalForShowPhotos close={handleCLoseModalShowPhotosofXrayIsOpen} Photos={Photos} />}
                {props.info.isHasPermission && ModalForAddXrayIsOpen && <ModalForAddXray close={handleCLoseModalForAddXrayIsOpen} info={infoForaddXray} />}
            </div>

            {isLoading && <LoadingBar shadowStyle={{ display: 'none' }} color='#31af99' progress={100} height={5} loaderSpeed={15000} transitionTime={15000} />}
        </div>
    )
}
