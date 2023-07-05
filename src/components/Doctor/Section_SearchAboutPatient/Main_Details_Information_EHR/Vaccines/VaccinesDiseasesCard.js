import React, { useState } from 'react'
import classes from './VaccinesDiseasesCard.module.css'
import vaccine from '../../../../../style/MainDiseases/vaccine.png'
import disease from '../../../../../style/MainDiseases/syringe-outline.png'
import date from '../../../../../style/MainDiseases/calendar.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faEdit } from '@fortawesome/free-solid-svg-icons'
import { ModalForAddVaccineOrDiseases } from '../Modals/ModalForAddVaccineOrDiseases'
import { ModalForEditVaccineOrDiseases } from '../Modals/ModalForEditVaccineOrDiseases'
export const VaccinesDiseasesCard = (props) => {
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
  return (
    <>
      <div className={classes.container}>
        <div className={classes.title}>
          <div>
            <img src={vaccine} alt='dna' />
            <p>  اللقاحات </p>
          </div>

          <button onClick={handleOpenmodalAddVaccineOrDiseases}> <FontAwesomeIcon icon={faAdd} />   </button>
        </div>
        <div className={classes.containerDiseases}>


          {props.info.vaccines.length ? (props.info.vaccines.map((item) => {
            const formattedDate = new Date(item.date).toLocaleDateString("en-US");
            return (
              <div key={item.id} className={classes.diseases}>
                <div >

                  <div>
                    <img src={disease} alt='disease' />
                    <p>{item.name}</p>
                  </div>
                  <div>
                    <img src={date} alt='date' />
                    <p>{formattedDate}</p>
                  </div>


                </div>


                <button onClick={() => {
                  handleToSendInformationToModal(item.name, item.id)
                }}> <FontAwesomeIcon icon={faEdit} />   </button>

              </div>

            )


          })) : (<p style={{ margin: 'auto', fontSize: '18px' }}>لايوجد</p>)}


        </div>



      </div>
      {modalAddVaccineOrDiseasesIsOpen && <ModalForAddVaccineOrDiseases close={handleClosemodalAddVaccineOrDiseases} idPatient={props.info.idPatient} idSyr={props.info.idSyr} name={'vaccines'} />}
      {modalEditVaccineOrDiseasesIsOpen && <ModalForEditVaccineOrDiseases close={handleClosemodalEditVaccineOrDiseases} information={information} name={'vaccines'} />}
    </>
  )
}
