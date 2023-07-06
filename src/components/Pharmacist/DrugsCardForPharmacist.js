import React, { useState } from 'react'
import classes from './DrugsCardForPharmacist.module.css'
import title from '../../style/DetailsDiagnose/Drugs/medicine.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { getToken } from '../../Util/Auth'
import LoadingBar from 'react-top-loading-bar'

export const DrugsCardForPharmacist = (props) => {

  console.log(props)
  const { IdSyr, IdDiagnose } = useParams()
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([])

  const handleCheckboxChange = (id) => {
    setSelectedCheckboxes((prevSelectedCheckboxes) => {
      if (prevSelectedCheckboxes.includes(id)) {
        return prevSelectedCheckboxes.filter((checkboxId) => checkboxId !== id);
      } else {
        return [...prevSelectedCheckboxes, id];
      }
    });
  };

  let formIsValid = true;

  if (selectedCheckboxes.length === 0) {
    formIsValid = false
  }

  const nav = useNavigate()
  const [isLoading, setIsLoading] = useState(false);



  const sendSelectedCheckboxes = async () => {
    const requestBody = selectedCheckboxes.map((checkboxId) => ({
      drugId: checkboxId,
    }));

    setIsLoading(true)
    console.log(requestBody)
    try {

      const response = await fetch('http://localhost:8001/v1/Aid/give/Drug', {
        body: JSON.stringify(requestBody),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${getToken()} `

        },


      });
      if (!response.ok) {
        const data = await response.json()
        throw data;
      }
      const data = await response.json()
      if (data.data.message === 'Updated successfully') {
        toast.success('تم صرف الوصفة بنجاح', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })

        nav(`/DashboardPharmacist/DiagnosesOfPatient/${IdSyr}/${IdDiagnose}`, { replace: true });
      }


    } catch (error) {

      toast.error('!حدث خطأ ما', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });


    }
    setIsLoading(false)
  };
  return (


    <div className={classes.container}>

      <div className={classes.title}>
        <div>
          <img src={title} alt='' />
          <p> الوصفة</p>
        </div>
      </div>


      <div className={classes.con}>
        {props.info.map((item, index) => (
          <div key={index} className={classes.contaienrinfo}>
            <label className={`${classes['cyberpunk-checkbox-label']}`}>
              <input
                disabled={item.isGive === true}
                className={`${classes["cyberpunk-checkbox"]}`}
                type="checkbox"
                onChange={() => handleCheckboxChange(item.id)}
                checked={selectedCheckboxes.includes(item.id) || item.isGive}
              />
              <p> {item.name}</p>
            </label>
          </div>

        ))}
        <button disabled={!formIsValid} className={classes.btn} onClick={sendSelectedCheckboxes}><FontAwesomeIcon color='#4f5e75' icon={faCheckDouble} /></button>
        {isLoading && <LoadingBar shadowStyle={{ display: 'none' }} color='#31af99' progress={100} height={5} loaderSpeed={15000} transitionTime={15000} />}
        <ToastContainer />
      </div>


    </div>
  )
}
