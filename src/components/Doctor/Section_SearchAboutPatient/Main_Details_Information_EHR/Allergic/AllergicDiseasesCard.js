import React, { useRef, useState } from 'react'
import classes from './AllergicDiseasesCard.module.css'
import noise from '../../../../../style/MainDiseases/runny-nose.png'
import disease from '../../../../../style/MainDiseases/dna-test.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faAngleDown, faAngleUp, faEdit } from '@fortawesome/free-solid-svg-icons'
import { ModalForAddVaccineOrDiseases } from '../Modals/ModalForAddVaccineOrDiseases'
import { ModalForEditVaccineOrDiseases } from '../Modals/ModalForEditVaccineOrDiseases'
export const AllergicDiseasesCard = (props) => {
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
  const handleToSendInformationToModal = (desc, id) => {
    setinformation({
      desc,
      id,
      idPatient: props.info.idPatient,
      idSyr: props.info.idSyr

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
        {props.info.diseases.length > 4 && <button onClick={handleScrollUp} className={classes.up}><FontAwesomeIcon color={'#f44151'} icon={faAngleUp} /> </button>}
        {props.info.diseases.length > 4 && <button onClick={handleScrollDown} className={classes.down}><FontAwesomeIcon color={'#f44151'} icon={faAngleDown} /> </button>}
        <div className={classes.title}>
          <div>
            <img src={noise} alt='dna' />
            <p> الامراض التحسسية</p>
          </div>

          <button onClick={handleOpenmodalAddVaccineOrDiseases}> <FontAwesomeIcon icon={faAdd} />   </button>
        </div>
        <div ref={divRef} className={classes.containerDiseases}>

          {props.info.diseases.length ? (props.info.diseases.map((item) => {
            return (
              <div key={item.id} className={classes.diseases}>
                <div>
                  <img src={disease} alt='disease' />
                  <p>{item.name}</p>
                </div>
                <button onClick={() => {
                  handleToSendInformationToModal(item.name, item.id)
                }}> <FontAwesomeIcon icon={faEdit} />   </button>

              </div>
            )


          })) : (<p style={{ margin: 'auto', fontSize: '18px' }}>لايوجد</p>)}


        </div>



      </div>
      {modalAddVaccineOrDiseasesIsOpen && <ModalForAddVaccineOrDiseases close={handleClosemodalAddVaccineOrDiseases} idPatient={props.info.idPatient} idSyr={props.info.idSyr} name={'allergic'} />}
      {modalEditVaccineOrDiseasesIsOpen && <ModalForEditVaccineOrDiseases close={handleClosemodalEditVaccineOrDiseases} information={information} name={'allergic'} />}
    </>

  )
}
