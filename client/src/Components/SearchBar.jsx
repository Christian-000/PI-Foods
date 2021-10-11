import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesName } from "../Actions";
import style from '../Styles/SearchBar.module.css';

export default function SearchBar(){
    const dispatch = useDispatch();
    //aca me voy a guardar lo que pongan en el input
    const [name, setName] = useState('');

    function handleInput(e){
        e.preventDefault();
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getRecipesName(name))
    }

    return (
        <div>
            <input type="text" placeholder="Search..." onChange={e => handleInput(e)} className={style.input}/>
            <button type="submit" onClick={e => handleSubmit(e)} className={style.btn}>Search</button>
        </div>
    )
}