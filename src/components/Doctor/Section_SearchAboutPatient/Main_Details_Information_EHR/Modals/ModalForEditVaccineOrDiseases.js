import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import classes from './ModalForEditVaccineOrDiseases.module.css'
import { MainInput } from '../../../../Ui/MainInput';
import { toast } from 'react-toastify';
import { getToken } from '../../../../../Util/Auth';
import LoadingBar from 'react-top-loading-bar'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faClose } from '@fortawesome/free-solid-svg-icons';
const ModalEdit = (props) => {
    console.log(props.information.date)
    const nav = useNavigate();
    const [entereddesc, setEntereddesc] = useState(props.information.desc);
    const [entereddescTouched, setEntereddescTouched] = useState(false);


    let date;
    if (props.information.date !== null || props.information.date!=='' ) {
        // Original date string
        var originalDate = props.information.date?props.information.date:'';

        // Split the original date into components
        var dateComponents = originalDate.split('/');

        // Create a new Date object using the components
        var dateObject = new Date(dateComponents[2], dateComponents[0] - 1, dateComponents[1]);

        // Extract year, month, and day from the Date object
        var year = dateObject.getFullYear();
        var month = String(dateObject.getMonth() + 1).padStart(2, '0');
        var day = String(dateObject.getDate()).padStart(2, '0');

        // Form the formatted date string in "yyyy-MM-dd" format
        var formattedDate = year + '-' + month + '-' + day;

        date = formattedDate
    }








    const [enteredBirthDay, setEnteredBirthDay] = useState(`${props.information.date !== null ? date : ''}`);
    const [enteredBirthDayTouched, setEnteredBirthDayTouched] = useState(false);

    const [isLoading, setIsLoading] = useState(false);



    const entereddescIsValid = entereddesc.trim() !== '';
    const descInputIsInvalid = !entereddescIsValid && entereddescTouched;



    const enteredBirthDayIsValid = enteredBirthDay !== '';
    const BirthDayInputIsInvalid = !enteredBirthDayIsValid && enteredBirthDayTouched;



    let formIsValid = false;

    if (props.name === 'vaccines') {
        if (entereddescIsValid && enteredBirthDayIsValid) {
            formIsValid = true
        }
    } else {

        if (entereddescIsValid) {
            formIsValid = true;
        }
    }

    const descInputChangeHandler = (event) => {
        setEntereddesc(event.target.value);
    };

    const descInputBlurHandler = (event) => {
        setEntereddescTouched(true);
    };
    const BirthDayInputChangeHandler = (event) => {
        setEnteredBirthDay(event.target.value);
    };

    const BirthDayInputBlurHandler = (event) => {
        setEnteredBirthDayTouched(true);
    };

    const formSubmissionHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        if (props.name === 'vaccines') {
            setEntereddescTouched(true)
            setEnteredBirthDayTouched(true)
            if (!entereddescIsValid && !entereddescIsValid) {
                return;
            }

            const info = {
                id: props.information.id,
                userId: props.information.idPatient,
                description: entereddesc,
                date: enteredBirthDay
            }


            try {
                const response = await fetch('http://localhost:8000/v1/HelpMedical/updateVaccine', {
                    method: 'PUT',
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
                if (data.data.message === 'Updated successfully') {
                    toast.success('تم التحديث بنجاح', {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                    props.close()
                    nav(`/DashboardDoctor/HealthRecord/${props.information.idSyr}`, { replace: true });
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
            
            setEntereddescTouched(false);

        } else {
            setEntereddescTouched(true)
            if (!entereddescIsValid) {
                return;
            }

            const info = {
                id: props.information.id,
                userId: props.information.idPatient,
                description: entereddesc,
                classification: props.name === 'vaccines' ? 'Vaccines' : (props.name === 'chronic' ? 'ChronicDisease' : (props.name === 'genetic' ? 'GeneticDisease' : 'DrugAllergy'))
            }


            try {
                const response = await fetch('http://localhost:8000/v1/HelpMedical/updateMedicalInfo', {
                    method: 'PUT',
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
                if (data.data.message === 'Updated successfully') {
                    toast.success('تم التحديث بنجاح', {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                    props.close()
                    nav(`/DashboardDoctor/HealthRecord/${props.information.idSyr}`, { replace: true });
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
        }



    };






    const configurationdescLogin = {
        type: 'text',
        label: props.name === 'vaccines' ? 'اسم اللقاح' : (props.name === 'chronic' ? 'اسم المرض المزمن' : (props.name === 'genetic' ? 'اسم المرض الوراثي' : 'اسم المرض التحسسي'))
    }

    const configurationBirthDaySignUp = {
        type: 'date',
        label: 'تاريخ أخذ اللقاح'

    }
    return (
        <div className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">

            <div className={classes.wrapper}>
                <div className={classes.first}>
                    <FontAwesomeIcon className={classes.icon} icon={faPen} />
                </div>
                <div className={classes.second}>
                    <div className='hight'>
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
                    {props.name === 'vaccines' && <div className='height'>
                        <MainInput
                            configuration={configurationBirthDaySignUp}
                            onChange={BirthDayInputChangeHandler}
                            onBlur={BirthDayInputBlurHandler}
                            value={enteredBirthDay}
                            isInvalid={BirthDayInputIsInvalid}
                        />
                        {BirthDayInputIsInvalid && <p className='error-text'>تاريخ الميلاد فارغ.</p>}
                    </div>}
                </div>
                <div className={classes.third}>
                    <div className={classes.buttonwrapper}>
                        <button onClick={formSubmissionHandler} disabled={!formIsValid} className={classes.btn}> <FontAwesomeIcon icon={faPen} /> </button>
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
export const ModalForEditVaccineOrDiseases = (props) => {
    return (

        ReactDOM.createPortal(<ModalEdit close={props.close} information={props.information} name={props.name} />, document.getElementById('modal'))

    )
}
