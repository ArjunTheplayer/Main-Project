let jwt=require("jsonwebtoken")
const expressasynchandeler=require("express-async-handler");
require("dotenv").config()

// login admin-------------------------------------------------------------------------------------------

const adminLogin= expressasynchandeler((request,response)=>{
    let adminobj=request.body;
    
    if(adminobj.username!=="admin"){
        response.send("invalid username")
    }
    else if(adminobj.password!=="admin"){
        response.send("invalid paassword")
    }
    else{
        // create token
        // create jwt token and encrypt it with a secret key
        let signedToken=jwt.sign({username:adminobj.username},process.env.SECRET,{expiresIn:200})
        // send encrypted JWT token as sesponse
         response.send({message:"success",token:signedToken,admin:adminLogin})
    }

})
// create product-------------------------------------------------------------------------------------------
const createProduct=expressasynchandeler  ( async(request,response)=>{
    // get productcollection obj
  let productCollectionObject=request.app.get("productCollectionObject")
console.log("create prod", request.body)
  // get prod obj
//  get new user obj and convert it into js object
let prodObj=JSON.parse(request.body.prodObj)
console.log(prodObj)
//  add image cdn link to userobj
prodObj.profilepic=request.file.path
 console.log("prod obj is",prodObj)
let prodobjDb= await productCollectionObject.findOne({productname:prodObj.productname})
//  if product name already existed
if(prodobjDb!==null){
response.send({message:"product name already taken"})

}
else{
let newproduct=await productCollectionObject.insertOne(prodObj)
response.send({message:"productcreated",payload:newproduct})
}

})
// view product-------------------------------------------------------------------------------------------

const viewProducts= expressasynchandeler( async(request,response)=>{
    // get productcollection obj
  let productCollectionObject=request.app.get("productCollectionObject")

 //get product data from usercollection and pack them into an array
 let products = await productCollectionObject.find().toArray() 
    
 //send res
 response.status(200).send({message:"List of Products" ,payload:products})

})
// update product-------------------------------------------------------------------------------------------

const updateProduct=expressasynchandeler( async(request,response)=>{
    // get productcollection obj
  let productCollectionObject=request.app.get("productCollectionObject")
  // get modufied product obj
let modifiedProdObj=request.body;
let product=await productCollectionObject.updateOne({productname:modifiedProdObj.productname},{$set:{...modifiedProdObj}})
response.send({message:"product data",payload: product})

})
// delete product-------------------------------------------------------------------------------------------

const deleteProduct=expressasynchandeler(async(request,response)=>{
    // get productcollection obj
  let productCollectionObject=request.app.get("productCollectionObject")
    // get user id from url param id
  
    let productId =request.params.productname;
    let result=await productCollectionObject.deleteOne({productname:productId})
    if(result.deletedCount==1){
      response.send({message:"product deleted successfuly"})
     }
     else{
      response.send({message:"product not Deleted"})
     }

})

module.exports={adminLogin,createProduct,updateProduct,deleteProduct,viewProducts}