import React, { useRef, useState } from 'react'
import classes from './XrayCard1.module.css'
import title from '../../../../style/DetailsDiagnose/X-ray/radiograph.png'
import name from '../../../../style/DetailsDiagnose/X-ray/x-ray.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faAngleDown, faAngleUp,  faLongArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { ModalForShowPhotos } from './ModalForShowPhotos1'

export const XrayCard1 = (props) => {
   
  

    

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
                      

                                </div>


                            )


                        })


                    ) : (<p> لا يوجد صور شعاعية</p>)
                }
                {isDo1 === true && ModalShowPhotosofXrayIsOpen && <ModalForShowPhotos close={handleCLoseModalShowPhotosofXrayIsOpen} Photos={Photos} />}
            </div>

        </div>
    )
}
