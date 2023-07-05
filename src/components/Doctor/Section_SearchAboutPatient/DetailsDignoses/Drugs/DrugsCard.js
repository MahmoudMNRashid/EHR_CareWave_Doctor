import React, { useRef, useState } from 'react'
import classes from './DrugsCard.module.css'
import title from '../../../../../style/DetailsDiagnose/Drugs/medicine.png'
import name from '../../../../../style/DetailsDiagnose/Drugs/drugs.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faAngleDown, faAngleUp, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { getToken } from '../../../../../Util/Auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import { ModalForAddDrugs } from './ModalForAddDrugs'
import { ModalForEditDrugs } from './ModalForEditDrugs'
export const DrugsCard = (props) => {
    // _______________________________________________________
    const [ModalEditDrugsIsOpen, setModalEditDrugsIsOpen] = useState(false)
    const handleOpenModalEditDrugsIsOpen = _ => setModalEditDrugsIsOpen(true)
    const handleCLoseModalEditDrugsIsOpen = _ => setModalEditDrugsIsOpen(false)

    const [isGive, SetisGive] = useState(false)
    const [info, setinfo] = useState({})
    const handleCollectData = (isGive, id, name) => {
        SetisGive(isGive)
        setinfo({ id, name })
        handleOpenModalEditDrugsIsOpen()
    }

    // ________________________________________________________

    const [ModalForAddDrugsIsOpen, setModalForAddDrugsIsOpen] = useState(false)
    const handleOpenModalForAddDrugsIsOpen = _ => setModalForAddDrugsIsOpen(true)
    const handleCLoseModalForAddDrugsIsOpen = _ => setModalForAddDrugsIsOpen(false)


    const infoForaddDrugs = {
        idSyr: props.info.idSyr,
        idDiagnose: props.info.idDiagnose,
        fullPath: props.info.fullPath
    }
    //___________________________________
    const nav = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const handleDeleteDrugs = async (id) => {
        setIsLoading(true)
        try {

            const response = await fetch(`http://localhost:8001/v1/Symptoms/drug/${id}`, {
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
                toast.success('تم الحذف بنجاح', {
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
            if (error.message === `Can't found drug.`) {
                toast.error('!ممنوع الحذف', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

            } else if (error.message === `Can't delete`) {
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
            {props.info.drugs.length > 4 && <button onClick={handleScrollUp} className={classes.up}><FontAwesomeIcon color={'#4f5e75'} icon={faAngleUp} /> </button>}
            {props.info.drugs.length > 4 && <button onClick={handleScrollDown} className={classes.down}><FontAwesomeIcon color={'#4f5e75'} icon={faAngleDown} /> </button>}
            <div className={classes.title}>

                <div>

                    <img src={title} alt='' />

                    <p> الأدوية</p>
                </div>


                {props.info.isHasPermission && <button onClick={handleOpenModalForAddDrugsIsOpen}><FontAwesomeIcon icon={faAdd} /> </button>}


            </div>
            <div ref={divRef} className={classes.containerInfo}>

                {
                    props.info.drugs.length > 0 ? (
                        props.info.drugs.map((item) => {



                            return (

                                <div key={item.id} className={classes.info}>


                                    <div>
                                        <div>
                                            <img src={name} alt='name' />
                                            <p>{item.name}</p>

                                        </div>


                                    </div>

                                    {item.isGive === false ? <p>لم يصرف الدواء بعد </p> : <p>تم الصرف</p>}
                                    <div className={classes.containerButtons}>
                                        {item.isGive === false && props.info.isHasPermission && <button onClick={() => {
                                            handleCollectData(isGive, item.id, item.name)
                                        }}> <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></button>}
                                        {item.isGive === false && props.info.isHasPermission && <button onClick={() => {
                                            handleDeleteDrugs(item.id)
                                        }}> <FontAwesomeIcon color='#f05261' icon={faTrashAlt}></FontAwesomeIcon></button>}


                                    </div>

                                </div>


                            )


                        })


                    ) : (<p> sdsds</p>)
                }
                {isGive === false && props.info.isHasPermission && ModalEditDrugsIsOpen && <ModalForEditDrugs close={handleCLoseModalEditDrugsIsOpen} info={info} idSyr={props.info.idSyr} fullPath={props.info.fullPath} />}

                {props.info.isHasPermission && ModalForAddDrugsIsOpen && <ModalForAddDrugs close={handleCLoseModalForAddDrugsIsOpen} info={infoForaddDrugs} />}
            </div>

            {isLoading && <LoadingBar shadowStyle={{ display: 'none' }} color='#31af99' progress={100} height={5} loaderSpeed={15000} transitionTime={15000} />}
        </div>
    )
}
