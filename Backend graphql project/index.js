const express = require('express');
require('dotenv').config();
const {graphqlHTTP} = require('express-graphql');

const schema = require("./schema/schema")
const connectToDB = require("./config/db")

const app = express();
const port = process.env.PORT || 1234;


app.use('/graphql',graphqlHTTP({
    graphiql: process.env.NODE_ENV === "development",
    schema
}))

app.listen(port, ()=>{
    connectToDB(); //Connect to DB 
    console.log(`Server is running on port ${port}`);
})