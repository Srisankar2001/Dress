const jwt = require("jsonwebtoken");
const UserRoles = require("../Enums/UserRoles");
const SECRET_KEY = process.env.SECRET_KEY;


const verify = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(400).json({ status: false, message: "Token is missing" })
    }
    
    jwt.verify(token,SECRET_KEY,(err,decode)=>{
        if(err){
            return res.status(400).json({ status: false, message: "Error in token" })
        }else{
           next()
        }
    })
}

const verifyAdmin = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(400).json({ status: false, message: "Token is missing" })
    }
    
    jwt.verify(token,SECRET_KEY,(err,decode)=>{
        if(err){
            return res.status(400).json({ status: false, message: "Error in token" })
        }else{
            if(decode.role === UserRoles.ADMIN){
                req.user_id = decode.id
                next()
            }else{
                return res.status(401).json({ status: false, message: " Unauthorized Request" });
            }
        }
    })
}

const verifyUser = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(400).json({ status: false, message: "Token is missing" })
    }
    
    jwt.verify(token,SECRET_KEY,(err,decode)=>{
        if(err){
            return res.status(400).json({ status: false, message: "Error in token" })
        }else{
            if(decode.role === UserRoles.USER){
                req.user_id = decode.id
                next()
            }else{
                return res.status(401).json({ status: false, message: " Unauthorized Request" });
            }
        }
    })
}

const verifyEmployee = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(400).json({ status: false, message: "Token is missing" })
    }
    
    jwt.verify(token,SECRET_KEY,(err,decode)=>{
        if(err){
            return res.status(400).json({ status: false, message: "Error in token" })
        }else{
            if(decode.role === UserRoles.EMPLOYEE){
                req.user_id = decode.id
                next()
            }else{
                return res.status(401).json({ status: false, message: " Unauthorized Request" });
            }
        }
    })
}

module.exports = {verify,verifyAdmin,verifyEmployee,verifyUser}