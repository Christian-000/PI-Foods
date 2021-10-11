import axios from 'axios';

export function getRecipes(){
    return async function(dispatch) {
        let allRecipes = await axios.get('http://localhost:3001/recipes');

        return dispatch({
            type: 'GET_RECIPES',
            payload: allRecipes.data
        })
    }
}

export function getRecipesName(name){
    return async function(dispatch){
        try {
            let json = await axios.get('http://localhost:3001/recipes?name=' + name);
            return dispatch({
                type: 'GET_RECIPES_NAME',
                payload: json.data
            })
        } catch (error) {
            return dispatch({
                type: 'ERROR_404'
            })
        }
    }
}

export function getDiets(){
    return async function(dispatch){
        try {
            let json = await axios.get('http://localhost:3001/types');
            const nameOfDiets = json.data.map(el => el.name)
            return dispatch({
                type: 'GET_DIETS',
                payload: nameOfDiets
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getRecipesDetail(id){
    return async function(dispatch){
        try {
            let json = await axios.get('http://localhost:3001/recipes/' + id);
            return dispatch({
                type: 'GET_RECIPES_DETAIL',
                payload: json.data
            })

        } catch (error) {
            console.log(error)
        }
    }
}

export function postRecipe(payload){
    return async function(dispatch){
        try {
            let post = await axios.post('http://localhost:3001/recipe', payload);
            return post;

        } catch (error) {
            console.log(error)
        }
    }
}

export function filterRecipesByDiet(payload){
    return {
        type: 'FILTER_RECIPES_BY_DIET',
        payload
    }
}

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}