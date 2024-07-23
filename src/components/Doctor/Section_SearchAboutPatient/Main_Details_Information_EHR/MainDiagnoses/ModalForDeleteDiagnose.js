import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import classes from './ModalForDeleteDiagnose.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

import LoadingBar from 'react-top-loading-bar';
import { getToken } from '../../../../../Util/Auth';
import { useNavigate, useParams } from 'react-router-dom';


const DeleteAccount= (props)=>{
    
    const {IdSyr} = useParams()
    const nav = useNavigate()

  const [isLoading, setIsLoading] = useState(false);
  const formSubmissionHandler = async (event) => {
    setIsLoading(true);
    if (!props.idDiagnose) {
      return;
    }
  
  
    try {
      const response = await fetch(`http://localhost:8001/v1/Symptoms/delete/${props.idDiagnose}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${getToken()}`

        },
      });
      if (!response.ok) {
        const data = await response.json()
        throw data;
      }
      const data = await response.json()

      if(data.data.message==='deleted successfully.'){
      toast.success('تم الحذف بنجاح', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        
      });
      nav(`/DashboardDoctor/HealthRecord/${IdSyr}`,{replace:true})
    }
    } catch (error) {
      
      if (error.message === `Can't found symptom.`) {
        toast.warn('ممنوع حذف التشخيص', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (error.message===`Can't delete.`) {
        toast.error('!ممنوع حذف التشخيص', {
          position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      }else{
        toast.error('! حدث خطأ ما', {
            position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
      
    }
    setIsLoading(false);
    props.close()
  }



  return(
    <div className={classes.container}>
       
       <div>
        <p className={classes.ps}> هل أنت متأكد من  حذف التشخيص </p>
       </div>
       <div className={classes.buttons}>
       <button onClick={formSubmissionHandler} ><FontAwesomeIcon style={{color:'#ff1111  '}} icon={faTrashCan}/></button>
       <button onClick={props.close}><FontAwesomeIcon style={{color:'lightslategray  '}} icon={faXmark}/></button>
       </div>
       {isLoading && <LoadingBar shadowStyle={{ display: 'none' }} color='#31af99' progress={100} height={5} loaderSpeed={15000} transitionTime={15000} />}
    </div>
  )

}


export const ModalForDeleteDiagnose = (props) => {
console.log(props)
    return (
        <React.Fragment>
            {/* {ReactDOM.createPortal(<Backdrop close={props.close} />, document.getElementById('modal'))} */}
            {ReactDOM.createPortal(<DeleteAccount idDiagnose={props.idDiagnose}  close={props.close}/>, document.getElementById('modal'))}
        </React.Fragment>
    );

};
