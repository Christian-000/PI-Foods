/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const axios = require('axios')



const agent = session(app);
const recipe = {
  title: 'Milanea a la napolitana',
  summary: 'Milanga'
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('GET /recipes', () => {
    it('should get 200', () =>
      agent.get('/recipes').expect(200)
    );
  });
});

const arrayFn = async () => {
  let arr = await axios.get('http://localhost:3001/types');
  return arr = arr.data
  }

describe('GET /types', () => {
  it('should be a array', async() => {
    
    
    let arr = await arrayFn();
    let arrValidator = Array.isArray(arr);
    expect(arrValidator).to.equal(true)
  });

  it('The array must contain the diets', async () => {
    //copiar y pegar el output de postman
    let arr = await arrayFn();
    expect(arr.length).to.equal( 9 );
  })
})