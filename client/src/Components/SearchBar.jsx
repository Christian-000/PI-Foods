import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesName } from "../Actions";

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
            <input type="text" placeholder="Search..." onChange={e => handleInput(e)} />
            <button type="submit" onClick={e => handleSubmit(e)}>Search</button>
        </div>
    )
}