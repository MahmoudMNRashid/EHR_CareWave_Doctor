import React from 'react'
import classes from './Nav.module.css'
import { NavLink } from 'react-router-dom'

export const Nav = (props) => {
    return (

        <div className={` ${props.className} flex flex-col items-center w-16 h-full overflow-hidden text-gray-400 bg-gray-900 rounded`}>

            <div className="flex flex-col items-center mt-3 border-t border-gray-700">

                {props.svgPartOne.map((item) => {
                    return (
                        <NavLink  key={Math.random()} title={item.explanation} to={item.path} className={({ isActive }) =>
                            isActive ? `${classes.active} flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300` : `flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300`
                        } >

                            {item.icon}

                        </NavLink>
                    )


                })}
            </div>


            {
                props.svgPartTwo !== undefined ? <div className="flex flex-col items-center mt-2 border-t border-gray-700">
                    {props.svgPartTwo.map((item) => {
                        return (
                            <NavLink key={Math.random()} title={item.explanation} to={item.path} className={({ isActive }) =>
                                isActive ? `${classes.active} flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300` : `flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300`
                            } >

                                {item.icon}

                            </NavLink>
                        )


                    })}



                </div> : null
            }



        </div>

    )
}


/*


<NavLink title='اضف مساعد جديد' to='NewAssistant' className={({ isActive }) =>


                    isActive ? `${classes.active} flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300` : `flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300`

                } >
                    <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path fill='white' xmlns="http://www.w3.org/2000/svg" d="M14 14.252V16.3414C13.3744 16.1203 12.7013 16 12 16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14C12.6906 14 13.3608 14.0875 14 14.252ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM18 17V14H20V17H23V19H20V22H18V19H15V17H18Z" />
                    </svg>
                </NavLink>

                <NavLink title='البحث عن طبيب عن طريق الأسم' to='DoctorsSearchName' className={({ isActive }) =>


                    isActive ? `${classes.active} flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300` : `flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300`

                } >
                    <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path fill='white' xmlns="http://www.w3.org/2000/svg" d="M12 14V16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM21.4462 20.032L22.9497 21.5355L21.5355 22.9497L20.032 21.4462C19.4365 21.7981 18.7418 22 18 22C15.7909 22 14 20.2091 14 18C14 15.7909 15.7909 14 18 14C20.2091 14 22 15.7909 22 18C22 18.7418 21.7981 19.4365 21.4462 20.032ZM18 20C19.1046 20 20 19.1046 20 18C20 16.8954 19.1046 16 18 16C16.8954 16 16 16.8954 16 18C16 19.1046 16.8954 20 18 20Z" />
                    </svg>
                </NavLink>

                <NavLink title='البحث عن طبيب عن طريق الرقم الوطني' to='DoctorSearchIdSyr' className={({ isActive }) =>


                    isActive ? `${classes.active} flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300` : `flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300`

                } >
                    <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path fill='white' xmlns="http://www.w3.org/2000/svg" d="M15 4H5V20H19V8H15V4ZM3 2.9918C3 2.44405 3.44749 2 3.9985 2H16L20.9997 7L21 20.9925C21 21.5489 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918ZM13.529 14.4464C11.9951 15.3524 9.98633 15.1464 8.66839 13.8284C7.1063 12.2663 7.1063 9.73367 8.66839 8.17157C10.2305 6.60948 12.7631 6.60948 14.3252 8.17157C15.6432 9.48951 15.8492 11.4983 14.9432 13.0322L17.1537 15.2426L15.7395 16.6569L13.529 14.4464ZM12.911 12.4142C13.6921 11.6332 13.6921 10.3668 12.911 9.58579C12.13 8.80474 10.8637 8.80474 10.0826 9.58579C9.30156 10.3668 9.30156 11.6332 10.0826 12.4142C10.8637 13.1953 12.13 13.1953 12.911 12.4142Z" />
                    </svg>
                </NavLink>


                <NavLink title='الشكاوى' to='Complaints' className={({ isActive }) =>


                    isActive ? `${classes.active} flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300` : `flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300`

                } >
                    <svg
                        className="w-14 h-14 stroke-current"
                        fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" width="700pt" height="700pt" version="1.1" viewBox="0 0 700 700">
                        <path fill='white' d="m219.32 218.32c0-35.566 28.832-64.398 64.398-64.398s64.398 28.836 64.398 64.398c0 35.566-28.832 64.398-64.398 64.398s-64.398-28.832-64.398-64.398zm120.54 88.16h-105.14c-30.801 0-56 25.199-56 56v69.754h217.14v-69.754c0-30.797-25.199-56-56-56zm181.41-149.85v56.457c0 15.91-12.945 28.855-28.859 28.855h-6.9062l-34.047 21.117c-1.5859 0.98437-3.3672 1.4727-5.1445 1.4727-1.9961 0-3.9883-0.61719-5.6914-1.8398-3.2148-2.3125-4.7148-6.2969-3.8047-10.156l2.4844-10.594h-32.035c-15.91 0-28.852-12.945-28.852-28.855l-0.007813-56.457c0-15.91 12.945-28.859 28.852-28.859h85.152c15.918 0 28.859 12.949 28.859 28.859zm-11.199 0c0-9.7383-7.9258-17.66-17.66-17.66h-85.152c-9.7344 0-17.652 7.9219-17.652 17.66v56.457c0 9.7344 7.918 17.656 17.652 17.656h46.168l-4.918 20.969 33.801-20.969h10.102c9.7344 0 17.66-7.9219 17.66-17.656zm-51.91-2.707h-15.23c-1.3516 0-2.418 1.0547-2.3047 2.2852l4.0352 44.219h11.777l4.0312-44.219c0.10938-1.2305-0.95703-2.2852-2.3086-2.2852zm-5.2695 50.977h-4.6992c-1.9648 0-3.5625 1.5938-3.5625 3.5625v3.6562c0 1.9648 1.5938 3.5625 3.5625 3.5625h4.6992c1.9688 0 3.5625-1.5938 3.5625-3.5625v-3.6562c0-1.9648-1.5938-3.5625-3.5625-3.5625z" />
                    </svg>
                </NavLink>
*/



