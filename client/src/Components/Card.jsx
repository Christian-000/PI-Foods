import React from "react";
import { Link } from "react-router-dom";
import Style from "../Styles/Card.module.css"


export default function Card({title, image, diets, createdInDb,  id}) {
    return(
        <div className={Style.card}>
                <div className={Style.image}>
                    <img height='300px' src={image} alt="img not found" />
                </div>
                <div className={Style.cardText}>    
                    <h3>{title}</h3>
                    <p>{diets}</p>
                </div>    
        </div>
    )
}