import React, { useRef, useState } from 'react'
import classes from './GeneticDiseasesCard.module.css'
import dna from '../../../../../style/MainDiseases/dna.png'
import disease from '../../../../../style/MainDiseases/hypoallergenic.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faAngleDown, faAngleUp, faEdit } from '@fortawesome/free-solid-svg-icons'
import { ModalForAddVaccineOrDiseases } from '../Modals/ModalForAddVaccineOrDiseases'
import { ModalForEditVaccineOrDiseases } from '../Modals/ModalForEditVaccineOrDiseases'
export const GeneticDiseasesCard = (props) => {
    // ________________________________
    const [modalAddVaccineOrDiseasesIsOpen, setmodalAddVaccineOrDiseasesIsOpen] = useState(false)
    const handleClosemodalAddVaccineOrDiseases = () => {
      setmodalAddVaccineOrDiseasesIsOpen(false)
    }
    const handleOpenmodalAddVaccineOrDiseases = () => {
      setmodalAddVaccineOrDiseasesIsOpen(true)
    }
    // _________________________________
    const [modalEditVaccineOrDiseasesIsOpen, setmodalEditVaccineOrDiseasesIsOpen] = useState(false)
    const handleClosemodalEditVaccineOrDiseases = () => {
      setmodalEditVaccineOrDiseasesIsOpen(false)
    }
    const handleOpenmodalEditVaccineOrDiseases = () => {
      setmodalEditVaccineOrDiseasesIsOpen(true)
    }
    // ___________________________________
    const [information, setinformation] = useState({})
    const handleToSendInformationToModal = (desc,id)=>{
    setinformation({
      desc,
      id,
      idPatient:props.info.idPatient,
      idSyr:props.info.idSyr
    
    })
    handleOpenmodalEditVaccineOrDiseases()
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
<>
    <div className={classes.container}>
    {props.info.diseases.length > 4 && <button onClick={handleScrollUp} className={classes.up}><FontAwesomeIcon color={'#2b1b9d'} icon={faAngleUp} /> </button>}
        {props.info.diseases.length > 4 && <button onClick={handleScrollDown} className={classes.down}><FontAwesomeIcon color={'#2b1b9d'} icon={faAngleDown} /> </button>}
      <div className={classes.title}>
       <div>
       <img src={dna} alt='dna' />
        <p> الامراض الوراثية</p>
       </div>

<button onClick={handleOpenmodalAddVaccineOrDiseases}> <FontAwesomeIcon icon={faAdd} />   </button>       
      </div>
      <div ref={divRef}   className={classes.containerDiseases}>

   
      {props.info.diseases.length ? (props.info.diseases.map((item) => {
          return (
            <div key={item.id} className={classes.diseases}>
              <div>
                <img src={disease} alt='disease' />
                <p>{item.name}</p>
              </div>
              <button onClick={()=>{
                  handleToSendInformationToModal(item.name,item.id)
                }}> <FontAwesomeIcon icon={faEdit} />   </button>

            </div>
          )


        })) : (<p style={{ margin: 'auto', fontSize:'18px'}}>لايوجد</p>)}
     

      </div>
      


    </div>
    {modalAddVaccineOrDiseasesIsOpen &&  <ModalForAddVaccineOrDiseases close={handleClosemodalAddVaccineOrDiseases} idPatient={props.info.idPatient} idSyr={props.info.idSyr} name={'genetic'} />}
    {modalEditVaccineOrDiseasesIsOpen && <ModalForEditVaccineOrDiseases close={handleClosemodalEditVaccineOrDiseases} information={information} name={'genetic'}  />}
    </>
  )
}
