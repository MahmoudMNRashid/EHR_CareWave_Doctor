import React, { useState } from 'react'
import classes from './MainDetailsDiagnoseCard.module.css'
import date from '../../../../../style/DetailsDiagnose/DetailsDigCard/calendar (1).png'
import desc from '../../../../../style/DetailsDiagnose/DetailsDigCard/file (1).png'
import name from '../../../../../style/DetailsDiagnose/DetailsDigCard/infectious.png'
import title from '../../../../../style/DetailsDiagnose/DetailsDigCard/medical-report.png'
import add from '../../../../../style/DetailsDiagnose/DetailsDigCard/plus.png'
import edit from '../../../../../style/DetailsDiagnose/DetailsDigCard/edit.png'
import {  ModalForAddResult } from './ModalForAddResult'
import { ModalForEditResult } from './ModalForEditResult'




export const MainDetailsDiagnoseCard = (props) => {
  const [modalAddResultIsOpen, setmodalAddResultIsOpen] = useState(false)
  const handleClosemodalAddResult = _ => setmodalAddResultIsOpen(false)

  const handleOpenmodalAddResult = _ => setmodalAddResultIsOpen(true)

  const [modalEditResultIsOpen, setmodalEditResultIsOpen] = useState(false)
  const handleClosemodalEditResult = _ => setmodalEditResultIsOpen(false)

  const [info, setinfo] = useState({})
  const handleOpenmodalEditResult = (name, desc) => {
    setinfo({ name, desc })
    console.log('hi', name, desc)
    setmodalEditResultIsOpen(true)


  }


  return (
    <div className={classes.container}>

      <div className={classes.pos}>

        <div  >

         <p>من قبل :</p>
         <p>{props.info.idSyrDoctor}</p>

        </div>

      </div>

      <div className={classes.title}>
        <img src={title} alt='title' />
        <p>  نتيجة التشخيص</p>
      </div>

      <div className={classes.contaienerInfo}>
        <div className={classes.info}>
          <img src={date} alt='date' />
          <p>{props.info.date}</p>

        </div>
        <div className={classes.info}>
          <img src={name} alt='name' />

          {props.info.extra.isHasResult === false ? (<p style={{ color: '#f05261 ' }}>لم تظهر النتيجة بعد</p>) : <p>{props.info.extra.nameDisease}</p>}

        </div>
        <div className={classes.info}>
          <img src={desc} alt='desc' />

          {props.info.extra.isHasResult === false ? (<p style={{ color: '#f05261' }}>لم تظهر النتيجة بعد</p>) : <p className={classes.test}>{props.info.extra.description}</p>}

        </div>

        <div className={classes.info}>


          {props.info.extra.isHasResult === false && props.info.extra.isHasPermission === true && <button onClick={handleOpenmodalAddResult}> <img src={add} alt='أضافة النتيجة' /></button>}
          {props.info.extra.canUpdate === true && props.info.extra.isHasResult === true && props.info.extra.isHasPermission === true && <button onClick={() => { handleOpenmodalEditResult(props.info.extra.nameDisease, props.info.extra.description) }}> <img src={edit} alt='تعديل  النتيجة' /></button>}
        </div>


        {
          modalAddResultIsOpen && <ModalForAddResult close={handleClosemodalAddResult} />
        }
        {
          modalEditResultIsOpen && <ModalForEditResult close={handleClosemodalEditResult} info={info} />
        }

      </div>



    </div>
  )
}
