import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getRecipesDetail } from "../Actions";

export default function Detail(){
    const dispatch = useDispatch();
    const recipeData = useSelector((state) => state.recipeId);
    const { id } = useParams();
    
    useEffect(()=> {
        dispatch(getRecipesDetail(id))
    }, [dispatch, id]);
    console.log('SOY RECIPE DATA:' ,recipeData)
    return (
        <div>
            {
                Object.keys(recipeData).length > 0 &&
                    (
                        <div key={recipeData.id}>
                            <h2>{recipeData.title}</h2>
                            
                            <div>
                                <img src={recipeData.image} alt=""/>
                            </div>

                            <div>
                                <h3>Resume</h3>
                                <p>
                                    {recipeData.summary}
                                </p>
                            </div>
                            <div>
                                <h3>StepByStep</h3>
                                {/*REFACTORIZAR EL <P> PARA QUE FUNCIONE PARA TODOS LOS CASOS*/}
                                {
                                    <p>{recipeData.instructions === null? 'Do not have Instructions :(' : recipeData.instructions? recipeData.instructions : recipeData.analyzedInstructions.map(el => el.steps.map(steps=> steps.step))}</p>

                                }
                            </div>
                        </div>
                    )
            }
        </div>
    )

}