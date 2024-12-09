const mongoose = require('mongoose');
async function connectToMongoDB(uri){
    await mongoose
    .connect(process.env.uri)
    .then(() => console.log(`Mongo Db Conneted`))
    .catch((err) => {
      console.error("Error connecting to MongoDB Atlas", err);
    });
}


module.exports = connectToMongoDB;  