import React, { useState } from 'react'
import { MainInput } from '../../Ui/MainInput'
import classes from './FormPatientRegistration.module.css'
import { ToastContainer, toast } from 'react-toastify';
import { getToken } from '../../../Util/Auth';
import LoadingBar from 'react-top-loading-bar';
import registration from '../../../style/Rigester Patient/registration.png'

export const FormPatientRegistration = () => {
    const pattern = /^09[3-9]\d{7}$/;
    function containsSpecialCharacters(str) {
        var pattern = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
        return pattern.test(str);
    }
    const [enteredidSyr, setEnteredidSyr] = useState('');
    const [enteredidSyrTouched, setEnteredidSyrTouched] = useState(false);

    const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredPasswordTouched, setEnteredPasswordTouched] = useState(false);

    const [enteredFullName, setEnteredFullName] = useState('');
    const [enteredFullNameTouched, setEnteredFullNameTouched] = useState(false);

    const [enteredPhone, setEnteredPhone] = useState('');
    const [enteredPhoneTouched, setEnteredPhoneTouched] = useState(false);

    const [enteredAddress, setEnteredAddress] = useState('');
    const [enteredAddressTouched, setEnteredAddressTouched] = useState(false);

    const [enteredGovernorate, setEnteredGovernorate] = useState('');
    const [enteredGovernorateTouched, setEnteredGovernorateTouched] = useState(false);

    const [enteredGender, setEnteredGender] = useState('');
    const [enteredGenderTouched, setEnteredGenderTouched] = useState(false);

    const [enteredBirthDay, setEnteredBirthDay] = useState('');
    const [enteredBirthDayTouched, setEnteredBirthDayTouched] = useState(false);

    const [enteredBloodType, setEnteredBloodType] = useState('');
    const [enteredBloodTypeTouched, setEnteredBloodTypeTouched] = useState(false);


    const [isLoading, setIsLoading] = useState(false);
  

    const enteredidSyrIsValid = enteredidSyr.trim().length === 11;
    const idSyrInputIsInvalid = !enteredidSyrIsValid && enteredidSyrTouched;

    const enteredFullNameIsValid = enteredFullName.length > 3 && !containsSpecialCharacters(enteredFullName);
    const FullNameInputIsInvalid = !enteredFullNameIsValid && enteredFullNameTouched;

    const enteredPhoneIsValid = pattern.test(enteredPhone);
    const PhoneInputIsInvalid = !enteredPhoneIsValid && enteredPhoneTouched;

    const enteredAddressIsValid = enteredAddress.trim().length >= 3;
    const AdressInputIsInvalid = !enteredAddressIsValid && enteredAddressTouched;

    const enteredGovernorateIsValid = enteredGovernorate.trim() !== 'المحافظة';
    const GovernorateInputIsInvalid = !enteredGovernorateIsValid && enteredGovernorateTouched;

    const enteredGenderIsValid = enteredGender.trim() !== 'الجنس';
    const GenderInputIsInvalid = !enteredGenderIsValid && enteredGenderTouched;

    const enteredBirthDayIsValid = enteredBirthDay.trim() !== '';
    const BirthDayInputIsInvalid = !enteredBirthDayIsValid && enteredBirthDayTouched;

    const enteredBloodtypeIsValid = enteredBloodType.trim() !== 'زمرة الدم';
    const BloodtypeInputIsInvalid = !enteredBloodtypeIsValid && enteredBloodTypeTouched;

    const enteredPasswordIsValid = enteredPassword.length > 6;
    const PasswordInputIsInvalid = !enteredPasswordIsValid && enteredPasswordTouched;

    let formIsValid = false;

    if (enteredidSyrIsValid && enteredPasswordIsValid && enteredAddressIsValid && enteredBirthDayIsValid && enteredBloodtypeIsValid && enteredFullNameIsValid && enteredGenderIsValid && enteredGovernorateIsValid && enteredPhone) {
        formIsValid = true;
    }
    const idSyrInputChangeHandler = (event) => {
        setEnteredidSyr(event.target.value);
    };
    const idSyrInputBlurHandler = (event) => {
        setEnteredidSyrTouched(true);
    };
    const FullNameInputBlurHandler = (event) => {
        setEnteredFullNameTouched(true);
    };
    const FullNameInputChangeHandler = (event) => {
        setEnteredFullName(event.target.value);
    };
    const PhoneInputChangeHandler = (event) => {
        setEnteredPhone(event.target.value);
    };
    const PhoneInputBlurHandler = (event) => {
        setEnteredPhoneTouched(true);
    };
    const AdressInputBlurHandler = (event) => {
        setEnteredAddressTouched(true);
    };
    const AdressInputChangeHandler = (event) => {
        setEnteredAddress(event.target.value);
    };
    const GovernorateInputChangeHandler = (event) => {
        setEnteredGovernorate(event.target.value);
    };
    const GenderInputBlurHandler = (event) => {
        setEnteredGenderTouched(true);
    };
    const BirthDayInputChangeHandler = (event) => {
        setEnteredBirthDay(event.target.value);
    };
    const BirthDayInputBlurHandler = (event) => {
        setEnteredBirthDayTouched(true);
    };

    const BloodTypeInputBlurHandler = (event) => {
        setEnteredBloodTypeTouched(true);
    };
    const BloodTypeInputChangeHandler = (event) => {
        setEnteredBloodType(event.target.value);
    };
    const GenderInputChangeHandler = (event) => {
        setEnteredGender(event.target.value);
    };
    const GovernorateInputBlurHandler = (event) => {
        setEnteredGovernorateTouched(true);
    };
    const PasswordInputChangeHandler = (event) => {
        setEnteredPassword(event.target.value);
    };
    const PasswordInputBlurHandler = (event) => {
        setEnteredPasswordTouched(true);
    };

    //FullName  IdSyr Phone  Adress  Governorate
    // Gender   Password  BirthDay   BloodType 


    const formSubmissionHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        setEnteredidSyrTouched(true);
        setEnteredAddressTouched(true)
        setEnteredBirthDayTouched(true)
        setEnteredBloodTypeTouched(true)
        setEnteredFullNameTouched(true)
        setEnteredGenderTouched(true)
        setEnteredGovernorateTouched(true)
        setEnteredPasswordTouched(true)
        setEnteredPhoneTouched(true)

        if (!enteredidSyrIsValid ||
            !enteredPasswordIsValid ||
            !enteredAddressIsValid ||
            !enteredBirthDayIsValid ||
            !enteredBloodtypeIsValid ||
            !enteredFullNameIsValid ||
            !enteredGenderIsValid ||
            !enteredGovernorateIsValid ||
            !enteredPhoneIsValid) {
            return;
        }

        const info = {
            fullName: enteredFullName,
            syrId: enteredidSyr,
            phone: enteredPhone,
            address: enteredAddress,
            governorate: enteredGovernorate,
            gender: enteredGender,
            password: enteredPassword,
            birthDay: enteredBirthDay,
            bloodGroup: enteredBloodType,
        }


        try {
            const response = await fetch('http://localhost:8000/v1/User/register/Sick', {
                method: 'POST',
                body: JSON.stringify(info),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${getToken()}`


                },
            });
            if (!response.ok) {
                const data = await response.json()
                console.log(data)

                throw data;
            }
            const data = await response.json()
            if (data.data.message === 'register has been successfully.') {
                toast.success('تم تسجيل المريض بنجاح  ', {

                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
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
            } if (error.message === 'id is used.') {
                toast.warning('الرقم الوطني مستخدم', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            } else {
                toast.error('حدث خطأ ما الرجاء إعادة المحاولة', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            }

        }

        setIsLoading(false);
        setEnteredidSyr('');
        setEnteredidSyrTouched(false);

        setEnteredPassword('');
        setEnteredPasswordTouched(false);



        setEnteredAddress('');
        setEnteredAddressTouched(false);

        setEnteredBirthDay('');
        setEnteredBirthDayTouched(false);

        setEnteredBloodType('');
        setEnteredBloodTypeTouched(false);

        setEnteredFullName('');
        setEnteredFullNameTouched(false);

        setEnteredGender('');
        setEnteredGenderTouched(false);

        setEnteredGovernorate('');
        setEnteredGovernorateTouched(false);

        setEnteredPhone('');
        setEnteredPhoneTouched(false);
    };





    const configurationFullName = {
        type: 'text',
        label: 'الاسم الكامل'
    }
    const configurationIdSyr = {
        type: 'text',
        label: 'الرقم الوطني '
    }
    const configurationPhone = {
        type: 'number',
        label: 'رقم الهاتف '
    }
    const configurationAddress = {
        type: 'text',
        label: 'العنوان '
    }

    const configurationPassword = {
        type: 'password',
        label: ' كلمة المرور'
    }
    const configurationBirthDay = {
        type: 'date',
        label: ''
    }


    return (
        <div className={classes.container}>

            <div className={classes.title}>



                <img src={registration} alt='registration' />

            </div>
            <form className={classes.form} onSubmit={formSubmissionHandler}>

                <div className={classes.First_Section}>
                    <div>
                        <MainInput
                            configuration={configurationFullName}
                            onChange={FullNameInputChangeHandler}
                            onBlur={FullNameInputBlurHandler}
                            value={enteredFullName}
                            isInvalid={FullNameInputIsInvalid}
                        />
                        {FullNameInputIsInvalid && <p className='error-text'>الأسم أقل من 3 محارف.</p>}
                    </div>
                    <div>
                        <MainInput
                            configuration={configurationIdSyr}
                            onChange={idSyrInputChangeHandler}
                            onBlur={idSyrInputBlurHandler}
                            value={enteredidSyr}
                            isInvalid={idSyrInputIsInvalid}
                        />
                        {idSyrInputIsInvalid && <p className='error-text'>الرقم لا يطابق 11 محرف.</p>}
                    </div>

                    <div>
                        <MainInput
                            configuration={configurationPhone}
                            onChange={PhoneInputChangeHandler}
                            onBlur={PhoneInputBlurHandler}
                            value={enteredPhone}
                            isInvalid={PhoneInputIsInvalid}
                        />
                        {PhoneInputIsInvalid && <p className='error-text'> الرقم يجب أن يبدأ ب 09 و بطول 10 محارف.</p>}
                    </div>
                    <div>
                        <MainInput
                            configuration={configurationAddress}
                            onChange={AdressInputChangeHandler}
                            onBlur={AdressInputBlurHandler}
                            value={enteredAddress}
                            isInvalid={AdressInputIsInvalid}
                        />
                        {AdressInputIsInvalid && <p className='error-text'>العنوان أقل من 3 محارف .</p>}
                    </div>
                    <div>
                        <MainInput
                            configuration={configurationBirthDay}
                            onChange={BirthDayInputChangeHandler}
                            onBlur={BirthDayInputBlurHandler}
                            value={enteredBirthDay}
                            isInvalid={BirthDayInputIsInvalid}
                        />
                        {BirthDayInputIsInvalid && <p className='error-text'>تاريخ الميلاد فارغ.</p>}
                    </div>
                    <div>
                        <MainInput
                            configuration={configurationPassword}
                            onChange={PasswordInputChangeHandler}
                            onBlur={PasswordInputBlurHandler}
                            value={enteredPassword}
                            isInvalid={PasswordInputIsInvalid}
                        />
                        {PasswordInputIsInvalid && <p className='error-text'>  كلمة المرور  أقل من 6 أحرف  .</p>}
                    </div>

                </div>
                <div className={classes.Second_Section}>


                    <div>

                        <select
                            className={`${classes.select} ${GenderInputIsInvalid ? classes.invalid : ''} `}
                            required
                            onChange={GenderInputChangeHandler}
                            onBlur={GenderInputBlurHandler}
                            value={enteredGender}
                        >
                            <option className={classes.option} value='الحنس' >الجنس</option>
                            <option className={classes.option} value="male">ذكر</option>
                            <option className={classes.option} value="female"> أنثى</option>


                        </select>
                        {GenderInputIsInvalid && (
                            <p className='error-text'>الرجاء اختيار  الجنس .</p>
                        )}
                    </div>
                    <div>

                        <select
                            className={`${classes.select} ${GovernorateInputIsInvalid ? classes.invalid : ''} `}
                            required
                            onChange={GovernorateInputChangeHandler}
                            onBlur={GovernorateInputBlurHandler}
                            value={enteredGovernorate}
                        >
                            <option className={classes.option} value='المحافظة' >المحافظة</option>
                            <option className={classes.option} value="Damascus">دمشق</option>
                            <option className={classes.option} value="Rif Dimashq">ريف دمشق</option>
                            <option className={classes.option} value="Latakia">اللاذقية</option>
                            <option className={classes.option} value="Tartous">طرطوس</option>
                            <option className={classes.option} value="Homs">حمص</option>
                            <option className={classes.option} value="Aleppo">حلب</option>
                            <option className={classes.option} value="Hama">حماة</option>
                            <option className={classes.option} value="Daraa">درعا</option>
                            <option className={classes.option} value="Idlib">إدلب</option>
                            <option className={classes.option} value="Raqqa"> الرقة</option>
                            <option className={classes.option} value="Al-Hasakah">الحسكة</option>
                            <option className={classes.option} value="Deir ez-Zor">دير الزور</option>
                            <option className={classes.option} value="Quneitra">القنيطرة</option>
                            <option className={classes.option} value="As-Suwayda">السويداء</option>


                        </select>
                        {GovernorateInputIsInvalid && (
                            <p className='error-text'>الرجاء اختيار المحافظة .</p>
                        )}
                    </div>
                    <div>

                        <select
                            className={`${classes.select} ${BloodtypeInputIsInvalid ? classes.invalid : ''} `}
                            required
                            onChange={BloodTypeInputChangeHandler}
                            onBlur={BloodTypeInputBlurHandler}
                            value={enteredBloodType}
                        >
                            <option className={classes.option} value='زمرة الدم' >زمرة الدم</option>
                            <option className={classes.option} value="A+">A+</option>
                            <option className={classes.option} value="A-">A-</option>
                            <option className={classes.option} value="B+">B+</option>
                            <option className={classes.option} value="B-">B-</option>
                            <option className={classes.option} value="AB+">AB+</option>
                            <option className={classes.option} value="AB-">AB-</option>
                            <option className={classes.option} value="O+">O+</option>
                            <option className={classes.option} value="O-">O-</option>

                        </select>
                        {BloodtypeInputIsInvalid && (
                            <p className='error-text'>الرجاء اختيار  زمرة الدم .</p>
                        )}
                    </div>






                </div>




                <div className={classes.Fourth_Section}>
                    <button disabled={!formIsValid}> تسجيل </button>
                </div>
                {/* <Link to={'/signup'}>
                    <button className={classes.signup}> للتسجيل <FontAwesomeIcon style={{ color: '#1B1212', fontSize: '12px', fontWeight: '600' }} icon={faArrowLeftLong} /></button>
                </Link> */}

            </form>



            <ToastContainer />
            {
                isLoading && <LoadingBar shadowStyle={{ display: 'none' }} color='#31af99' progress={100} height={5} loaderSpeed={15000} transitionTime={15000} />
            }
        </div>

    )
}
