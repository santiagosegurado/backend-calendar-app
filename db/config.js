const mongoose = require('mongoose');

const dbConnection = async() => {
  try {
    
    mongoose.connect(process.env.MONGO_DB_CNN);

    console.log("DB Online");

  } catch (error) {
    console.log(error);
    throw new Error('No se pudo conectar a MongoDB');
  }
}

module.exports = {
  dbConnection
};