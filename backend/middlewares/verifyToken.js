const jwt=require("jsonwebtoken")
const verifyToken=(request,response,next)=>{
console.log(request.headers)
require("dotenv").config()
// token verification logic
let bearertoken=request.headers.authorization;

// if the request header do not have bearer token
if(bearertoken==undefined){
  response.send({message:"You are Not authorized to access this"})
}
// if the bearertoken is existed 
else{
// get token from bearertoken
let token=bearertoken.split(" ")[1]
// verify token
jwt.verify(token,process.env.SECRET,(err,decodedToken)=>{
  // if token is expired
  if(err){
    response.send({message:'session expired...relogin to continue'})
  }
  // if token is not expired
  else{
    next()
  }
})
// console.log(token)
// verify token
}
}
module.exports= verifyToken