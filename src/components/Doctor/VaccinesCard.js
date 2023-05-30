import React from 'react'
import classes from './VaccinesCard.module.css'

export const VaccinesCard = (props) => {
    return (
        <div className={classes.VaccinesCard}>

            <div className={classes.title}><h2>{props.info.title} </h2></div>

            <ul className={classes.list}>
                {

                    props.info.Vaccines.map((item) => {
                        return (
                            <li key={Math.random()}>
                                <button className={classes.btn}>
                                    <span>{item.name}</span>
                                    <svg
                                   
                                        width={20}
                                        height={20}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                    >
                                        <path   fill='#F5F5F5' d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z" />
                                    </svg>
                                    <span>{item.date} </span>


                                </button>
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
