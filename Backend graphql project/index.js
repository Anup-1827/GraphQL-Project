const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 1234;

app.listen(port, ()=>{
    console.log(process.env);
    console.log(`Server is running on port ${port}`);
})