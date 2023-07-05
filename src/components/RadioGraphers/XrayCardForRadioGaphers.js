import React, { useRef, useState } from 'react'
import classes from './XrayCardForRadioGaphers.module.css'
import title from '../../style/DetailsDiagnose/X-ray/radiograph.png'
import name from '../../style/DetailsDiagnose/X-ray/x-ray.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp, faLongArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { ModalForUploadPhotos } from './ModalForUploadPhotos'
import { ToastContainer } from 'react-toastify'


export const XrayCardForRadioGaphers = (props) => {

    // _______________________________________________________

  
    const [ModalUploadPhotosIsOpen, setModalUploadPhotosIsOpen] = useState(false)
    const handleOpenModalUploadPhotosIsOpen = _ => setModalUploadPhotosIsOpen(true)
    const handleCLoseModalUploadPhotosIsOpen = _ => setModalUploadPhotosIsOpen(false)
    const [id, setid] = useState('')
    const getId = (id) => {
        setid(id)
       

        handleOpenModalUploadPhotosIsOpen()
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
    //  ______________________________
    return (
        <div className={classes.container}>
            {props.info.length > 4 && <button onClick={handleScrollUp} className={classes.up}><FontAwesomeIcon color={'#4f5e75'} icon={faAngleUp} /> </button>}
            {props.info.length > 4 && <button onClick={handleScrollDown} className={classes.down}><FontAwesomeIcon color={'#4f5e75'} icon={faAngleDown} /> </button>}
            <div className={classes.title}>
                <div>
                    <img src={title} alt='' />
                    <p> طلبات  الصور الشعاعية</p>
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

                                    <button onClick={() => { getId(item.id) }} className={classes.after}> رفع الصور<FontAwesomeIcon icon={faLongArrowLeft} /></button>
                                </div>
                            )
                        })
                    ) : (<p style={{color:'#4f5e75' ,fontSize:'26px',fontWeight:'600'}}> لا يوجد طلبات </p>)
                }
                 
                {  ModalUploadPhotosIsOpen && <ModalForUploadPhotos close={handleCLoseModalUploadPhotosIsOpen} id={id} />}
                 
            </div>
<ToastContainer/>

        </div>
    )
}
