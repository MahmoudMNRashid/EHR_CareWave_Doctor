import React from 'react'
import classes from './MainInformationPatientCard.module.css'
import phone from '../../../../../style/maininfopatient/add-contact.png'
import blood from '../../../../../style/maininfopatient/blood-type.png'
import date from '../../../../../style/maininfopatient/age.png'
import name from '../../../../../style/maininfopatient/id-card.png'
import address from '../../../../../style/maininfopatient/location.png'
import state from '../../../../../style/maininfopatient/real-state.png'
import title from '../../../../../style/maininfopatient/data-privacy.png'
export const MainInformationPatientCard = (props) => {

    return (
        <div className={classes.container}>

            <div className={classes.title}>

                <img src={title} alt='بيانات المريض' />
                <p>بيانات المريض</p>


            </div>
            <div className={classes.containerInfo}>


                <div className={classes.info}>
                    <img src={name} alt='name' />
                    <p>  {props.info.name}</p>
                </div>

                <div className={classes.info}>
                    <img src={date} alt='birth' />
                    <p>{`${props.info.age} (${props.info.year})`}</p>
                </div>

                <div className={classes.info}>
                    <img src={phone} alt='phone' />
                    <p>{props.info.phone}</p>
                </div>

                <div className={classes.info}>
                    <img src={state} alt='state' />
                    <p> {props.info.governorate}</p>
                </div>

                <div className={classes.info}>
                    <img src={address} alt='address' />
                    <p> {props.info.address} </p>
                </div>

                <div className={classes.info}>
                    <img src={blood} alt='blood' />
                    <p>{props.info.bloodType}</p>
                </div>

            </div>




        </div>
    )
}

// اسم تاريخميلاد جوال  محافظة عنوان زمرة الدم 