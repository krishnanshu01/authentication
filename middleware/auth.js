const jwt = require('jsonwebtoken');

const config = require('config');

const users = require('../models/User')

const Auth = (req , res , next) =>{
    //get token header
    const token = req.header('x-auth-token');

    //check if the token exist or not
    if(!token){
        return res.status(401).json({msg : 'No token , Authraziation denied'})
    };

    //to verify
    try{
        const decode = jwt.verify(token , config.get('secrettoken'));
        req.user = decode.user;
        next();
    }catch(err){
            res.status(401).json({msg : 'Not verified'})
    }

}

let checkAdmin = async(req , res , next) =>{
    let user = await users.findById(req.user.id).select('-password');
    console.log(user);
    if(user.admin == true){

        next()
    }else{
        res.status(401).json({
            msg : 'you do not have permission for this'
        })
    }
}

module.exports = {
    Auth,
    checkAdmin
}