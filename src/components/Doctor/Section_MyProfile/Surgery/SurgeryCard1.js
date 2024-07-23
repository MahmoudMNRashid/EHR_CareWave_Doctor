import React, { useState } from 'react'
import classes from './SurgeryCard1.module.css'
import title from '../../../../style/DetailsDiagnose/Surgery/surgery.png'
import name from '../../../../style/DetailsDiagnose/Surgery/surgery (1).png'
import desc from '../../../../style/DetailsDiagnose/Surgery/info.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faLongArrowLeft } from '@fortawesome/free-solid-svg-icons'
import {  getToken } from '../../../../Util/Auth'
import { toast } from 'react-toastify'
import LoadingBar from 'react-top-loading-bar'
import { ModalForShowResult } from './ModalForShowResult1'
export const SurgeryCard1 = (props) => {
    
const [isLoading,setIsLoading]=useState(false)

    // ________________________________________________________
    const [isDo1, setIsDo1] = useState(false)
    const [ModalShowResultofSurgeryIsOpen, setModalShowResultofSurgeryIsOpen] = useState(false)
    const handleOpenModalShowResultofSurgeryIsOpen = _ => setModalShowResultofSurgeryIsOpen(true)
    const handleCLoseModalShowResultofSurgeryIsOpen = _ => setModalShowResultofSurgeryIsOpen(false)
    const [result, setresult] = useState({})
    const getResult = async (name, description, descriptionresult, successRate, isDo, dateRequest, dateUpload, doctorId) => {

        try {
            setIsLoading(true)
            const response = await fetch(`http://localhost:8000/v1/User/get-doctors/byid/${doctorId}`, {
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

            setIsLoading(false)


            setresult(
                { name, description, descriptionresult, successRate, dateRequest, dateUpload, syriddoctor: data.data.result[0].syrid }
            )

            setIsDo1(isDo)

            handleOpenModalShowResultofSurgeryIsOpen()


        } catch (error) {
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
    // __________________________________________
  







    return (
        <div className={classes.container}>

            {!props.info.extra.isHasResult && (
                <div className={classes.disabledOverlay}>
                    <p>لا يمكن أضافة عملية حتى ظهور النتيجة</p>
                </div>
            )}
            <div className={`${classes.content} ${!props.info.extra.isHasResult ? classes.disabledContent : ''}`}>
                <div className={classes.title}>

                    <div>

                        <img src={title} alt='' />

                        <p> العمليات الجراحية</p>
                    </div>




                </div>
                <div className={classes.containerInfo}>

                    {
                        props.info.surgery.length > 0 ? (
                            props.info.surgery.map((item) => {

                                var apiDate = new Date(item.dateRequest); // Assuming the date is in UTC
                                var timeZoneOffset = new Date().getTimezoneOffset() / -60; // Convert to hours and negate
                                var offsetHours = timeZoneOffset;
                                var adjustedDate = new Date(apiDate.getTime() + offsetHours * 60 * 60 * 1000);
                                const options = { year: "numeric", month: "long", day: "numeric" };
                                const formattedAdjustedDate = adjustedDate.toLocaleDateString("ar", options);
                                const hours = adjustedDate.getHours();
                                const minutes = adjustedDate.getMinutes();
                                const dateRequest = `${formattedAdjustedDate}`

                                return (

                                    <div key={item.id} className={classes.info}>

                                       
                                        { !item.isDo &&  <p className={classes.req}>{dateRequest}</p>    }
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

                                        </div>

                                        {item.isDo === false ? <p> لم تظهر نتيجة العملية  بعد</p> : <button onClick={() => { getResult(item.name, item.description, item.descriptionresult, item.successRate, item.isDo, item.dateRequest, item.dateUpload, item.doctorId) }} className={classes.after}>النتيجة جاهزة<FontAwesomeIcon icon={faLongArrowLeft} /></button>}

                                        

                                    </div>


                                )


                            })


                        ) : (<p> لا يوجد عمليات</p>)
                    }

                    {isDo1 && ModalShowResultofSurgeryIsOpen && <ModalForShowResult close={handleCLoseModalShowResultofSurgeryIsOpen} info={result} />}
                </div>
                {isLoading && <LoadingBar shadowStyle={{ display: 'none' }} color='#31af99' progress={100} height={5} loaderSpeed={15000} transitionTime={15000} />}
            </div>


        </div>
    )
}
