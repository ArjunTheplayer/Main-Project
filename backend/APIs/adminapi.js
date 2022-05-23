// create mini express app
const exp=require("express");
const  adminapp=exp.Router();
const {adminLogin,createProduct,updateProduct,deleteProduct,viewProducts}=require('../controllers/admincontroller')
const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage}=require("multer-storage-cloudinary");
const multer=require('multer');
require("dotenv").config()

//confidure clodinary
cloudinary.config({
        cloud_name:process.env.CLOUD_NAME,
        api_key:process.env.API_KEY,
        api_secret:process.env.API_SECRET
})

//configure multer-storage-cloudinary
const cloudStorage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
          folder: 'ProductImg',
          //format: async (req, file) => 'png', // supports promises as well
          public_id: (request, file) => file.fieldname+'-'+ Date.now(),
        },
      });

//configure multer
const upload = multer({storage:cloudStorage})

// admin Login
adminapp.post("/login",adminLogin)
// create product
adminapp.post("/create-product",upload.single('profilepic'),createProduct)
//  View Product
adminapp.get("/view-products",viewProducts)
//  update products
adminapp.put("/update-product",updateProduct)
// delete product
adminapp.delete("/delete-product/:productname",deleteProduct)

module.exports=adminapp