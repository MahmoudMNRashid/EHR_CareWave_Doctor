import React from 'react'
import classes from './GeneralDetails.module.css'
import { DiseasesCard } from '../../components/UI_2/DiseasesCard'
import { VaccinesCard } from '../../components/Doctor/VaccinesCard'
import { GeneralInformationPatientCard } from '../../components/Doctor/GeneralInformationPatientCard'
import { GeneralDiagnosesCard } from '../../components/Doctor/GeneralDiagnosesCard'
import { useNavigate } from 'react-router-dom'

export const GeneralDetails = () => {
const nav = useNavigate()
    const buttonClickChangeHandler= ()=>{
        nav('DetailsDiagnose')
    }
    const details = {
        name: 'أحمد محسن كاكا ',
        age: '35',
        Governorate: 'ريف دمشق',
        address: 'دمشق-الشعلان',
        bloodType: 'AB+'
    }
    const chronic = {
        title: 'الأمراض المزمنة',
        diseases: ['التهاب المفاصل', 'ضغط الدم', 'التهاب المفاصل', 'سرطان القولون والمستقيم']
    }
    const genetic = {
        title: 'الأمراض الوراثية',
        diseases: ['فقر الدم المنجلي', 'مرض الاصطباغ الدموي الوراثي', 'ضمور العضلات الشوكي']
    }

    const allergic = {
        title: ' الأمراض التحسسية',
        diseases: ['الربو', 'سيلان الأنف التحسسي']
    }

    const vaccines = {
        title: 'اللقاحات',
        Vaccines:
            [
                {
                    name: 'لقاح شلل الأطفال',
                    date: '23/01/2022'
                },
                {
                    name: 'لقاح روتافيروس',
                    date: '12/12/2020'
                },
                {
                    name: 'لقاح الالتهاب الكبدي B',
                    date: '10/10/2019'
                },
                {
                    name: 'لقاح المكورات الرئوية',
                    date: '01/7/2012'
                },






            ]
    }
    const diagnoses = [
        {
            disease: 'lorem',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis lectus nulla at volutpat diam ut venenatis tellus in. A cras semper auctor neque vitae tempus quam pellentesque nec. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Blandit libero volutpat sed cras ornare arcu dui vivamus. Lorem sed risus ultricies tristique nulla aliquet. Aliquam ultrices sagittis orci a scelerisque. Nulla facilisi cras fermentum odio. Est sit amet facilisis magna etiam tempor orci eu. Morbi tempus iaculis urna id. Urna nec tincidunt praesent semper feugiat nibh sed pulvinar. Praesent semper feugiat nibh sed pulvinar proin. In arcu cursus euismod quis viverra. Scelerisque eu ultrices vitae auctor. Ac turpis egestas sed tempus urna. Dignissim enim sit amet venenatis urna cursus eget nunc scelerisque. Egestas diam in arcu cursus euismod quis viverra nibh cras. Malesuada fames ac turpis egestas sed tempus urna et pharetra. Risus commodo viverra maecenas accumsan.',
            date: '23/01/2022'
        },
        {
            disease: 'lorem',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis lectus nulla at volutpat diam ut venenatis tellus in. A cras semper auctor neque vitae tempus quam pellentesque nec. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Blandit libero volutpat sed cras ornare arcu dui vivamus. Lorem sed risus ultricies tristique nulla aliquet. Aliquam ultrices sagittis orci a scelerisque. Nulla facilisi cras fermentum odio. Est sit amet facilisis magna etiam tempor orci eu. Morbi tempus iaculis urna id. Urna nec tincidunt praesent semper feugiat nibh sed pulvinar. Praesent semper feugiat nibh sed pulvinar proin. In arcu cursus euismod quis viverra. Scelerisque eu ultrices vitae auctor. Ac turpis egestas sed tempus urna. Dignissim enim sit amet venenatis urna cursus eget nunc scelerisque. Egestas diam in arcu cursus euismod quis viverra nibh cras. Malesuada fames ac turpis egestas sed tempus urna et pharetra. Risus commodo viverra maecenas accumsan.',
            date: '23/02/2022'
        },
        {
            disease: 'lorem',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis lectus nulla at volutpat diam ut venenatis tellus in. A cras semper auctor neque vitae tempus quam pellentesque nec. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Blandit libero volutpat sed cras ornare arcu dui vivamus. Lorem sed risus ultricies tristique nulla aliquet. Aliquam ultrices sagittis orci a scelerisque. Nulla facilisi cras fermentum odio. Est sit amet facilisis magna etiam tempor orci eu. Morbi tempus iaculis urna id. Urna nec tincidunt praesent semper feugiat nibh sed pulvinar. Praesent semper feugiat nibh sed pulvinar proin. In arcu cursus euismod quis viverra. Scelerisque eu ultrices vitae auctor. Ac turpis egestas sed tempus urna. Dignissim enim sit amet venenatis urna cursus eget nunc scelerisque. Egestas diam in arcu cursus euismod quis viverra nibh cras. Malesuada fames ac turpis egestas sed tempus urna et pharetra. Risus commodo viverra maecenas accumsan.',
            date: '23/03/2022'
        },
        {
            disease: 'lorem',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis lectus nulla at volutpat diam ut venenatis tellus in. A cras semper auctor neque vitae tempus quam pellentesque nec. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Blandit libero volutpat sed cras ornare arcu dui vivamus. Lorem sed risus ultricies tristique nulla aliquet. Aliquam ultrices sagittis orci a scelerisque. Nulla facilisi cras fermentum odio. Est sit amet facilisis magna etiam tempor orci eu. Morbi tempus iaculis urna id. Urna nec tincidunt praesent semper feugiat nibh sed pulvinar. Praesent semper feugiat nibh sed pulvinar proin. In arcu cursus euismod quis viverra. Scelerisque eu ultrices vitae auctor. Ac turpis egestas sed tempus urna. Dignissim enim sit amet venenatis urna cursus eget nunc scelerisque. Egestas diam in arcu cursus euismod quis viverra nibh cras. Malesuada fames ac turpis egestas sed tempus urna et pharetra. Risus commodo viverra maecenas accumsan.',
            date: '23/04/2022'
        },

    ]
    return (
        <div className={classes.ThePage}>



            <div className={classes.Bigwrapper}>



                <div className={classes.FirstWrapper}>

                    <GeneralInformationPatientCard patient={details} />

                </div>

                <div className={classes.MiddleWrapper}>
                    <DiseasesCard info={chronic} />
                    <DiseasesCard info={genetic} />
                    <DiseasesCard info={allergic} />
                    <VaccinesCard info={vaccines} />
                </div>

                <div className={classes.ThirdWrapper}>


                    {
                        diagnoses.map((item) => {

                            return (
                                <React.Fragment key={Math.random()}>
                                    <GeneralDiagnosesCard  onClick={buttonClickChangeHandler} diagnoses={item} />
                                </React.Fragment>
                            )

                        })

                    }
                    <button className={classes.addButton}>
                      أضف تشخيص
                        <div className={classes.iconButton}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width={24}
                                height={24}
                            >
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path
                                    fill="currentColor"
                                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                                />
                            </svg>
                        </div>
                    </button>
                </div>

















            </div>







        </div>
    )
}
