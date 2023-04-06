const jwt = require('jsonwebtoken');

function VerifyToken(token){

    try{
        const {userId} = jwt.verify(token, process.env.TOKEN)
            return userId
    }
    catch(error){
        return "Invalid Token"
    }

} 

module.exports = VerifyToken