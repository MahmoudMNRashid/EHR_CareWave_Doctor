import React from 'react'
import ReactDOM from 'react-dom';
import classes from './ModalForShowResultofAnalysis.module.css'
import info from '../../../../../style/DetailsDiagnose/Analysis/info.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Carousel } from 'react-bootstrap';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

const Backdrop = (props) => {
    return (
        <div className={classes.backdrop} onClick={props.onClick}></div>
    );
};
const ModalShow = (props) => {
console.log(props)
    return (
        <>
        <Backdrop onClick={props.close} />
        <div className={classes.modal}>
            <Carousel >

                <Carousel.Item style={{ width: '100%' }}>
                    <TransformWrapper initialScale={1}  >

                        <TransformComponent>
                            <img style={{ aspectRatio: '16/12', width: '640px' }} src={`http://localhost:8001${props.result}`} alt="test" />
                        </TransformComponent>
                    </TransformWrapper>
                </Carousel.Item>




            </Carousel>

        </div>
        </>

    )
}
export const ModalForShowResultofAnalysis = (props) => {

    return (

        ReactDOM.createPortal(<ModalShow close={props.close} result={props.result} />, document.getElementById('modal'))

    )
}
