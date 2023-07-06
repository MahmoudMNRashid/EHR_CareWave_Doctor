import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import classes from './ModalForEditXray.module.css'
import { MainInput } from '../../../../Ui/MainInput';
import { toast } from 'react-toastify';
import { getToken } from '../../../../../Util/Auth';
import LoadingBar from 'react-top-loading-bar'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faClose } from '@fortawesome/free-solid-svg-icons';
const ModalEdit = (props) => {
    const nav = useNavigate();
    const [entereddesc, setEntereddesc] = useState(props.info.name);
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
            x_rayId: props.info.id,
            description: entereddesc,
        }

        console.log(info)
        try {
            const response = await fetch('http://localhost:8001/v1/Symptoms/x_ray', {
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
                nav(`/DashboardDoctor/HealthRecord/${props.idSyr}/${props.fullPath}`, { replace: true });
            }





        } catch (error) {
            if (error.message === `Can't found x_ray.`) {
                toast.error('!ممنوع التعديل', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

            } else if (error.message === `Can't update.`) {
                toast.error('!ممنوع التعديل', {
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

        setIsLoading(false);
        setEntereddesc('');
        setEntereddescTouched(false);


    };






    const configurationdescLogin = {
        type: 'text',
        label: 'اسم التحليل'
    }
    return (
        <div className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">

            <div className={classes.wrapper}>
                <div className={classes.first}>
                    <FontAwesomeIcon className={classes.icon} icon={faPen} />
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
export const ModalForEditXray = (props) => {

    return (

        ReactDOM.createPortal(<ModalEdit close={props.close} info={props.info} idSyr={props.idSyr} fullPath={props.fullPath} />, document.getElementById('modal'))

    )
}
