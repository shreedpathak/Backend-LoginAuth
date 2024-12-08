import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const validateToken = asyncHandler( (req,res,next)=>{
    let token;
    console.log("ValidateToken1");
    let authHeader = req.headers.authorization || req.headers.Autherization;
    console.log("ValidateToken2", authHeader);
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) =>{
            if(err){
                res.status(401);
                throw new Error("User not authorised, please login first");
            }
            console.log("decoded", decoded);
            next();
        });
    }
    if(!token){
        res.status(401);
        throw new Error ("User token is expired")
    }
});

export default validateToken;