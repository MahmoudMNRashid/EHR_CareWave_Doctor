import React from 'react'
import ReactDOM from 'react-dom';
import classes from './ModalForUploadPhotos.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faUpload } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import upload from '../../style/RadioGraphers/upload (1).png'
import { useNavigate, useParams } from 'react-router-dom';
import { getToken } from '../../Util/Auth';
import { toast } from 'react-toastify';
import LoadingBar from 'react-top-loading-bar';
const ModalAdd = (props) => {
    console.log(typeof (props.id))
    const { IdSyr, IdDiagnose } = useParams()


    const [selectedFiles, setSelectedFiles] = useState(new FormData());

    let formisValid = false
    if (selectedFiles.length > 0) {
        formisValid = true;
        console.log(formisValid)
    }

    const handleFileSelect = (event) => {
        const files = event.target.files;
        const formData = new FormData(); // Create a FormData object

        // Append each file to the FormData object
        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }
        formData.append('x_rayId', props.id)
        setSelectedFiles(formData);
    };


    const nav = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    console.log(selectedFiles)
    const handleUpload = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        if (!selectedFiles > 0) {

            return;
        }


        try {
            const response = await fetch('http://localhost:8001/v1/Aid/give/x_ray', {
                method: 'POST',
                body: selectedFiles,
                headers: {
                    'Authorization': `bearer ${getToken()} `
                }

            })
            console.log(response)
            if (!response.ok) {
                const data = await response.json()
                throw data;
            }
            const data = await response.json()

            if (data.data.message === 'Images Added') {
                toast.success('تم رفع الصور', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                nav(`/DashboardRadioGraphers/DiagnosesOfPatient/${IdSyr}/${IdDiagnose}`, { replace: true });


            }


        } catch (error) {
            if (error.message === `Can't found X_ray.`) {
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
            else {
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
                    <p> رفع  صور </p>
                    <button onClick={props.close}> <FontAwesomeIcon icon={faClose} /></button>
                </div>


                <div className={classes.u}>
                    <label htmlFor="fileInput">
                        <img src={upload} alt="Choose File" />
                    </label>
                    <input
                        id="fileInput"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleFileSelect}
                        multiple
                        accept="image/*"

                    />
                    {Array.from(selectedFiles.entries()).length > 0 ? <p style={{ display: 'flex', gap: '10px' }}>{Array.from(selectedFiles.getAll('files')).map((file, index) => (
                        <span key={index}>{file.name}</span>
                    ))}</p> : <p>لم يتم اختيار صور </p>}
                </div>

                <button onClick={handleUpload} className={classes.btn} ><FontAwesomeIcon color='#31af99' icon={faUpload} /></button>


                {isLoading && <LoadingBar shadowStyle={{ display: 'none' }} color='#31af99' progress={100} height={5} loaderSpeed={15000} transitionTime={15000} />}
            </div>

        </div>
    )
}
export const ModalForUploadPhotos = (props) => {

    return (

        ReactDOM.createPortal(<ModalAdd close={props.close} id={props.id} />, document.getElementById('modal'))

    )
}
