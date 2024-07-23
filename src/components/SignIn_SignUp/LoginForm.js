import React from 'react'
import classes from './LoginForm.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { MainInput } from '../Ui/MainInput'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import LoadingBar from 'react-top-loading-bar'
import illustrations from '../../style/Login/illustration.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
export const LoginForm = () => {
    const [enteredidSyr, setEnteredidSyr] = useState('');
    const [enteredidSyrTouched, setEnteredidSyrTouched] = useState(false);
    const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredPasswordTouched, setEnteredPasswordTouched] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState(null);

    const nav = useNavigate()
    const enteredidSyrIsValid = enteredidSyr.trim().length === 11;
    const idSyrInputIsInvalid = !enteredidSyrIsValid && enteredidSyrTouched;

    const enteredPasswordIsValid = enteredPassword.length > 6;
    const PasswordInputIsInvalid = !enteredPasswordIsValid && enteredPasswordTouched;

    let formIsValid = false;

    if (enteredidSyrIsValid && enteredPasswordIsValid) {
        formIsValid = true;
    }
    const idSyrInputChangeHandler = (event) => {
        setEnteredidSyr(event.target.value);
    };

    const PasswordInputChangeHandler = (event) => {
        setEnteredPassword(event.target.value);
    };

    const idSyrInputBlurHandler = (event) => {
        setEnteredidSyrTouched(true);
    };

    const PasswordInputBlurHandler = (event) => {
        setEnteredPasswordTouched(true);
    };



    const loginApiSubmittionHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setEnteredidSyrTouched(true);

        if (!enteredidSyrIsValid || !enteredPasswordIsValid) {
            return;
        }

        const info = {
            identify: enteredidSyr,
            password: enteredPassword
        }

        // console.log(enteredPassword)
        // try {
        //     const response = await fetch('http://localhost:8000/v1/User/login/any', {
        //         method: 'POST',
        //         body: JSON.stringify(info),
        //         headers: {
        //             'Content-Type': 'application/json',


        //         },
        //     });
        //     if (!response.ok) {
        //         const data = await response.json()
        //         throw data;
        //     }
        //     const data = await response.json()

        //     const token = data.data.token;
        //     localStorage.setItem('token', token);

        //     const expiration = new Date(data.data.expire)
        //     const milliseconds = expiration.getTime();
        //     localStorage.setItem('expiration', milliseconds.toString());
        //     localStorage.setItem('idSyr',enteredidSyr)

        //     const role = data.data.role
        //     console.log(role)
        //     if (role === "doctor") {
        //         localStorage.setItem('role', "doctor")
        //     }
        //     else if (role === "radiographer") {
        //         localStorage.setItem('role', "radiographer")
        //     } else if (role === "analyzer") {
        //         localStorage.setItem('role', "analyzer")
        //     } else if (role === "pharmaceutical") {
        //         localStorage.setItem('role', "pharmaceutical")
        //     }
        //     else {
        //         localStorage.setItem('role', '_')
        //     }






        //     if (role === "doctor" && token) {
        //         nav('/DashboardDoctor',{replace:true})
        //     } else if (role === "radiographer" && token) {
        //         nav('/DashboardRadioGraphers',{replace:true})
        //     } else if (role === "analyzer" && token) {
        //         nav('/DashboardMLS')
        //     } else if (role === "pharmaceutical" && token) {
        //         nav('/DashboardPharmacist',{replace:true})
        //     }
        //     else {
        //         throw new Error('forbidden')
        //     }





        // } catch (error) {

        //     if (error.message === 'identify or password is uncorrect') {
        //         toast.warn('!خطأ في الرقم الوطني او كلمة المرور', {
        //             position: "top-right",
        //             autoClose: 1000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             draggable: true,
        //             progress: undefined,
        //             theme: "light",
        //         });

        //     } else if (error === "forbidden") {
        //         toast.error('!ممنوع الدخول  ', {
        //             position: "top-right",
        //             autoClose: 1000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
                  
        //             draggable: true,
        //             progress: undefined,
        //             theme: "light",
        //         });
        //     } else {
        //         toast.error('!حدث خطأ ما', {
        //             position: "top-right",
        //             autoClose: 1000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
                   
        //             draggable: true,
        //             progress: undefined,
        //             theme: "light",
        //         });
        //     }

        // }
        nav('/DashboardDoctor',{replace:true})
        setIsLoading(false);
        setEnteredidSyr('');
        setEnteredidSyrTouched(false);

        setEnteredPassword('');
        setEnteredPasswordTouched(false);
    };




    const configurationidSyrLogin = {
        type: 'number',
        label: 'الرقم الوطني'

    }
    const configurationPasswordLogin = {
        type: 'password',
        label: 'كلمة المرور'

    }


    return (

        <div className={classes.container}>
            <div className={classes.right}>

                <form onSubmit={loginApiSubmittionHandler}>
                    <div className={classes.title}> <h2> تسجيل الدخول</h2></div>
                    <div>
                        <div>
                            <MainInput
                                configuration={configurationidSyrLogin}
                                onChange={idSyrInputChangeHandler}
                                onBlur={idSyrInputBlurHandler}
                                value={enteredidSyr}
                                isInvalid={idSyrInputIsInvalid}
                            />
                            {idSyrInputIsInvalid && <p className='error-text'> الرقم الوطني لا يطابق 11 محرف.</p>}
                        </div>
                        <div>
                            <MainInput
                                configuration={configurationPasswordLogin}
                                onChange={PasswordInputChangeHandler}
                                onBlur={PasswordInputBlurHandler}
                                value={enteredPassword}
                                isInvalid={PasswordInputIsInvalid}
                            />
                            {PasswordInputIsInvalid && <p className='error-text'>  كلمة المرور  أقل من 6 أحرف  .</p>}
                        </div>
                    </div>
                    <button disabled={!formIsValid}> تسجيل الدخول</button>
                    <Link to={'/signup'}>
                        <button className={classes.signup}> للتسجيل <FontAwesomeIcon style={{ color: '#1B1212', fontSize: '12px', fontWeight: '600' }} icon={faArrowLeftLong} /></button>
                    </Link>

                </form>

            </div>
            <div className={classes.left}>
                <img src={illustrations} alt='error'></img>
            </div>
            <ToastContainer />
            {
                isLoading && <LoadingBar shadowStyle={{ display: 'none' }} color='#31af99' progress={100} height={5} loaderSpeed={15000} transitionTime={15000} />
            }
        </div>

    )
}
