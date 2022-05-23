// error handeling
const expressasynchandeler=require("express-async-handler");

// get products
let getproducts=async(request,response)=>{
  // get productcollection obj
  let productCollectionObject=request.app.get("productCollectionObject")
  let product=await productCollectionObject.find().toArray()
  response.send({message:"product data is",payload:product})
  // response.send({message:products})
}


// get products by productname --------------------------------------------------------------------------------------
let getproductsbyproductname=expressasynchandeler( async(request,response)=>{

  // get productcollection obj
  let productCollectionObject=request.app.get("productCollectionObject")

// get user id from url param id
console.log(request.params) //{id:400}
let productnameofurl =request.params.productname;
let product=await productCollectionObject.findOne({productname:productnameofurl})
response.send({message:"product is",payload:product})
// find user by id
// try{
//   let prodobj=products.find(prodobj=> prodobj.id == prodId)
//   // if user not Existed
//   if(prodobj ==undefined){
//     response.send({message:"product not found"})
//   }
//   // if user existed
//   else{
//     response.send({message: prodobj})
//   }
// }
// catch(err){
//   response.send({message:err.message})
// }
})
// create product-------------------------------------------------------------------------------------
let createproduct=expressasynchandeler( async (request,response)=>{

  // get productcollection obj
  let productCollectionObject=request.app.get("productCollectionObject")

// get user obj
let prodobj=request.body;
console.log("prod obj is",prodobj)
let prodobjDb= await productCollectionObject.findOne({productname:prodobj.productname})
//  if product name already existed
if(prodobjDb!==null){
response.send({message:"product name alreade taken"})

}
else{
let newproduct=await productCollectionObject.insertOne(prodobj)
response.send({message:"productcreated ",payload:newproduct})
}

// push userobj into users
// products.push(prodobj)
// response.send({message:"Product created sucessfully"})
})
// update products products ------------------------------------------------------------------------

let updateproduct=expressasynchandeler( async(request,response)=>{
  // get productcollection obj
  let productCollectionObject=request.app.get("productCollectionObject")

// get modufied product obj
let modifiedProdObj=request.body;
let product=await productCollectionObject.updateOne({productname:modifiedProdObj.productname},{$set:{...modifiedProdObj}})
response.send({message:"product data",payload: product})

// try{
// // replace old prod with modified prod obj
// let indexOfProducts=products.findIndex(prodobj=>prodobj.id==modifiedProdObj.id)
// // if prod not existed
// if(indexOfProducts==-1){
//   response.send({message:"Product not existed to update"})
// }
// // if user user existed
// else{
//   products.splice(indexOfProducts,1,modifiedProdObj);
//   response.send({message:"product modified sucessfully"})
// }}
// catch(err){
//   response.send({message:err.message})
// }
})
// delete product -------------------------------------------------------------------------------------------------
let deleteproduct=expressasynchandeler( async(request,response)=>{

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

// products.splice({productId},1)
//     response.send({message: 'deleted sucessfully'})
 })

//  export
module.exports={getproducts,getproductsbyproductname,createproduct,updateproduct,deleteproduct}