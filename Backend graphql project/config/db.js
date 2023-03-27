const mongoose = require('mongoose');

const connectToDB = async ()=>{
    try{
        const conn =  await mongoose.connect(process.env.MONGODB_URI )
        console.log("Connected to DB ", conn.connection.host);   
    }
    catch(err){
        console.log(err);
    }
}


module.exports = connectToDB;