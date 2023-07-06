import React from 'react'
import ReactDOM from 'react-dom';
import classes from './ModalForUploadResult.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faUpload } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getToken } from '../../Util/Auth';
import { toast } from 'react-toastify';
import { MainTextArea } from '../Ui/MainTextArea'
import LoadingBar from 'react-top-loading-bar';
const ModalAdd = (props) => {
    console.log(typeof (props.id))
    const { IdSyr, IdDiagnose } = useParams()
    const [isLoading, setIsLoading] = useState(false);
    const [enteredDesc, setEnteredDesc] = useState('');
    const [enteredDescTouched, setEnteredDescTouched] = useState(false);

    const enteredDescIsValid = enteredDesc.trim() !== '';
    const DescInputIsInvalid = !enteredDescIsValid && enteredDescTouched;

    let formisValid = false
    if (enteredDescIsValid) {
        formisValid = true
    }

    const DescInputChangeHandler = (event) => {
        setEnteredDesc(event.target.value);
    };


    const DescInputBlurHandler = (event) => {
        setEnteredDescTouched(true);
    };

    const nav = useNavigate()

    const handleUpload = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setEnteredDescTouched(true);
        if (!enteredDescIsValid) {
            return;
        }
        const info = {
            analysisId: props.id,
            description: enteredDesc,
        }
       
        const arrayinfo = [];
        arrayinfo.push(info)
   
        try {
            const response = await fetch('http://localhost:8001/v1/Aid/give/analysis', {
                method: 'POST',
                body: JSON.stringify(arrayinfo),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${getToken()} `
                }

            })
          
            if (!response.ok) {
                const data = await response.json()
                throw data;
            }
            const data = await response.json()

            if (data.data.message === 'Updated successfully.') {
                toast.success('تم رفع النتيجة', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                nav(`/DashboardMLS/DiagnosesOfPatient/${IdSyr}/${IdDiagnose}`, { replace: true });


            }


        } catch (error) {


            const hasErrors = error.errors ? true : false;
            if (hasErrors) {
                toast.warning('أحد الحقول فارغة', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            } else {
                toast.error('! حدث خطأ ما', {
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
        setIsLoading(false);
        props.close()
    };
    return (
        <div className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
            <div className={classes.container} >
                <div className={classes.title}>
                    <p> رفع  نتيجة تحليل </p>
                    <button onClick={props.close}> <FontAwesomeIcon icon={faClose} /></button>
                </div>


                <div className={classes.u}>
                    <MainTextArea
                        onChange={DescInputChangeHandler}
                        onBlur={DescInputBlurHandler}
                        value={enteredDesc}
                        isInvalid={DescInputIsInvalid}
                        label={' نتيجة التحليل'}
                    />
                </div>

                <button disabled={!formisValid} onClick={handleUpload} className={classes.btn} ><FontAwesomeIcon color='#4f5e75' icon={faUpload} /></button>

{isLoading &&  <LoadingBar shadowStyle={{ display: 'none' }} color='#31af99' progress={100} height={5} loaderSpeed={15000} transitionTime={15000} />}

            </div>

        </div>
    )
}
export const ModalForUploadResult = (props) => {

    return (

        ReactDOM.createPortal(<ModalAdd close={props.close} id={props.id} />, document.getElementById('modal'))

    )
}
