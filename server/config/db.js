const mongoose = require('mongoose')

const mongoUri = process.env.MONGO_URI

const connectToMongoose =  async ()=>{
    mongoose.connect("Your DB URL")
    .then(() => {
       console.log("Database Connected")
    })
    .catch((error) => {
        console.log(error.message)
    })
}

module.exports = connectToMongoose
