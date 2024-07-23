import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import classes from './ModalForAddResultofSurgery.module.css'
import { toast } from 'react-toastify';
import { getToken } from '../../../../../Util/Auth';
import LoadingBar from 'react-top-loading-bar'
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { MainTextArea } from '../../../../Ui/MainTextArea'
const ModalEdit = (props) => {
    const { IdSyr, IdDiagnose } = useParams()
    const [value, setValue] = useState(50);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const nav = useNavigate();
  

    const [enteredDesc, setEnteredDesc] = useState('');
    const [enteredDescTouched, setEnteredDescTouched] = useState(false);


    const [isLoading, setIsLoading] = useState(false);




    const enteredDescIsValid = enteredDesc.trim() !== '';
    const DescInputIsInvalid = !enteredDescIsValid && enteredDescTouched;


    let formIsValid = false;

    if ( enteredDescIsValid) {
        formIsValid = true;
        console.log(formIsValid)
    }
   
    const DescInputChangeHandler = (event) => {
        setEnteredDesc(event.target.value);
    };

  
    const DescInputBlurHandler = (event) => {
        setEnteredDescTouched(true);
    };

    const formSubmissionHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setEnteredDescTouched(true);
        if (!enteredDescIsValid ) {
            return;
        }

        const info = {
            surgeryId: props.id,
            successRate: value,
            descriptionResault: enteredDesc,
        }


        try {
            const response = await fetch('http://localhost:8001/v1/Aid/give/Surgery', {
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
            console.log(data.data.message)
            if (data.data.message === 'updated successfully.') {
                toast.success('تم أضافة نتيجة العملية بنجاح', {
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
            } else if (error.message === 'Cannot found Surgery.') {
                toast.error('ممنوع التحديث', {
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
     
        setEnteredDesc('');
        setEnteredDescTouched(false);
        props.close()
    }








    return (
        <div className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">

            <div className={classes.wrapper}>
                <div className={classes.first}>
                    <p> إضافة  نتيجة  العملية</p>
                </div>
                <div className={classes.second}>
                    <p>{value}</p>
                    <div>
                        <input className={classes.range}  style={{ width:'210px' }} type='range' onChange={handleChange} value={value} />
                    </div>
                    <div>

                        <MainTextArea
                            onChange={DescInputChangeHandler}
                            onBlur={DescInputBlurHandler}
                            value={enteredDesc}
                            isInvalid={DescInputIsInvalid}
                            label={'وصف نتيجة العملية'}
                        >
                        </MainTextArea>
                        {DescInputIsInvalid && (
                            <p className={`error-text`}>الحقل فارغ!</p>
                        )}

                    </div>
                </div>
                <div className={classes.third}>
                    <div className={classes.buttonwrapper}>
                        <button onClick={formSubmissionHandler}><FontAwesomeIcon color='#31af99' icon={faCheckDouble} /></button>
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
export const ModalForAddResultofSurgery = (props) => {

    return (

        ReactDOM.createPortal(<ModalEdit close={props.close}  id={props.id} />, document.getElementById('modal'))

    )
}
