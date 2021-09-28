const { Router } = require('express');
// Importar todos los routers;
const axios = require('axios');
const { Recipe, Diet, recipe_diets } = require('../db');
// Ejemplo: const authRouter = require('./auth.js');

//API KEY QUE USO EN EL MOMENTO
const api_key = 'fd77382035884170b784a242bd0b14d2'

const router = Router();

const data = async () => {
    // esto me devuelve un arreglo de objetos con una propiedad 'results'
    const array = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${api_key}`)
    //console.log('Esto me devuelve la API:', array.data.results);
    return array.data.results;
}
// GET --------------------------------------
router.get('/recipes', async (req, res) => {
    // INFO que traigo de la API
    const {name} = req.query;
    //compruebo si no me mandan nada por query
    if(typeof name === 'undefined'){
        const recipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${api_key}&&addRecipeInformation=true&&number=100`);
        
        if(recipes.length <= 0) return res.status(404).send('There is no recipe with that name')
        
        return res.json(recipes.data.results);
    }
    const recipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${api_key}&&titleMatch=${name}&&addRecipeInformation=true&&number=100`);

    const recipesAPI = recipes.data.results;

    if(recipesAPI.length <= 0) return res.status(404).send('There is no recipe with that name')


    // INFO que traigo de la DB

    const recipesDB = await Recipe.findAll({
        include:{
            model: Diet,
            through: {
                attributes: []
            }
        }
    })

    const totalInfo = recipesAPI.concat(recipesDB);

    if(totalInfo.length <= 0) return res.status(404).send('There is no recipe with that name')

    return res.json(totalInfo);
})




// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
