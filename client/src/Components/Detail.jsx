import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getRecipesDetail } from "../Actions";
import {Link} from 'react-router-dom'
import style from '../Styles/Details.module.css'

export default function Detail(){
    const dispatch = useDispatch();
    const recipeData = useSelector((state) => state.recipeId);
    const { id } = useParams();
    
    useEffect(()=> {
        dispatch(getRecipesDetail(id))
    }, [dispatch, id]);
    console.log('SOY RECIPE DATA:' ,recipeData)
    return (
        <div className={style.container}>
            {
                Object.keys(recipeData).length > 0 &&
                    (
                        <div key={recipeData.id}>
                            <h2 className={style.title}>{recipeData.title}</h2>
                            <div className={style.containerDetail}>
                                
                        
                                <div className={style.containerResume}>
                                    <h3 className={style.h3}>Resume</h3>
                                    <p className={style.p} dangerouslySetInnerHTML={{__html:recipeData.summary}}></p>
                                </div>
                                    <img src={recipeData.image} alt=""/>
                            </div>
                            <div className={style.containerStep}>
                                <h3 className={style.h3}>StepByStep</h3>
                                
                                <p className={style.p}>{recipeData.instructions === null? 'Do not have Instructions :(' : recipeData.instructions? recipeData.instructions.replace(/\//g, '').replace(/<li>/g, ' ').replace(/<ol>/g, '').replace(/<span>/g, ' ') : recipeData.analyzedInstructions.map(el => el.steps.map(steps=> steps.step))}</p>
                                
                            </div>
                            <div>
                                <h3 className={style.h3}>Diets</h3>
                                {recipeData.diets?.map(el => <p>{el + ' '}</p> )}
                            </div>
                            <div>
                                <h3 className={style.h3}>Health Score</h3>
                                
                                    <p className={style.p}>{recipeData.healthScore}</p>
                                
                            </div>
                        </div>
                    )
            }
            <button className={style.button}><Link to={'/home'}><i className='fa fa-home'></i>Home</Link></button>
        </div>
    )

}