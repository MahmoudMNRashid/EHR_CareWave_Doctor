import React from 'react'
import ReactDOM from 'react-dom';
import classes from './ModalForAddAnalysis.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faCheckDouble, faClose, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { MainInput } from '../../../../Ui/MainInput'
import { getToken } from '../../../../../Util/Auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
const ModalAdd = (props) => {
    const [inputs, setInputs] = useState(['']);
    const [touchedInputs, setTouchedInputs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const nav = useNavigate()
    const handleInputChange = (index, event) => {
        const newInputs = [...inputs];
        newInputs[index] = event.target.value;
        setInputs(newInputs);
    };

    const handleInputBlur = (index) => {
        if (!touchedInputs.includes(index)) {
            setTouchedInputs([...touchedInputs, index]);
        }
    };

    const handleAddInput = () => {
        const newInputs = [...inputs, ''];
        setInputs(newInputs);
    };

    const handleDeleteInput = () => {
        const newInputs = [...inputs];
        newInputs.pop();
        setInputs(newInputs);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const isEmpty = inputs.some((input) => input.trim() === '');
        if (isEmpty) {
            // Handle validation error, e.g., display an error message
            return;
        }
        const info = {
            symptomId: props.info.idDiagnose,
            analysises: inputs
        }
        try {
            const response = await fetch('http://localhost:8001/v1/Symptoms/Analysis', {
                method: 'POST',
                body: JSON.stringify(info),
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

            if(data.data.message==='Analysis added'){
                toast.success('تم إضافة الطلب', {
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
            if (error.message === `Can't found analysis.`) {
                toast.error('!ممنوع التعديل', {
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

    const configurationName = { type: 'text', label: 'اسم التحليل' }
    return (
        <div className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
            <form className={classes.container} onSubmit={handleSubmit}>

                <div className={classes.title}>
                    <p> إضافة طلب تحاليل</p>
                    <button onClick={props.close}> <FontAwesomeIcon icon={faClose} /></button>
                </div>
                {inputs.map((input, index) => (
                    <div className={classes.containerInputs} key={index}>

                        <MainInput

                            configuration={configurationName}
                            value={input}
                            onChange={(event) => handleInputChange(index, event)}
                            onBlur={() => handleInputBlur(index)}
                            style={
                                touchedInputs.includes(index) && input.trim() === ''
                                    ? { borderColor: '#FF3333', }
                                    : {}
                            }
                        />
                        {index === inputs.length - 1 && (
                            <button type="button" onClick={handleDeleteInput}>
                                <FontAwesomeIcon style={{ color: '#f05261 ', marginTop: '5px' }} icon={faTrashAlt} />
                            </button>
                        )}

                    </div>
                ))}
                <div className={classes.containerButtons}>

                    <button type="button" onClick={handleAddInput}>
                        <FontAwesomeIcon color='#4f5e75' icon={faAdd} />
                    </button>
                    <button type="submit"><FontAwesomeIcon color='#31af99' icon={faCheckDouble} /></button>
                </div>
            </form>
            {isLoading &&<LoadingBar shadowStyle={{ display: 'none' }} color='#31af99' progress={100} height={5} loaderSpeed={15000} transitionTime={15000} />}
        </div>
    )
}
export const ModalForAddAnalysis = (props) => {

    return (

        ReactDOM.createPortal(<ModalAdd close={props.close} info={props.info} />, document.getElementById('modal'))

    )
}
