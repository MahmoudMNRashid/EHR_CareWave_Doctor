import React, { useState } from 'react'
import ReactDOM from 'react-dom';

import classes from './ModalForAddVaccineOrDiseases.module.css'
import { MainInput } from '../../../../Ui/MainInput';
import { toast } from 'react-toastify';
import { getToken } from '../../../../../Util/Auth';
import LoadingBar from 'react-top-loading-bar'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faClose } from '@fortawesome/free-solid-svg-icons';
const ModalAdd = (props) => {
    const nav = useNavigate();
    const [entereddesc, setEntereddesc] = useState('');
    const [entereddescTouched, setEntereddescTouched] = useState(false);


    const [isLoading, setIsLoading] = useState(false);



    const entereddescIsValid = entereddesc.trim() !== '';
    const descInputIsInvalid = !entereddescIsValid && entereddescTouched;


    let formIsValid = false;

    if (entereddescIsValid) {
        formIsValid = true;
    }
    const descInputChangeHandler = (event) => {
        setEntereddesc(event.target.value);
    };

    const descInputBlurHandler = (event) => {
        setEntereddescTouched(true);
    };

    const formSubmissionHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setEntereddescTouched(true);
        if (!entereddescIsValid) {
            return;
        }

        const info = {
            userId: props.idPatient,
            description: entereddesc,
            classification: props.name === 'vaccines' ? 'Vaccines' : (props.name === 'chronic' ? 'ChronicDisease' : (props.name === 'genetic' ? 'GeneticDisease' : 'DrugAllergy'))
        }


        try {
            const response = await fetch('http://localhost:8000/v1/HelpMedical/AddMedicalInfo', {
                method: 'POST',
                body: JSON.stringify(info),
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
            if (data.data.message === 'Added successfully') {
                toast.success('تم الإضافة بنجاح', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                props.close()
                nav(`/DashboardDoctor/HealthRecord/${props.idSyr}`, { replace: true });
            }





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

        setIsLoading(false);
        setEntereddesc('');
        setEntereddescTouched(false);


    };






    const configurationdescLogin = {
        type: 'text',
        label: props.name === 'vaccines' ? 'اسم اللقاح' : (props.name === 'chronic' ? 'اسم المرض المزمن' : (props.name === 'genetic' ? 'اسم المرض الوراثي' : 'اسم المرض التحسسي'))
    }
    return (
        <div className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">

            <div className={classes.wrapper}>
                <div className={classes.first}>
                    <FontAwesomeIcon className={classes.icon} icon={faAdd} />
                </div>
                <div className={classes.second}>
                    <MainInput
                        configuration={configurationdescLogin}
                        onChange={descInputChangeHandler}
                        onBlur={descInputBlurHandler}
                        value={entereddesc}
                        isInvalid={descInputIsInvalid}
                    />
                    {descInputIsInvalid && (
                        <p className={`error-text`}>الحقل فارغ!</p>
                    )}
                </div>
                <div className={classes.third}>
                    <div className={classes.buttonwrapper}>
                        <button onClick={formSubmissionHandler} disabled={!formIsValid} className={classes.btn}> <FontAwesomeIcon icon={faAdd} /> </button>
                        <button onClick={() => {
                            props.close()
                        }} className={classes.btn}><FontAwesomeIcon icon={faClose} /></button>
                    </div>

                </div>
            </div>



            {isLoading && <LoadingBar shadowStyle={{ display: 'none' }} color='#31af99' progress={100} height={5} loaderSpeed={15000} transitionTime={15000} />
            }        </div>
    )
}
export const ModalForAddVaccineOrDiseases = (props) => {
    return (

        ReactDOM.createPortal(<ModalAdd close={props.close} idPatient={props.idPatient} idSyr={props.idSyr} name={props.name} />, document.getElementById('modal'))

    )
}
