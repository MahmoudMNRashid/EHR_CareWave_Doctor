import React, { useState } from 'react'
import classes from './FindPatientForm.module.css'
import { MainInput } from '../../../Ui/MainInput'
import LoadingBar from 'react-top-loading-bar';
import ehr from '../../../../style/SearchPatient/ehr.jpg'
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { getRole, getToken } from '../../../../Util/Auth';
export const FindPatientForm = () => {


    const [enteredName, setEnteredName] = useState('');
    const [enteredNameTouched, setEnteredNameTouched] = useState(false);
    const nav = useNavigate()
    const [isLoading, setIsLoading] = useState(false);


    const enteredNameIsValid = enteredName.trim().length === 11;
    const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
    let formIsValid = false;




    if (enteredNameIsValid) {
        formIsValid = true;
    }

    const nameInputChangeHandler = (event) => {
        setEnteredName(event.target.value);
    };
    const nameInputBlurHandler = (event) => {
        setEnteredNameTouched(true);
    };

    const formSubmissionHandler = async (event) => {
        event.preventDefault();
        setEnteredNameTouched(true)
        setIsLoading(true)

        if (getRole() === 'doctor') {
            try {
                const response = await fetch(`http://localhost:8000/v1/HelpMedical/getinfosick/${enteredName}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `bearer ${getToken()}`

                    },
                })

                if (!response.ok) {
                    const data = await response.json()
                    throw data
                }

                nav(`/DashboardDoctor/HealthRecord/${enteredName}`, { replace: true })
            } catch (error) {
                if (error.message === `Can't found account.`) {
                    toast.warning('الرقم الوطني غير موجود')
                }else{
                    toast.error('حدث خطأ ما!')
                }

            }

            setIsLoading(false)
            setEnteredNameTouched(false)
        } else if (getRole() === 'radiographer') {
            nav(`/DashboardRadioGraphers/DiagnosesOfPatient/${enteredName}`)
        } else if (getRole() === 'pharmaceutical') {
            nav(`/DashboardPharmacist/DiagnosesOfPatient/${enteredName}`)
        } else if (getRole() === 'analyzer') {
            nav(`/DashboardMLS/DiagnosesOfPatient/${enteredName}`)
        } else {
            nav(`/DashboardMLS`)
        }

    };

    const nameConfiguration = { type: 'number', label: 'الرقم الوطني ' }
    return (
        <>
            <div className={classes.container}>
                <div className={classes.right}>


                    <div className={classes.imageContainer}>
                        <img src={ehr} alt='Ehr' />

                    </div>
                    <div className={classes.form} >

                        <div>
                            <MainInput
                                configuration={nameConfiguration}
                                onChange={nameInputChangeHandler}
                                onBlur={nameInputBlurHandler}
                                value={enteredName}
                                isInvalid={nameInputIsInvalid}


                            />
                            {nameInputIsInvalid && (
                                <p className={`error-text ${classes.a}`}>{'الرقم أقل أو أكثر من 11 خانة.'}</p>
                            )}
                        </div>
                        <button disabled={!formIsValid} onClick={formSubmissionHandler}> ابحث</button>
                    </div>


                </div>




                <div className={classes.left}>


                    <p>
                        مرحبًا بك في موقعنا، حيث نسعى لتوفير رعاية صحية عالية الجودة ومتقدمة. نحن نؤمن بأن السجل الصحي الإلكتروني هو أحد أدوات التكنولوجيا الحديثة التي تعزز تجربة المرضى وتحسن جودة الرعاية الصحية.

                        يُعرف السجل الصحي الإلكتروني بأنه نظام يمكن الطبيب من تسجيل ومشاركة والوصول إلى معلومات المرضى بطريقة آمنة ومنظمة. يعتمد على تقنيات الحوسبة السحابية وقواعد البيانات الإلكترونية لتخزين المعلومات الطبية بطريقة فعالة ومأمونة.

                        يعزز السجل الصحي الإلكتروني الاتصال والتعاون بين الأطباء والممرضين والموظفين الطبيين الآخرين في الوحدة الصحية، حيث يمكنهم الوصول إلى ملف المريض الإلكتروني بسهولة ومشاركة المعلومات المهمة بشكل فوري وآمن. يتيح هذا التبادل السريع للمعلومات إمكانية التشخيص الدقيق واتخاذ القرارات السريعة والتوصية بخطط العلاج المناسبة.

                        علاوة على ذلك، يتمتع المرضى بالعديد من المزايا عند استخدام السجل الصحي الإلكتروني. يمكنهم الوصول إلى سجلاتهم الصحية بسهولة من أي مكان وفي أي وقت باستخدام الأجهزة الذكية المتصلة بالإنترنت. يتيح لهم معرفة تفاصيل الزيارات السابقة والتشخيصات والوصفات الطبية ونتائج الفحوصات والتحاليل السابقة، مما يساعدهم على مراقبة حالتهم الصحية والمشاركة في عملية صنع القرار الخاصة برعايتهم الصحية.

                        نحن فخورون بتوفير السجل الصحي الإلكتروني كجزء من جهودنا المستمرة لتحسين الجودة والأمان في تقديم الرعاية الصحية. نحن نضمن الخصوصية والأمان الكاملين لمعلومات المرضى، ونعمل على توفير منصة سهلة الاستخدام وموثوقة للطبيب والمريض على حد سواء.

                        "


                    </p>

                </div>
            </div>
            {isLoading && <LoadingBar shadowStyle={{ display: 'none' }} color='#31af99' progress={100} height={5} loaderSpeed={15000} transitionTime={15000} />}
            <ToastContainer />
        </>
    )
}


