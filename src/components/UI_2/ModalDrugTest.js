import React from 'react'
import { createPortal } from 'react-dom';
import classes from './ModalDrugTest.module.css'
import { InputDiseases } from './InputDiseases';
const ModalDrugTest = () => {
    return (
        <div className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
       
        <div className={classes.wrapper}>
            <div className={classes.first}>
                <h2>أضف دواء   </h2>
            </div>
            <div className={classes.second}>
                <InputDiseases detailsInputs={{
                    type: 'text',
                    label: 'الاسم'
                }}  />
            </div>
            <div className={classes.third}>
                <div className={classes.buttonwrapper}>
                    <button className={classes.btn}> أضف  </button>
                    <button className={classes.btn}>الغاء </button>
                </div>
               
            </div>
        </div>
        </div>
    )
}
export const ModalDT = () => {
    return (
      
          createPortal(<ModalDrugTest/>, document.getElementById('modal'))
      
    )
  }

