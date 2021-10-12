const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    spoonacularScore: {
      type: DataTypes.REAL,
      defaultValue: 0
    },
    healthScore: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    instructions: {
      type: DataTypes.TEXT,
      defaultValue: 'Do not have Instrucctions.'
    },
    image: {
      type: DataTypes.TEXT,
      defaultValue: 'https://us.123rf.com/450wm/blankstock/blankstock1408/blankstock140801059/30496471-signo-de-interrogaci%C3%B3n-signo-icono-s%C3%ADmbolo-de-ayuda-signo-de-preguntas-frecuentes-bot%C3%B3n-plano-gris-c.jpg?ver=6'
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });
};
