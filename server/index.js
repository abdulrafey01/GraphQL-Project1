const express = require('express')
require('dotenv').config();
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/schema')
const connectToMongoose = require('./config/db.js')
const colors = require('colors')
const cors = require('cors')



const port = process.env.PORT || 5000;

const app = express();


connectToMongoose();

app.use(cors())

app.listen(port,console.log(`Server is running on port ${port}`.cyan.underline.bold))

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV
}))




