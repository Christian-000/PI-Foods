import React from "react";
import { Link } from "react-router-dom";


export default function Card({title, image, diets, createdInDb, id}) {
    return(
        <div>
            <h3>{title}</h3>
            <img src={image} alt="img not found" />
            <h5>{diets}</h5>
            <Link to={`/detail/${id}`}>
                <span>See More...</span>
            </Link>
        </div>
    )
}