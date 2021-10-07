import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, filterRecipesByDiet, orderByName } from "../Actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import { Fragment } from "react";
import Paged from "./Paged";
import SearchBar from "./SearchBar";
import styles from '../Styles/Home.module.css'

export default function Home() {

    //esta constamte va a ir despachado mis acciones
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    //Aca desarrollo mi paginado
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(9);
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const paged = (numberPage) => {
        setCurrentPage(numberPage);
    }

    // Estado que voy a usar para forzar el renderizado de mi componente
    const [orden, setOrden] = useState('');
    
    //quiero renderizar mis recetas cuando mi componente se monta
    useEffect(() => {
        dispatch(getRecipes());
    },[dispatch])

    // funciones controladoras
    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes);
    }
    
    function handleFilteredDiets(e) {
        dispatch(filterRecipesByDiet(e.target.value));
    }

    function hanldeSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }


    return (
        <div className={styles.container}>
            <Link to='/recipe'>Make your own recipe</Link>
            <button onClick={e => handleClick(e)}>Load Recipes</button>
            <div>
                <select onChange={e => handleFilteredDiets(e)}>
                    <option value="All">All</option>
                    <option value="gluten free">Gluten Free</option>
                    <option value="dairy free">Dairy Free</option>
                    <option value="paleolithic">Paleolithic</option>
                    <option value="lacto ovo vegetarian">Ovo-Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="pescatarian">Pescatarian</option>
                    <option value="primal">Primal</option>
                    <option value="fodmap friendly">Low FODMAP</option>
                    <option value="whole 30">Whole30</option>
                </select>
                <select onChange={(e) => hanldeSort(e)}>
                    <option value='asc'>Ascending</option>
                    <option value='desc'>Descending</option>
                    <option value="score">Higher score</option>
                </select>
                <div className={styles.paged}>
                <Paged
                    recipesPerPage={recipesPerPage}
                    allRecipes={allRecipes.length} // necesito el tamaño de mi arreglo
                    paged={paged}
                />
                </div>
                <SearchBar/>
                {
                    currentRecipes?.map((el) => {
                        return (
                            <Fragment key={el.title}>
                                <Card title={el.title} image={el.image} diets={el.createdInDb? el.diets.map(e => e.name): el.diets} id={el.id} key={el.id}/>
                            </Fragment>
                        )
                    })
                }

            </div>
        </div>
    )

}