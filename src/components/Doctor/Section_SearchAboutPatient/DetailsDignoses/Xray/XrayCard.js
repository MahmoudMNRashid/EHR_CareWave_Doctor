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
import { useNavigate, useParams } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
export const XrayCard = (props) => {
   
    const { IdSyr, IdDiagnose } = useParams()
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
      
        handleOpenModalShowPhotosofXrayIsOpen()
    }
    // __________________________________________
    const [ModalForAddXrayIsOpen, setModalForAddXrayIsOpen] = useState(false)
    const handleOpenModalForAddXrayIsOpen = _ => setModalForAddXrayIsOpen(true)
    const handleCLoseModalForAddXrayIsOpen = _ => setModalForAddXrayIsOpen(false)



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

                nav(`/DashboardDoctor/HealthRecord/${IdSyr}/${IdDiagnose}`, { replace: true });
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


                {props.info.extra.isHasPermission && !props.info.extra.isHasResult  && <button onClick={handleOpenModalForAddXrayIsOpen}><FontAwesomeIcon icon={faAdd} /> </button>}


            </div>
            <div ref={divRef} className={classes.containerInfo}>

                {
                    props.info.xrays.length > 0 ? (
                        props.info.xrays.map((item) => {

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

                                    {item.isDo === false ? <p> لم تجهز الصور بعد</p> : <button onClick={() => { getPhotos(item.paths, item.isDo) }} className={classes.after}>الصور جاهزة<FontAwesomeIcon icon={faLongArrowLeft} /></button>}
                                    <div className={classes.containerButtons}>
                                        {item.isDo === false && props.info.extra.isHasPermission && <button onClick={() => {
                                            handleCollectData(isDo, item.id, item.name)
                                        }}> <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></button>}
                                        {item.isDo === false && props.info.extra.isHasPermission && <button onClick={() => {
                                            handleDeleteXray(item.id)
                                        }}> <FontAwesomeIcon color='#f05261' icon={faTrashAlt}></FontAwesomeIcon></button>}


                                    </div>

                                </div>


                            )


                        })


                    ) : (<p> لا يوجد صور شعاعية</p>)
                }
                {isDo === false && props.info.extra.isHasPermission && ModalEditXrayIsOpen && <ModalForEditXray close={handleCLoseModalEditXrayIsOpen} info={info}  />}
                {isDo1 === true && ModalShowPhotosofXrayIsOpen && <ModalForShowPhotos close={handleCLoseModalShowPhotosofXrayIsOpen} Photos={Photos} />}
                {props.info.extra.isHasPermission && ModalForAddXrayIsOpen && <ModalForAddXray close={handleCLoseModalForAddXrayIsOpen}  />}
            </div>

            {isLoading && <LoadingBar shadowStyle={{ display: 'none' }} color='#31af99' progress={100} height={5} loaderSpeed={15000} transitionTime={15000} />}
        </div>
    )
}
