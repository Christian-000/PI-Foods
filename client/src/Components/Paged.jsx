import React from "react";
import style from '../Styles/Paged.module.css'

export default function Paged({recipesPerPage, allRecipes, paged}){
    const pageNumber = [];

    for(let i=1; i<Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumber.push(i)
    }

    return (
        <nav>
            <ul className={style.ul}>
                {
                    pageNumber?.map(number => (
                        <li className='number' key={number}>
                            <a className={style.a} onClick={() => paged(number)}>{number}</a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}
