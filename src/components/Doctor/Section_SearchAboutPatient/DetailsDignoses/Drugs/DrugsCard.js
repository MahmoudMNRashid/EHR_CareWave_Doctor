import React, { useRef, useState } from 'react'
import classes from './DrugsCard.module.css'
import title from '../../../../../style/DetailsDiagnose/Drugs/medicine.png'
import name from '../../../../../style/DetailsDiagnose/Drugs/drugs.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faAngleDown, faAngleUp, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { getToken } from '../../../../../Util/Auth'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import { ModalForAddDrugs } from './ModalForAddDrugs'
import { ModalForEditDrugs } from './ModalForEditDrugs'
export const DrugsCard = (props) => {
  console.log('first',props)
  
  const { IdSyr, IdDiagnose } = useParams()
  // _______________________________________________________
  const [ModalEditDrugsIsOpen, setModalEditDrugsIsOpen] = useState(false)
  const handleOpenModalEditDrugsIsOpen = _ => setModalEditDrugsIsOpen(true)
  const handleCLoseModalEditDrugsIsOpen = _ => setModalEditDrugsIsOpen(false)

  const [isGive, SetisGive] = useState(false)
  const [info, setinfo] = useState({})
  const handleCollectData = (isGive, id, name) => {
    SetisGive(isGive)
    setinfo({ id, name })
    handleOpenModalEditDrugsIsOpen()
  }

  // ________________________________________________________

  const [ModalForAddDrugsIsOpen, setModalForAddDrugsIsOpen] = useState(false)
  const handleOpenModalForAddDrugsIsOpen = _ => setModalForAddDrugsIsOpen(true)
  const handleCLoseModalForAddDrugsIsOpen = _ => setModalForAddDrugsIsOpen(false)



  //___________________________________
  const nav = useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  const handleDeleteDrugs = async (id) => {
    setIsLoading(true)
    try {

      const response = await fetch(`http://localhost:8001/v1/Symptoms/drug/${id}`, {
        method: 'DELETE',
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
      if (data.data.message === 'deleted successfully.') {
        toast.success('تم الحذف بنجاح', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })

        nav(`/DashboardDoctor/HealthRecord/${IdSyr}/${IdDiagnose}`, { replace: true, state: { extra: props.extra } });
      }


    } catch (error) {
      if (error.message === `Can't found drug.`) {
        toast.error('!ممنوع الحذف', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

      } else if (error.message === `Can't delete`) {
        toast.error('!ممنوع الحذف', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

      } else {
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
    }
    setIsLoading(false)
  }

  const divRef = useRef(null);

  const handleScrollDown = () => {
    divRef.current.scrollTo({
      top: divRef.current.scrollTop + 100,
      behavior: 'smooth',
    });
  };

  const handleScrollUp = () => {
    divRef.current.scrollTo({
      top: divRef.current.scrollTop - 100,
      behavior: 'smooth',
    });
  };

  return (
    <div className={classes.container}>
      {!props.info.extra.isHasResult && (
        <div className={classes.disabledOverlay}>
          <p>لا يمكن أضافة وصفة حتى ظهور النتيجة</p>
        </div>
      )}
      <div
        className={`${classes.content} ${!props.info.extra.isHasResult ? classes.disabledContent : ''}`}
      >
        {props.info.drugs.length > 4 && (
          <>
            <button onClick={handleScrollUp} className={classes.up}>
              <FontAwesomeIcon color={'#4f5e75'} icon={faAngleUp} />
            </button>
            <button onClick={handleScrollDown} className={classes.down}>
              <FontAwesomeIcon color={'#4f5e75'} icon={faAngleDown} />
            </button>
          </>
        )}

        <div className={classes.title}>
          <div>
            <img src={title} alt='' />
            <p> الأدوية</p>
          </div>
          {props.info.extra.isHasPermission &&props.info.extra.canUpdate && 
            <button onClick={handleOpenModalForAddDrugsIsOpen}>
              <FontAwesomeIcon icon={faAdd} />
            </button>
          }
        </div>
        
        <div ref={divRef} className={classes.containerInfo}>
          {/* Rest of the content */}
          {props.info.drugs.length > 0 ? (
  
            props.info.drugs.map((item) => {
            
              // var idSyr =getIdSyr()
              var apiDate = new Date(item.dateRequest); // Assuming the date is in UTC
              var timeZoneOffset = new Date().getTimezoneOffset() / -60; // Convert to hours and negate
              var offsetHours = timeZoneOffset;
              var adjustedDate = new Date(apiDate.getTime() + offsetHours * 60 * 60 * 1000);
              const options = { year: "numeric", month: "long", day: "numeric" };
              const formattedAdjustedDate = adjustedDate.toLocaleDateString("ar", options);
              const hours = adjustedDate.getHours();
              const minutes = adjustedDate.getMinutes();
              const dateRequest = `${formattedAdjustedDate}`

              var apiDate1 = new Date(item.dateUpload); // Assuming the date is in UTC
              // Convert to hours and negate
              var adjustedDate1 = new Date(apiDate1.getTime() + offsetHours * 60 * 60 * 1000);
      
              const formattedAdjustedDate1 = adjustedDate1.toLocaleDateString("ar", options);
              const hours1 = adjustedDate1.getHours();
              const minutes1 = adjustedDate1.getMinutes();
              const dateUpload = `${formattedAdjustedDate1}`
              return (

                <div key={item.id} className={classes.info}>
                  <div>
                    <div>
                      <img src={name} alt='name' />
                      <p>{item.name}</p>
                    </div>
                  </div>
                  {item.isGive === false ? (
                    <p>لم يصرف الدواء بعد</p>
                  ) : (
                    <p>تم الصرف</p>
                  )}
                  <div className={classes.containerButtons}>

                   
                     {item.isGive===false&& <p className={classes.req}>{dateRequest}</p>}
                      {item.isGive===true && <p className={classes.upl}>{dateUpload}</p>}
                    

                    {item.isGive === false && props.info.extra.isHasPermission && (
                      <button
                        onClick={() => {
                          handleCollectData(isGive, item.id, item.name);
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                      </button>
                    )}
                    {item.isGive === false && props.info.extra.isHasPermission && (
                      <button
                        onClick={() => {
                          handleDeleteDrugs(item.id);
                        }}
                      >
                        <FontAwesomeIcon
                          color='#f05261'
                          icon={faTrashAlt}
                        ></FontAwesomeIcon>
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p> لا يوجد أدوية</p>
          )}
          {isGive === false && props.info.extra.isHasPermission && ModalEditDrugsIsOpen && (
            <ModalForEditDrugs
              close={handleCLoseModalEditDrugsIsOpen}
              info={info}
            />
          )}
          {props.info.extra.isHasPermission && ModalForAddDrugsIsOpen && (
            <ModalForAddDrugs close={handleCLoseModalForAddDrugsIsOpen} />
          )}
        </div>
        {isLoading && (
          <LoadingBar
            shadowStyle={{ display: 'none' }}
            color='#31af99'
            progress={100}
            height={5}
            loaderSpeed={15000}
            transitionTime={15000}
          />
        )}
      </div>
    </div>

  )
}
