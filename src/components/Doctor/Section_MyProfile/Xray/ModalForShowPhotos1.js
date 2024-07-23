import React from 'react';
import { Carousel } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import classes from './ModalForShowPhotos1.module.css'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";


const Backdrop = (props) => {
    return <div onClick={() => { props.close() }} className={classes.backdrop} />;
};
const ModalShow = (props) => {

    console.log(props.close)

    return (


        <div className={classes.modal}>
            <Carousel >
                {props.Photos.map((image, index) => (
                    <Carousel.Item style={{width:'100%'}} key={index}>
                        <TransformWrapper initialScale={1}  >

                            <TransformComponent>
                                <img style={{ aspectRatio: '16/9',width:'640px' }} src={`http://localhost:8001${image}`} alt="test" />
                            </TransformComponent>
                        </TransformWrapper>
                    </Carousel.Item>


                ))}

            </Carousel>

        </div>



    );
};

export const ModalForShowPhotos = (props) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop close={props.close} />, document.getElementById('modal'))}
            {ReactDOM.createPortal(<ModalShow Photos={props.Photos} />, document.getElementById('modal'))}
        </React.Fragment>
    );

};
