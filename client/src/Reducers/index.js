

const initialState = {
    recipes: [],
    allRecipes: [],
    recipeId: [],
    diets: []
}

export default function rootReducer(state = initialState, action){

    switch (action.type) {
        case 'GET_RECIPES':
            return{
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
        case 'GET_RECIPES_NAME':
            return{
                ...state,
                recipes: action.payload
            };
        case 'GET_RECIPES_DETAIL':
            return {
                ...state,
                recipeId: action.payload
            }
        case 'GET_DIETS':
            return{
                ...state,
                diets: action.payload
            }
        case 'POST_RECIPE':
            return{
                ...state
            }
        case 'FILTER_RECIPES_BY_DIET':
            const recipes = state.allRecipes;
            // const recipeFilter =
            // action.payload === "All"
            // ? recipes
            // : recipes.filter((el) =>
            //    el.createdInDb
            //     ? el.diets.filter((e) => e.name.includes(action.payload)) 
            //     : el.diets.includes(action.payload)
            // );
            let recipeFilter = [];
            if(action.payload === 'All'){
                recipeFilter = recipes
            }else {
                for(let i=0; i<recipes.length; i++){
                    if(recipes[i].createdInDb){
                        for(let j=0; j<recipes[i].diets.length; j++){
                            if(recipes[i].diets[j].name === action.payload){
                                recipeFilter.push(recipes[i])
                            }
                        }
                    }else {
                        if(recipes[i].diets.includes(action.payload) && !recipes[i].createdInDb) recipeFilter.push(recipes[i])
                    }    
                }
            }
            
            return {
                ...state,
                recipes: recipeFilter
            };
        case 'ORDER_BY_NAME':
            if (action.payload === "asc") {
                let orderASC = state.recipes.sort(function (a, b) {
                  if (a.title < b.title) {
                    return -1;
                  }
                  if (a.title > b.title) {
                    return 1;
                  }
                  return 0;
                });
                return {
                  ...state,
                  recipes: orderASC,
                };
              }
              if (action.payload === "desc") {
                let orderDES = state.recipes.sort(function (a, b) {
                  if (a.title > b.title) {
                    return -1;
                  }
                  if (a.title < b.title) {
                    return 1;
                  }
                  return 0;
                });
                return {
                  ...state,
                  recipes: orderDES,
                };
              }
              if (action.payload === "score") {
                let orderByScore = state.recipes.sort(function (a, b) {
                  if (a.spoonacularScore > b.spoonacularScore) {
                    return -1;
                  }
                  if (a.spoonacularScore < b.spoonacularScore) {
                    return 1;
                  }
                  return 0;
                });
                return {
                  ...state,
                  recipes: orderByScore,
                };
              }
              break;
        default:
            return state;
    }

}