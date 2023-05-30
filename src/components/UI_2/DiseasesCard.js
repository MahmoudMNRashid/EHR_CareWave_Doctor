import React from 'react'
import classes from './DiseasesCard.module.css'

export const DiseasesCard = (props) => {


    return (
        <div className={classes.CardDiseases}>  

            <div className={classes.title}><h2>{props.info.title} </h2></div>
    
            <ul className={classes.list}>
            { 
            
            props.info.diseases.map((item)=>{
                return(
                    <li key={Math.random()}>
                    <button className={classes.btn}> {item} </button>
                </li> 
                )

            })
            }

            </ul>

            <div className={classes.WrapperPlus}>
                <button className={classes.add}>
                    +
                </button>

            </div>


        </div>
    )
}