/*


 <NavLink title='النصائح الطبية' to='MedicalTips' className={({ isActive }) =>


                    isActive ? `${classes.active} flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300` : `flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300`

                } >
                    <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 122.88 107.77"><  path fill='white' d="M75.16,0h36.9a10.82,10.82,0,0,1,10.82,10.81V34.62a10.82,10.82,0,0,1-10.82,10.81H93.67L77.5,59.34a1.94,1.94,0,0,1-3.2-1.6l.85-12.31a10.82,10.82,0,0,1-10.8-10.81V10.81A10.82,10.82,0,0,1,75.16,0ZM27.62,94.74V57.24H44.5C51.65,58.52,58.8,62.4,66,66.9H79.06c5.93.36,9,6.37,3.27,10.32-4.59,3.38-10.66,3.18-16.88,2.62-4.28-.21-4.46,5.55,0,5.57,1.56.12,3.24-.24,4.72-.24,7.75,0,14.14-1.5,18-7.62l2-4.59,19.49-9.66c9.76-3.21,16.7,7,9.5,14.09a254,254,0,0,1-43.41,25.55c-10.75,6.55-21.51,6.32-32.26,0l-15.88-8.2ZM0,53.63H22.54V98.51H0V53.63ZM80.43,32.51a2.61,2.61,0,1,1,0-5.22H99.26a2.61,2.61,0,0,1,0,5.22Zm0-13.36a2.62,2.62,0,1,1,0-5.23h26.69a2.62,2.62,0,1,1,0,5.23ZM112.06,3.88H75.16a7,7,0,0,0-6.93,6.93V34.62a7,7,0,0,0,6.93,6.93h2.2a1.94,1.94,0,0,1,1.81,2.06l-.68,9.75L91.6,42.1A1.94,1.94,0,0,1,93,41.55h19.11A7,7,0,0,0,119,34.62V10.81a7,7,0,0,0-6.94-6.93Z" /></svg>
                </NavLink>

                
                <NavLink title='التقارير' to='Reports' className={({ isActive }) =>


                    isActive ? `${classes.active} flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300` : `flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300`

                } >
                    <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path fill='white' d="M11 7H13V17H11V7ZM15 11H17V17H15V11ZM7 13H9V17H7V13ZM15 4H5V20H19V8H15V4ZM3 2.9918C3 2.44405 3.44749 2 3.9985 2H16L20.9997 7L21 20.9925C21 21.5489 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918Z"></path>
                    </svg>
                </NavLink>

            </div>
            <NavLink title='تسجيل الخروج' to='/' className={({ isActive }) =>


                isActive ? `${classes.active} flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300` : `flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300`

            } >

                <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill='white' d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C15.2713 2 18.1757 3.57078 20.0002 5.99923L17.2909 5.99931C15.8807 4.75499 14.0285 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C14.029 20 15.8816 19.2446 17.2919 17.9998L20.0009 17.9998C18.1765 20.4288 15.2717 22 12 22ZM19 16V13H11V11H19V8L24 12L19 16Z"></path></svg>
            </NavLink>*/