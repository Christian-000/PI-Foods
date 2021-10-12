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
        const recipesInDB = await Recipe.findAll({
            include:{
                model: Diet,
                attributes: ['name']
            }
        })
        const recipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${api_key}&&addRecipeInformation=true&&number=100`);
        
        const allInfo = recipesInDB.concat(recipes.data.results)

        if(recipes.length <= 0) return res.status(404).send('There is no recipe with that name')
        
        return res.json(allInfo);
    }
    const recipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${api_key}&&titleMatch=${name}&&addRecipeInformation=true&&number=100`);

    const recipesAPI = recipes.data.results;

    if(recipesAPI.length <= 0) return res.status(404).send('There is no recipe with that name')


    // INFO que traigo de la DB

    const recipesDB = await Recipe.findAll({
        where: {
            title: name
        },
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


router.get('/recipes/:id', async (req, res) => {
    const {id} = req.params;
    if(id.length === 36) {
        
        const element = await Recipe.findAll({
            where: {
                id: id
            },
            include: {
                model: Diet,
                through: {
                    attributes: []
                }
            }
        });
        return res.json(element)

       
    } else {
       try{
            const recipeAPI = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${api_key}`);
        
            const {image, title, dishTypes, diets, summary, spoonacularScore, healthScore, instructions} = recipeAPI.data
            
            return res.json({
                image,
                title, 
                dishTypes, 
                diets, 
                summary, 
                spoonacularScore, 
                healthScore, 
                instructions
            });
       } catch(e) {
           res.status(404).send(e)
       }
        

    }



})


router.get('/types', async (req, res) => {
    
    // const typesApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${api_key}&number=100&addRecipeInformation=true`)
    //   const types = await typesApi.data.results.map((result) => {
    //     return result.diets; 
    //   });
    //   let final = types.flat();
    //   final.forEach((e) => {
    //     Diet.findOrCreate({
    //       where: { name: e },
    //     });
    //   });

    const diets = ["dairy free", "lacto ovo vegetarian", "vegan", "gluten free", "paleolithic", "primal", "pescatarian", "fodmap friendly", "whole 30"]
    
    diets.forEach(el => {
        Diet.findOrCreate({
            where: {name: el}
        });
    });
    
    const allTypes = await Diet.findAll()
    res.send(allTypes)
    
    
})



// POST--------------------

router.post('/recipe', async (req, res) => {
    
    // Esto me llega por Body
    const {title, summary, spoonacularScore, healthScore, diets, createdInDb, image} = req.body;

    let instructions = req.body.instructions

    if(instructions === ""){
        instructions = "Do not have instructions."
    }
    // Creo la nueva receta con lo que me llegó por Body
    const recipeCreated = await Recipe.create({
        title,
        summary,
        spoonacularScore,
        healthScore,
        instructions,
        image,
        createdInDb,
    })

    const findDiet = await Diet.findAll({
        where: {
            name: diets
        }
    })
    await recipeCreated.addDiet(findDiet);


    return res.send('Recipe has been created')
})

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
