const expressasynchandeler=require("express-async-handler"); 
const { async } = require("rxjs");


const createcart=expressasynchandeler(async(request,response)=>{
  let cartCollectionObject= request.app.get("cartCollectionObject")
  let cartObj=request.body 
  console.log("first cartobj",cartObj)
  console.log ("cp",cartObj.products)
   //  check for availablity of username
  let cartofDb=await cartCollectionObject.findOne({username:cartObj.username})
  console.log("hiii",cartofDb)

  // if useralready existed
if(cartofDb!==null){
  let product= cartObj.products[0]
  // console.log("p new",product)
  let result= await cartCollectionObject.updateOne({username:cartObj.username},{$push:{products:product}})
  console.log("main result is",result)
  response.send({message:"product added to cart inside an array"})
}

else{
  let carttemplate=await cartCollectionObject.insertOne(cartObj)
  response.send({message:"cart template has been created since there is no cart for this user"})
  
}
})
const viewCart =expressasynchandeler(async(request,response)=>{
  let cartCollectionObject= request.app.get("cartCollectionObject")
  console.log("params are",request.params) //{id:100}
  let usernameOfUrl =   request.params.username;
  // console.log("user",usernameOfUrl)
  //get user by id from usercollection



  let cart = await cartCollectionObject.findOne({username:usernameOfUrl})
  //send res
  response.status(200).send({message:"List of products" ,payload:cart})



})



module.exports={createcart,viewCart};