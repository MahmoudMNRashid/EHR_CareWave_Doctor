import React, { useRef } from 'react'
import classes from './DrugsCard1.module.css'
import title from '../../../../style/DetailsDiagnose/Drugs/medicine.png'
import name from '../../../../style/DetailsDiagnose/Drugs/drugs.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons'

export const DrugsCard1 = (props) => {
  
  

  

  //___________________________________
 
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
         
        </div>
        
        <div ref={divRef} className={classes.containerInfo}>
          {/* Rest of the content */}
          {props.info.drugs.length > 0 ? (
            props.info.drugs.map((item) => {
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
                    

                 
                    
                  </div>
                </div>
              );
            })
          ) : (
            <p> لا يوجد أدوية</p>
          )}
         
        
        </div>
      
      </div>
    </div>

  )
}
