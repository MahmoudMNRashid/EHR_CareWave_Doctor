
import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import classes from './ModalForEditSurgery.module.css'
import { MainInput } from '../../../../Ui/MainInput';
import { toast } from 'react-toastify';
import { getToken } from '../../../../../Util/Auth';
import LoadingBar from 'react-top-loading-bar'
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faPen } from '@fortawesome/free-solid-svg-icons';
import { MainTextArea } from '../../../../Ui/MainTextArea'
const ModalEdit = (props) => {
    const { IdSyr, IdDiagnose } = useParams()
    const nav = useNavigate();
    const [entereddesc, setEntereddesc] = useState(props.info.name);
    const [entereddescTouched, setEntereddescTouched] = useState(false);

    const [enteredDesc, setEnteredDesc] = useState(props.info.desc);
    const [enteredDescTouched, setEnteredDescTouched] = useState(false);


    const [isLoading, setIsLoading] = useState(false);



    const entereddescIsValid = entereddesc.trim() !== '';
    const descInputIsInvalid = !entereddescIsValid && entereddescTouched;
    const enteredDescIsValid = enteredDesc.trim() !== '';
    const DescInputIsInvalid = !enteredDescIsValid && enteredDescTouched;


    let formIsValid = false;

    if (entereddescIsValid && enteredDescIsValid) {
        formIsValid = true;
    }
    const descInputChangeHandler = (event) => {
        setEntereddesc(event.target.value);
    };
    const DescInputChangeHandler = (event) => {
        setEnteredDesc(event.target.value);
    };

    const descInputBlurHandler = (event) => {
        setEntereddescTouched(true);
    };
    const DescInputBlurHandler = (event) => {
        setEnteredDescTouched(true);
    };

    const formSubmissionHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setEntereddescTouched(true);
        if (!entereddescIsValid && !enteredDescIsValid) {
            return;
        }

        const info = {
            surgeryId: props.info.id,
            name: entereddesc,
            description: enteredDesc,
        }

        console.log(info)
        try {
            const response = await fetch('http://localhost:8001/v1/Symptoms/surgery', {
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
            console.log(data.data.message)
            if (data.data.message === 'Updated successfully.') {
                toast.success('تم تعديل طلب العملية بنجاح', {
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





        } catch (error) {
            const hasErrors = error.errors ? true : false;
            if (hasErrors
            ) {
                toast.warning('أحد الحقول فارغة', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            }else if(error.message===`Can't found surgery.`){
                toast.error('ممنوع التعديل', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,

                })

            }else if (error.message===`Can't update.`){
                toast.error('ممنوع التعديل', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,

                })
            }
             else {
                toast.error('حدث خطأ ما الرجاء إعادة المحاولة', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,

                })
            }



        };
        setIsLoading(false);
        setEntereddesc('');
        setEntereddescTouched(false);
        setEnteredDesc('');
        setEnteredDescTouched(false);
        props.close()
    }





    const configurationdescLogin = {
        type: 'text',
        label: 'اسم العملية'
    }


    return (
        <div className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">

            <div className={classes.wrapper}>
                <div className={classes.first}>
                    <FontAwesomeIcon className={classes.icon} icon={faPen} />
                </div>
                <div className={classes.second}>
                    <div>
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
                    <div>

                        <MainTextArea
                            onChange={DescInputChangeHandler}
                            onBlur={DescInputBlurHandler}
                            value={enteredDesc}
                            isInvalid={DescInputIsInvalid}
                            label={'نص النصيحة'}
                        >
                        </MainTextArea>
                        {DescInputIsInvalid && (
                            <p className={`error-text`}>الحقل فارغ!</p>
                        )}

                    </div>
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
export const ModalForEditSurgery = (props) => {

    return (

        ReactDOM.createPortal(<ModalEdit close={props.close} info={props.info}  />, document.getElementById('modal'))

    )
}
