import React, { useEffect } from 'react'
import classes from './SignUpForm.module.css'
import { useNavigate } from 'react-router-dom'
import { MainInput } from '../Ui/MainInput'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import LoadingBar from 'react-top-loading-bar'
import Upload from '../../style/Rigester/upload.png'
import registration from '../../style/Rigester/registration.png'
import { getToken } from '../../Util/Auth'
export const SignUpForm = () => {
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

    const [enteredMedid, setEnteredMedid] = useState('');
    const [enteredMedidTouched, setEnteredMedidTouched] = useState(false);

    const [enteredAddress, setEnteredAddress] = useState('');
    const [enteredAddressTouched, setEnteredAddressTouched] = useState(false);

    const [enteredSpecialization, setEnteredSpecialization] = useState('');
    const [enteredSpecializationTouched, setEnteredSpecializationTouched] = useState(false);
    const [enteredBirthDay, setEnteredBirthDay] = useState('');
    const [enteredBirthDayTouched, setEnteredBirthDayTouched] = useState(false);

    const [enteredSelectedType, setSelectedType] = useState('الفئة الطبية');
    const [enteredSelectedTypeTouched, setEnteredelectedTypeTouched] = useState(false);


    const [enteredSelectedGender, setSelectedGender] = useState('الجنس');
    const [enteredSelectedGenderTouched, setEnteredelectedGenderTouched] = useState(false);

    const [enteredSelectedGovernorate, setSelectedGovernorate] = useState('المحافظة');
    const [enteredSelectedGovernorateTouched, setEnteredelectedGovernorateTouched] = useState(false);

    const [enteredSelectedBloodType, setSelectedBloodType] = useState('زمرة الدم');
    const [enteredSelectedBloodTypeTouched, setEnteredelectedBloodTypeTouched] = useState(false);


    const [suggestions, setSuggestions] = useState([]);
    const [selectedSpecialization, setSelectedSpecialization] = useState({
      id: '',
      name: '',
    });


    const [isLoading, setIsLoading] = useState(false);
    const nav = useNavigate()
    const enteredidSyrIsValid = enteredidSyr.trim().length === 11;
    const idSyrInputIsInvalid = !enteredidSyrIsValid && enteredidSyrTouched;

    const enteredPasswordIsValid = enteredPassword.length > 6;
    const PasswordInputIsInvalid = !enteredPasswordIsValid && enteredPasswordTouched;

    const enteredFullNameIsValid = enteredFullName.length > 3 && !containsSpecialCharacters(enteredFullName);
    const FullNameInputIsInvalid = !enteredFullNameIsValid && enteredFullNameTouched;

    const enteredPhoneIsValid = pattern.test(enteredPhone);
    const PhoneInputIsInvalid = !enteredPhoneIsValid && enteredPhoneTouched;

    const enteredMedidIsValid = enteredMedid.length === 11;
    const MedidInputIsInvalid = !enteredMedidIsValid && enteredMedidTouched;

    const enteredAddressIsValid = enteredAddress.length >= 3;
    const AddressInputIsInvalid = !enteredAddressIsValid && enteredAddressTouched;

    const enteredBirthDayIsValid = enteredBirthDay !== '';
    const BirthDayInputIsInvalid = !enteredBirthDayIsValid && enteredBirthDayTouched;

    const enteredSpecializationIsValid = (enteredSelectedType === 'doctor' && selectedSpecialization.name !=='') || ((enteredSelectedType === 'radiographer' || enteredSelectedType === 'analyzer' || enteredSelectedType === 'pharmaceutical') && enteredSpecialization === '');
    const SpecializationInputIsInvalid = !enteredSpecializationIsValid && enteredSpecializationTouched;

    const enteredSelectedGenderlIsValid = enteredSelectedGender !== 'الجنس';
    const SelectedGenderInputIsInvalid = !enteredSelectedGenderlIsValid && enteredSelectedGenderTouched;

    const enteredSelectedGovernoratelIsValid = enteredSelectedGovernorate !== 'المحافظة';
    const SelectedGovernorateInputIsInvalid = !enteredSelectedGovernoratelIsValid && enteredSelectedGovernorateTouched;

    const enteredSelectedBloodTypelIsValid = enteredSelectedBloodType !== 'زمرة الدم';
    const SelectedBloodTypeInputIsInvalid = !enteredSelectedBloodTypelIsValid && enteredSelectedBloodTypeTouched;
    const enteredSelectedTypelIsValid = enteredSelectedType !== 'الفئةالطبية';
    const SelectedTypeInputIsInvalid = !enteredSelectedTypelIsValid && enteredSelectedTypeTouched;


    const [selectedidSyrFront, setSelectedidSyrFront] = useState('');
    const [selectedidSyrBack, setSelectedidSyrBack] = useState('');
    const [selectedidMed, setSelectedidMed] = useState('');

    const handleidSyrFrontChange = (event) => {
        const file = event.target.files[0];
        setSelectedidSyrFront(file);
    };

    const handleidSyrBackChange = (event) => {
        const file = event.target.files[0];
        console.log(file)
        setSelectedidSyrBack(file);
    };
    const handleidMedChange = (event) => {
        const file = event.target.files[0];
        console.log(file)
        setSelectedidMed(file);
    };

  


    let formIsValid = false;

    if (enteredidSyrIsValid &&
        enteredPasswordIsValid &&
        enteredAddressIsValid &&
        enteredFullNameIsValid &&
        enteredMedidIsValid &&
        enteredPhoneIsValid &&
        enteredSpecializationIsValid &&
        enteredSelectedBloodTypelIsValid &&
        enteredSelectedGenderlIsValid &&
        enteredSelectedGovernoratelIsValid &&
        enteredSelectedTypelIsValid &&
        selectedidMed &&
        selectedidSyrBack &&
        selectedidSyrFront &&
        enteredBirthDayIsValid


    ) {
        formIsValid = true;
    }


    const idSyrInputChangeHandler = (event) => {
        setEnteredidSyr(event.target.value);
    };

    const PasswordInputChangeHandler = (event) => {
        setEnteredPassword(event.target.value);
    };
    const FullNameInputChangeHandler = (event) => {
        setEnteredFullName(event.target.value);
    };
    const PhoneInputChangeHandler = (event) => {
        setEnteredPhone(event.target.value);
    };
    const MedidInputChangeHandler = (event) => {
        setEnteredMedid(event.target.value);
    };
    const AddressInputChangeHandler = (event) => {
        setEnteredAddress(event.target.value);
    };
    const BirthDayInputChangeHandler = (event) => {
        setEnteredBirthDay(event.target.value);
    };
    const SpecializationInputChangeHandler = (event) => {
        setEnteredSpecialization(event.target.value);
    };
    const SelectedGenderInputChangeHandler = (event) => {
        setSelectedGender(event.target.value);
    };
    const SelectedGovernorateInputChangeHandler = (event) => {
        setSelectedGovernorate(event.target.value);
    };
    const SelectedBloodTypeInputChangeHandler = (event) => {
        setSelectedBloodType(event.target.value);
    };
    const SelectedTypeInputChangeHandler = (event) => {
        setSelectedType(event.target.value);
    };

    const idSyrInputBlurHandler = (event) => {
        setEnteredidSyrTouched(true);
    };

    const PasswordInputBlurHandler = (event) => {
        setEnteredPasswordTouched(true);
    };
    const FullNameInputBlurHandler = (event) => {
        setEnteredFullNameTouched(true);
    };
    const PhoneInputBlurHandler = (event) => {
        setEnteredPhoneTouched(true);
    };
    const MedidInputBlurHandler = (event) => {
        setEnteredMedidTouched(true);
    };
    const AddressInputBlurHandler = (event) => {
        setEnteredAddressTouched(true);
    };
    const BirthDayInputBlurHandler = (event) => {
        setEnteredBirthDayTouched(true);
    };
    const SpecializationInputBlurHandler = (event) => {
        setEnteredSpecializationTouched(true);
    };
    const SelectedGenderInputBlurHandler = (event) => {
        setEnteredelectedGenderTouched(true);
    };
    const SelectedGovernorateInputBlurHandler = (event) => {
        setEnteredelectedGovernorateTouched(true);
    };
    const SelectedBloodTypeInputBlurHandler = (event) => {
        setEnteredelectedBloodTypeTouched(true);
    };
    const SelectedTypeInputBlurHandler = (event) => {
        setEnteredelectedTypeTouched(true);
    };



    const SignUpApiSubmittionHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setEnteredidSyrTouched(true);
        setEnteredAddressTouched(true)
        setEnteredBirthDayTouched(true)
        setEnteredFullNameTouched(true)
        setEnteredMedidTouched(true)
        setEnteredPasswordTouched(true)
        setEnteredPhoneTouched(true)
        setEnteredSpecializationTouched(true)
        setEnteredelectedBloodTypeTouched(true)
        setEnteredelectedGenderTouched(true)
        setEnteredelectedGovernorateTouched(true)
        setEnteredelectedTypeTouched(true)


        if (!enteredidSyrIsValid ||
            !enteredPasswordIsValid ||
            !enteredPhoneIsValid ||
            !enteredAddressIsValid ||
            !enteredMedidIsValid ||
            !enteredFullNameIsValid ||
            !enteredSpecializationIsValid ||
            !enteredSelectedBloodTypelIsValid ||
            !enteredSelectedGenderlIsValid ||
            !enteredSelectedGovernoratelIsValid ||
            !enteredSelectedTypelIsValid ||
            !selectedidMed ||
            !selectedidSyrBack ||
            !selectedidSyrFront ||
            !enteredBirthDayIsValid
        ) {
            return;
        }
        const specializ = enteredSelectedType === "doctor" ? selectedSpecialization.name : "_"
        const role = enteredSelectedType === 'doctor' ? 0 : (enteredSelectedType === 'radiographer' ? 1 : (enteredSelectedType === 'analyzer' ? 2 : 3))


        const formData = new FormData()
        formData.append('forgroundImageCardDoctor', selectedidSyrFront)
        formData.append('backgroundImageCardDoctor', selectedidSyrBack)
        formData.append('identifyCard', selectedidMed)
        formData.append('BloodGroup', enteredSelectedBloodType)
        formData.append('RoleId', role)
        formData.append('FullName', enteredFullName)
        formData.append('Address', enteredAddress)
        formData.append('BirthDay', enteredBirthDay)
        formData.append('Password', enteredPassword)
        formData.append('SyrId', enteredidSyr)
        formData.append('Phone', enteredPhone)
        formData.append('MedicalNumber', enteredMedid)
        formData.append('Gender', enteredSelectedGender)
        formData.append('Governorate', enteredSelectedGovernorate)
        formData.append('Specialization', specializ)


        try {

            console.log(formData.entries())
            const response = await fetch('http://localhost:8000/v1/User/register/Doctor', {
                method: 'POST',
                body: formData,
                headers: {
                },
            });
            if (!response.ok) {
                const data = await response.json()
                console.log(data)

                throw data;
            }
            const data = await response.json()
            console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxx')

            if (data.data.message === 'register has been successfully. Please waiting to confrim. maybe take 24 hours.') {
                toast.success('تم تسجيل الحساب الرجاء الانتظار حتى يتم تأكيد الحساب بحدود ال 24 ساعة', {

                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                setTimeout(() => {
                    nav('/')
                }, 2000);
            }





        } catch (error) {
            console.log(error)
            const hasErrors = error.errors ? true : false;
            if (

                hasErrors
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
            } if (error.message === 'the Syrid or phone or medical id is wrong.') {
                toast.warning('الرقم الوطني أو الرقم الطبي مستخدم', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            }else if(error.message==='extension not allowed'){

                toast.warning('الصور غير مسموحة', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
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
                    theme: "light",
                })
            }

        }

        setIsLoading(false);

    };










    const configurationidSyrSignUp = {
        type: 'number',
        label: 'الرقم الوطني'

    }
    const configurationFullNameSignUp = {
        type: 'text',
        label: 'الاسم الكامل'

    }
    const configurationPhoneSignUp = {
        type: 'number',
        label: 'رقم الجوال'

    }
    const configurationMedidSignUp = {
        type: 'number',
        label: 'الرقم الطبي'

    }
    const configurationAddressSignUp = {
        type: 'text',
        label: 'العنوان'

    }
    const configurationSpecializationSignUp = {
        type: 'text',
        label: 'التخصص'

    }
    const configurationPasswordSignUp = {
        type: 'password',
        label: 'كلمة المرور'

    }
    const configurationBirthDaySignUp = {
        type: 'date',
        label: 'تاريخ الميلاد'

    }



    
  
    console.log(selectedSpecialization)
    useEffect(() => {
        const fetchSuggestions = async () => {
          try {
           
            if (enteredSpecialization.length >= 1) {
              const response = await fetch(`http://localhost:8000/v1/Specialization/searchSpecialization/${enteredSpecialization}`,{
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGRkZCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6ImRvY3RvciIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcHJpbWFyeXNpZCI6IjkiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiIwOTY4OTM1MzQ3IiwiZXhwIjoxNjk5OTYyNDQ0LCJpc3MiOiJTZWN1cmVBcGkiLCJhdWQiOiJTZWN1cmVBcGkifQ.G9KLNs_u1px66iab5wIZCd3yIPG7lKwHAYHU8rRD2Yo`


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
      }, [enteredSpecialization]);
    
      const handleSuggestionClick = suggestion => {
        setSelectedSpecialization(suggestion);
        setEnteredSpecialization(suggestion.name);
        setSuggestions([]);
      };

    return (

        <div className={classes.container}>

            <div className={classes.title}>



                <img src={registration} alt='registration' />

            </div>
            <form className={classes.form} onSubmit={SignUpApiSubmittionHandler}>

                <div className={classes.First_Section}>
                    <div>
                        <MainInput
                            configuration={configurationFullNameSignUp}
                            onChange={FullNameInputChangeHandler}
                            onBlur={FullNameInputBlurHandler}
                            value={enteredFullName}
                            isInvalid={FullNameInputIsInvalid}
                        />
                        {FullNameInputIsInvalid && <p className='error-text'>الأسم أقل من 3 محارف.</p>}
                    </div>
                    <div>
                        <MainInput
                            configuration={configurationidSyrSignUp}
                            onChange={idSyrInputChangeHandler}
                            onBlur={idSyrInputBlurHandler}
                            value={enteredidSyr}
                            isInvalid={idSyrInputIsInvalid}
                        />
                        {idSyrInputIsInvalid && <p className='error-text'>الرقم لا يطابق 11 محرف.</p>}
                    </div>
                    <div>
                        <MainInput
                            configuration={configurationMedidSignUp}
                            onChange={MedidInputChangeHandler}
                            onBlur={MedidInputBlurHandler}
                            value={enteredMedid}
                            isInvalid={MedidInputIsInvalid}
                        />
                        {MedidInputIsInvalid && <p className='error-text'>الأسم الرقم لا يطابق 11 محرف.</p>}
                    </div>
                    <div>
                        <MainInput
                            configuration={configurationPhoneSignUp}
                            onChange={PhoneInputChangeHandler}
                            onBlur={PhoneInputBlurHandler}
                            value={enteredPhone}
                            isInvalid={PhoneInputIsInvalid}
                        />
                        {PhoneInputIsInvalid && <p className='error-text'> الرقم يجب أن يبدأ ب 09 و بطول 10 محارف.</p>}
                    </div>
                    <div>
                        <MainInput
                            configuration={configurationAddressSignUp}
                            onChange={AddressInputChangeHandler}
                            onBlur={AddressInputBlurHandler}
                            value={enteredAddress}
                            isInvalid={AddressInputIsInvalid}
                        />
                        {AddressInputIsInvalid && <p className='error-text'>العنوان أقل من 3 محارف .</p>}
                    </div>
                    <div>
                        <MainInput
                            configuration={configurationBirthDaySignUp}
                            onChange={BirthDayInputChangeHandler}
                            onBlur={BirthDayInputBlurHandler}
                            value={enteredBirthDay}
                            isInvalid={BirthDayInputIsInvalid}
                        />
                        {BirthDayInputIsInvalid && <p className='error-text'>تاريخ الميلاد فارغ.</p>}
                    </div>
                    <div>
                        <MainInput
                            configuration={configurationPasswordSignUp}
                            onChange={PasswordInputChangeHandler}
                            onBlur={PasswordInputBlurHandler}
                            value={enteredPassword}
                            isInvalid={PasswordInputIsInvalid}
                        />
                        {PasswordInputIsInvalid && <p className='error-text'>  كلمة المرور  أقل من 6 أحرف  .</p>}
                    </div>
                    {enteredSelectedType === "doctor" && <div>
                        <MainInput
                            configuration={configurationSpecializationSignUp}
                            onChange={SpecializationInputChangeHandler}
                            onBlur={SpecializationInputBlurHandler}
                            value={enteredSpecialization}
                            isInvalid={SpecializationInputIsInvalid}
                        />
                        {SpecializationInputIsInvalid && <p className='error-text'>الاختصاص غير موجود .</p>}
                        {suggestions.length > 0 && (
                            <ul className={classes.list}>
                                {suggestions.map(suggestion => (
                                    <li key={suggestion.id} onClick={() => handleSuggestionClick(suggestion)}>
                                        {suggestion.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>}
                </div>
                <div className={classes.Second_Section}>
                    <div>

                        <select
                            className={`${classes.select} ${SelectedTypeInputIsInvalid ? classes.invalid : ''} `}
                            required
                            onChange={SelectedTypeInputChangeHandler}
                            onBlur={SelectedTypeInputBlurHandler}
                            value={enteredSelectedType}
                        >
                            <option className={classes.option} value='الفئةالطبية' > الفئة الطبية </option>
                            <option className={classes.option} value="doctor">طبيب</option>
                            <option className={classes.option} value="radiographer">مصور أشعة</option>
                            <option className={classes.option} value="analyzer">مخبري</option>
                            <option className={classes.option} value="pharmaceutical">صيدلي</option>

                        </select>
                        {SelectedTypeInputIsInvalid && (
                            <p className='error-text'>الرجاء اختيار الفئة الطبية .</p>
                        )}
                    </div>
                    <div>

                        <select
                            className={`${classes.select} ${SelectedGenderInputIsInvalid ? classes.invalid : ''} `}
                            required
                            onChange={SelectedGenderInputChangeHandler}
                            onBlur={SelectedGenderInputBlurHandler}
                            value={enteredSelectedGender}
                        >
                            <option className={classes.option} value='الجنس' >الجنس</option>
                            <option className={classes.option} value="male">ذكر</option>
                            <option className={classes.option} value="female"> أنثى</option>


                        </select>
                        {SelectedGenderInputIsInvalid && (
                            <p className='error-text'>الرجاء اختيار  الجنس .</p>
                        )}
                    </div>
                    <div>

                        <select
                            className={`${classes.select} ${SelectedGovernorateInputIsInvalid ? classes.invalid : ''} `}
                            required
                            onChange={SelectedGovernorateInputChangeHandler}
                            onBlur={SelectedGovernorateInputBlurHandler}
                            value={enteredSelectedGovernorate}
                        >
                            <option className={classes.option} value='المحافظة' >المحافظة</option>
                            <option className={classes.option} value="Damascus">دمشق</option>
                            <option className={classes.option} value="Rural Damascus">ريف دمشق</option>
                            <option className={classes.option} value="Latakia">اللاذقية</option>
                            <option className={classes.option} value="Tartus">طرطوس</option>
                            <option className={classes.option} value="Homs">حمص</option>
                            <option className={classes.option} value="Aleppo">حلب</option>
                            <option className={classes.option} value="Hama">حماة</option>
                            <option className={classes.option} value="Daraa">درعا</option>
                            <option className={classes.option} value="Idlib">إدلب</option>
                            <option className={classes.option} value="Raqqa"> الرقة</option>
                            <option className={classes.option} value="Al-Hasakah">الحسكة</option>
                            <option className={classes.option} value="Deir ez-Zor">دير الزور</option>
                            <option className={classes.option} value="Quneitra">القنيطرة</option>
                            <option className={classes.option} value="Sweida">السويداء</option>


                        </select>
                        {SelectedGovernorateInputIsInvalid && (
                            <p className='error-text'>الرجاء اختيار المحافظة .</p>
                        )}
                    </div>
                    <div>

                        <select
                            className={`${classes.select} ${SelectedBloodTypeInputIsInvalid ? classes.invalid : ''} `}
                            required
                            onChange={SelectedBloodTypeInputChangeHandler}
                            onBlur={SelectedBloodTypeInputBlurHandler}
                            value={enteredSelectedBloodType}
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
                        {SelectedBloodTypeInputIsInvalid && (
                            <p className='error-text'>الرجاء اختيار  زمرة الدم .</p>
                        )}
                    </div>






                </div>

                <div className={classes.Third_Section}>



                    <div>
                        <label htmlFor="fileInputfront">
                            <img src={Upload} alt="Choose File" />
                            <p> صورة الهوية وجه أمامي</p>
                        </label>
                        <input
                            id="fileInputfront"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleidSyrFrontChange}
                            accept="image/*"

                        />
                        {selectedidSyrFront && <p>{selectedidSyrFront.name}</p>}
                    </div>





                    <div>
                        <label htmlFor="fileInputback">
                            <img src={Upload} alt="Choose File" />
                            <p>صورة الهوية وجه خلفي</p>
                        </label>
                        <input
                            id="fileInputback"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleidSyrBackChange}
                            accept="image/*"

                        />
                        {selectedidSyrBack && <p>{selectedidSyrBack.name}</p>}
                    </div>
                    <div>
                        <label htmlFor="fileInputidmed">
                            <img src={Upload} alt="Choose File" />
                            <p> صورة البطاقة الطبية</p>
                        </label>
                        <input
                            id="fileInputidmed"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleidMedChange}
                            accept="image/*"

                        />
                        {selectedidMed && <p>{selectedidMed.name}</p>}
                    </div>







                </div>


                <div className={classes.Fourth_Section}>
                    <button disabled={!formIsValid}> تسجيل </button>
                </div>


            </form>



            <ToastContainer />
            {
                isLoading && <LoadingBar shadowStyle={{ display: 'none' }} color='#31af99' progress={100} height={5} loaderSpeed={15000} transitionTime={15000} />
            }
        </div>

    )
}
