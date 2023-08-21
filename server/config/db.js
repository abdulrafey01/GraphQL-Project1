const mongoose = require('mongoose')

const mongoUri = process.env.MONGO_URI

const connectToMongoose =  async ()=>{
    mongoose.connect("mongodb+srv://AbdulRafey:LightsOfLife@cluster0.ayls3gp.mongodb.net/mgmt_db?retryWrites=true&w=majority")
    .then(() => {
       console.log("Database Connected")
    })
    .catch((error) => {
        console.log(error.message)
    })
}

module.exports = connectToMongoose