import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';

import classes from './ModalForAddResult.module.css'
import { MainInput } from '../../../../Ui/MainInput';
import { toast } from 'react-toastify';
import { getToken } from '../../../../../Util/Auth';
import LoadingBar from 'react-top-loading-bar'
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faClose } from '@fortawesome/free-solid-svg-icons';
const ModalAdd = (props) => {
    const nav = useNavigate();
    const [entereddesc, setEntereddesc] = useState('');
    const [entereddescTouched, setEntereddescTouched] = useState(false);
    const [enterednameOfDeises, setEnterednameOfDeises] = useState('');
    const [enterednameOfDeisesTouched, setEnterednameOfDeisesTouched] = useState(false);

    const [suggestions, setSuggestions] = useState([]);
    const [selectedSpecialization, setSelectedSpecialization] = useState({
      id: '',
      name: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    const { IdSyr, IdDiagnose } = useParams()

    const entereddescIsValid = entereddesc.trim() !== '';
    const descInputIsInvalid = !entereddescIsValid && entereddescTouched;
    const enterednameOfDeisesIsValid = selectedSpecialization.name !=='';
    const nameOfDeisesInputIsInvalid = !enterednameOfDeisesIsValid && enterednameOfDeisesTouched;


    let formIsValid = false;


    if (entereddescIsValid && enterednameOfDeisesIsValid) {
        formIsValid = true
    }



    const descInputChangeHandler = (event) => {
        setEntereddesc(event.target.value);
    };
    const descInputBlurHandler = (event) => {
        setEntereddescTouched(true);
    };
    const nameOfDeisesInputChangeHandler = (event) => {
        setEnterednameOfDeises(event.target.value);
    };

    const nameOfDeisesInputBlurHandler = (event) => {
        setEnterednameOfDeisesTouched(true);
    };

    const formSubmissionHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);


        setEntereddescTouched(true);
        setEnterednameOfDeisesTouched(true)
        if (!entereddescIsValid || !enterednameOfDeisesIsValid) {
            return;
        }

        const info = {
            symptomsId: +IdDiagnose,
            description: entereddesc,
            diseaseId: selectedSpecialization.id
        }
        console.log(info)

        try {
            const response = await fetch('http://localhost:8001/v1/Symptoms/result', {
                method: 'POST',
                body: JSON.stringify(info),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${getToken()} `

                },
            });
            if (!response.ok) {
                const data = await response.json()
                console.log(data)
                throw data;
            }
            const data = await response.json()



            var myVar = data.data.message;
            var searchString = "symptoms added";



            if (myVar.startsWith(searchString)) {
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
                nav(`/DashboardDoctor/HealthRecord/${IdSyr}/${IdDiagnose}`, { replace: true });
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
        setEnterednameOfDeisesTouched(false)


    };




    useEffect(() => {
        const fetchSuggestions = async () => {
          try {
           
            if (enterednameOfDeises.length >= 1) {
              const response = await fetch(`http://localhost:8001/v1/Disease/search/${enterednameOfDeises}`,{
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${getToken()} `


            },
              });
              
              if (!response.ok) {
                console.log(response)
                throw new Error('Network response was not ok');
              }
    
              const data = await response.json();
              if (data.data) {
                setSuggestions(data.data.data);
              } else {
                setSuggestions([]);
              }
            } else {
              setSuggestions([]);
            }
          } catch (error) {
            console.error('Error fetching suggestions:', error);
          }
        };
    
        fetchSuggestions();
      }, [enterednameOfDeises]);
    
      const handleSuggestionClick = suggestion => {
        setSelectedSpecialization(suggestion);
        setEnterednameOfDeises(suggestion.name);
        setSuggestions([]);
      };





    const configurationdescLogin = {
        type: 'text',
        label: 'نتيجة التشخيص'
    }

    const configurationnameOfDeisesSignUp = {
        type: 'text',
        label: 'اسم المرض '

    }

    return (
        <div className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">

            <div className={classes.wrapper}>
                <div className={classes.first}>
                    <FontAwesomeIcon className={classes.icon} icon={faAdd} />
                </div>
                <div className={classes.second}>
                    <div className='height'>
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

                    <div className='height'>
                        <MainInput
                            configuration={configurationnameOfDeisesSignUp}
                            onChange={nameOfDeisesInputChangeHandler}
                            onBlur={nameOfDeisesInputBlurHandler}
                            value={enterednameOfDeises}
                            isInvalid={nameOfDeisesInputIsInvalid}
                        />
                        {nameOfDeisesInputIsInvalid && <p className='error-text'>  اسم المرض غير موجود.</p>}
                        {suggestions.length > 0 && (
                            <ul className={classes.list}>
                                {suggestions.map(suggestion => (
                                    <li key={suggestion.id} onClick={() => handleSuggestionClick(suggestion)}>
                                        {suggestion.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
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
export const ModalForAddResult = (props) => {
    return (

        ReactDOM.createPortal(<ModalAdd close={props.close} />, document.getElementById('modal'))

    )
}
