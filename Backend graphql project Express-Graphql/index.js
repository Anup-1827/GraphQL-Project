const express = require('express');
require('dotenv').config();
const {graphqlHTTP} = require('express-graphql');
const graphqlHeader = require('express-graphql-header')
const jwt=  require('jsonwebtoken')
const cors = require('cors')

const schema = require("./schema/schema")
const connectToDB = require("./config/db")

const app = express();
const port = process.env.PORT || 1234;

app.use(cors())

app.use('/graphql', graphqlHeader ,graphqlHTTP((req)=>{

    try{
    const {authorization} = req.headers
    
    return {
        graphiql: process.env.NODE_ENV === "development",
        schema,
        context:{
            secretValue: authorization
        }
    }


    }
    catch(error){
        return error
    }

}
    
 ))

app.listen(port, ()=>{
    connectToDB(); //Connect to DB 
    console.log(`Server is running on port ${port}`);
})