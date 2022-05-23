// create mini express app
const exp=require("express");
const userapp =exp.Router();
// import statement for controller
const {getusers,getuserbyid,createuser,updateuser,deleteuser,loginuser, getProtectedInfo}= require("../controllers/usercontroller")

const verifyToken=require("../middlewares/verifyToken")

const cloudinary=require("cloudinary").v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer= require("multer")

require("dotenv").config()

// configure cloudinary
cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.API_KEY,
  api_secret:process.env.API_SECRET,
})
// configure multer-storage-cloudinary
const cloudstorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'my image folder',
    // format: async (req, file) => 'png', // supports promises as well
    public_id: (req, file) => file.fieldname + '-' + Date.now(),
  },
});
// configure multer
const upload=multer({storage:cloudstorage})
// // create sample middle ware
// const middleware1=(req,res,next)=>{
//   console.log("middleware-1 exceuted")
//   // res.send({message:"this is middleware 1"})
//   next()
// }
// // create sample middle ware
// const middleware2=(req,res,next)=>{
//   console.log("middleware-2 exceuted")
//   next()
// }
// //  to make them exceute everytime for req

//  userapp.use(middleware1)





// sample user data
//  let users=[]


// create user api
// get users
userapp.get('/get-users',getusers)

// get user by id
userapp.get('/get-user/:username',getuserbyid)

// create user
userapp.post('/create-user',upload.single('profilepic'), createuser)

// login user
userapp.post('/login-user',loginuser)

// update user
userapp.put("/update-user",updateuser)

// delete user by username 
// userapp.delete("/remove-user/:id",(request,response)=>{
  userapp.delete("/remove-user/:username",deleteuser)


  // protected routes
  userapp.get("/get-protected-data",verifyToken, getProtectedInfo)
// export
module.exports=userapp
