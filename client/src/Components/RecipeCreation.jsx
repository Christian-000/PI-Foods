import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDiets, postRecipe } from "../Actions";


function validate(input){
    let errors = {};
    // title valitation
    if(!input.title) {
        errors.title = 'This field is required';
    }else if(input.title.length > 255){
        errors.title = 'The field cannot contain more than 255 characters';
    }
    // summary validation
    if(!input.summary) {
        errors.summary = 'This field is required'
    }
    // Score validation
    if(input.spoonacularScore < 0 || input.spoonacularScore > 100) {
        errors.spoonacularScore = 'The range of the score must be between 0 and 100';
    }
    if(input.healthScore < 0 || input.healthScore > 100) {
        errors.healthScore = 'The range of the score must be between 0 and 100';
    }

    return errors
}


export default function RecipeCreation(){
    const dispatch = useDispatch();
    const dietsList = useSelector(state => state.diets)
    
    const [errors, setErrors] = useState({title: ''});

    const [input, setInput] = useState({
        title: "",
        summary: "",
        spoonacularScore: 0,
        healthScore: 0,
        instructions: "",
        image: "",
        diets: []
    })
console.log(input);
    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch])
    // funciones controladoras
    function handleInputChange(e){
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value 
        })

        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value,
        }))
    }
console.log("SOY ERRORS: ",errors);
    function handleSelect(e){
        setInput({
            ...input,
            diets:[...input.diets, e.target.value]
        })
    }

    function handleDeleteDiets(diet){
        setInput({
            ...input,
            diets: input.diets.filter(el => el !== diet) 
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        if(Object.keys(errors).length > 0 || input.diets.length <= 0){
            alert('Some fields are wrong');
            if(input.diets.length <= 0) alert('Add at least a diet please');
        }else {
            dispatch(postRecipe(input));
            alert('Recipe has been created successfully!')
            setInput({
                title: "",
                summary: "",
                spoonacularScore: 0,
                healthScore: 0,
                instructions: "",
                image: "",
                diets: []
            })
        }
    }
    return (
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <h1>Recipe Creation</h1>
                <div>
                    <label>Name:</label>
                    <input type="text" name='title' value={input.title} onChange={e => handleInputChange(e)} />
                    {
                        errors.title && (
                            <p className = "errors">{errors.title}</p>
                        ) 
                    }
                </div>
                <div>
                    <label>Summary:</label>
                    <input type="text" name='summary' value={input.summary} onChange={e => handleInputChange(e)}/>
                    {
                        errors.summary && (
                            <p className = "errors">{errors.summary}</p>
                        ) 
                    }
                </div>
                <div>
                    <label>Dish Score:</label>
                    <input type="number" min="0" max="100" name='spoonacularScore' value={input.spoonacularScore} onChange={e => handleInputChange(e)}/>
                    {
                        errors.spoonacularScore && (
                            <p className = "errors">{errors.spoonacularScore}</p>
                        ) 
                    }
                </div>
                <div>
                    <label>Health Score:</label>
                    <input type="number" min="0" max="100" name='healthScore' value={input.healthScore} onChange={e => handleInputChange(e)}/>
                    {
                        errors.healthScore && (
                            <p className = "errors">{errors.healthScore}</p>
                        ) 
                    }
                </div>
                <div>
                    <label>Step by Step:</label>
                    <input type="text" name='instructions' value={input.instructions} onChange={e => handleInputChange(e)}/>
                </div>
                <div>
                    <label>Image:</label>
                    <input type="text" name='image' value={input.image} onChange={e => handleInputChange(e)}/>
                </div>
               <label>Add Diets</label>
                <select onChange={e => handleSelect(e)}>
                    {dietsList?.map(d => {
                        return <option value={d} key={d.id}>{d}</option>
                    })}
                </select>
                    {
                        errors.diets && (
                            <p className = "errors">{errors.diets}</p>
                        ) 
                    }
                <button type="submit">Create Recipe</button>
                
            </form>
                {
                    input.diets.map(el => {
                        return (
                            <div>
                                <p>{el}</p>
                                <button onClick={()=> handleDeleteDiets(el)}>X</button>
                            </div>
                        )
                    })
                }

        </div>
    )
}