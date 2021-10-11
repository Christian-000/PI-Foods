import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDiets, postRecipe } from "../Actions";
import { Link } from "react-router-dom";
import style from '../Styles/RecipeCreation.module.css'

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
console.log('errors',errors)

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
    }//TERMINAR DE PONER LOS DIVS CONTENEDORES DE INPUT-LABEL-CUT
    return (
        <div className={style.formContainer}>
            <form onSubmit={e => handleSubmit(e)} className={style.form}>
                <h1 className={style.title}>Recipe Creation</h1>
                <div className={`${style.containerInput1}, ${style.inputContainer}`}>
                    <label className={style.placeHolder}>Name</label>
                    <div className={style.cut}></div>
                    <input type="text" name='title' value={input.title} onChange={e => handleInputChange(e)} className={style.input} />
                    {
                        errors.title && (
                            <p className = {style.errors}>{errors.title}</p>
                        ) 
                    }
                </div>
                <div className={`${style.containerInput2}, ${style.inputContainer}`}>
                    <label className={style.placeHolder}>Summary</label>
                    <div className={style.cut}></div>
                    <input type="text" name='summary' value={input.summary} onChange={e => handleInputChange(e)} className={style.input}/>
                    {
                        errors.summary && (
                            <p className = {style.errors}>{errors.summary}</p>
                        ) 
                    }
                </div>
                <div className={`${style.containerInput2}, ${style.inputContainer}`}>
                    <label className={style.placeHolder}>Dish Score</label>
                    <div className={style.cut}></div>
                    <input type="number" min="0" max="100" name='spoonacularScore' value={input.spoonacularScore} onChange={e => handleInputChange(e) } className={style.input}/>
                    {
                        errors.spoonacularScore && (
                            <p className = {style.errors}>{errors.spoonacularScore}</p>
                        ) 
                    }
                </div>
                <div className={`${style.containerInput2}, ${style.inputContainer}`}>
                    <label className={style.placeHolder}>Health Score</label>
                    <div className={style.cut}></div>
                    <input type="number" min="0" max="100" name='healthScore' value={input.healthScore} onChange={e => handleInputChange(e)} className={style.input}/>
                    {
                        errors.healthScore && (
                            <p className = {style.errors}>{errors.healthScore}</p>
                        ) 
                    }
                </div>
                <div className={`${style.containerInput2}, ${style.inputContainer}`}>
                    <label className={style.placeHolder}>Step by Step</label>
                    <div className={style.cut}></div>
                    <input type="text" name='instructions' value={input.instructions} onChange={e => handleInputChange(e)} className={style.input}/>
                </div>
                <div className={`${style.containerInput2}, ${style.inputContainer}`}>
                    <label className={style.placeHolder}>Image</label>
                    <div className={`${style.cut}, ${style.cutShort}`}></div>
                    <input type="text" name='image' value={input.image} onChange={e => handleInputChange(e)} className={style.input}/>
                </div>
               <label className={style.placeHolder}>Add Diets</label>
                <select onChange={e => handleSelect(e)} className={style.select}>
                    {dietsList?.map(d => {
                        return <option value={d} key={d.id}>{d}</option>
                    })}
                </select>
                    {
                        errors.diets && (
                            <p className ={style.errors}>{errors.diets}</p>
                        ) 
                    }
                <button type="submit" className={style.submit}>Create Recipe</button>
                
            </form>
                {
                    input.diets.map(el => {
                        return (
                            <div>
                                <p className={style.dietP}>{el.charAt(0).toUpperCase() + el.slice(1)}</p>
                                <button onClick={()=> handleDeleteDiets(el)} className={style.close}>X</button>
                            </div>
                        )
                    })
                }
            <button className={style.button}><Link to={'/home'}><i className='fa fa-home'></i>Home</Link></button>
        </div>
    )
}