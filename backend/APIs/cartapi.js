// create mini express app
const exp=require("express");
const cartapp =exp.Router();

const {createcart,viewCart}=require("../controllers/cartcontroller")

// create cart
cartapp.post("/create-cart",createcart)

// view cart
 cartapp.get("/view-cart/:username",viewCart)









module.exports=cartapp