// create express app

const exp = require("express");
const app = exp();
const path=require("path")

require("dotenv").config()

// /conneting with angular app
app.use(exp.static(path.join(__dirname,'./dist/express')))

// connecting to MONGO SERVER
// import mongo client
const mongoClient=require("mongodb").MongoClient;
const dburl=process.env.DBURL;

// connect to DB
mongoClient.connect(dburl)
.then((client)=>{
  // get database object
  let databaseObject=client.db("mydatabase");
  // get collectionobject
  let userCollectionObject=databaseObject.collection("usercollection")
  let productCollectionObject=databaseObject.collection("productcollection")
  let cartCollectionObject=databaseObject.collection("cartcollection")

  // share collection object to APIs
  app.set("userCollectionObject",userCollectionObject)
  app.set("productCollectionObject",productCollectionObject)
  app.set("cartCollectionObject",cartCollectionObject)

  console.log("connected to DataBase successully")
})
.catch(err=>console.log("err in connecting to database",err))




// import api
const userApp=require("../Express/backend/APIs/userAPI")
// const productApp=require("./backend/APIs/productAPI")
const adminapp=require("./backend/APIs/adminapi")
// import cart api
const cartapp=require("./backend/APIs/cartapi")
// add body parser middleware
app.use(exp.json())


// if path is user, exceute userapi
app.use('/user',userApp)
// if the path is product, exceute productapi
// app.use('/product',productApp)
// if path is admin use admin api
app.use('/admin',adminapp)

app.use('/cart',cartapp)

app.use('/*', (request,response)=>{
  response.sendFile(path.join(__dirname, './dist/express/index.html'), err=>{
    if(err){
      next(err)
    }
  })
})


  

// handeling invalid paths
app.use((request,response,next)=>{
  response.status(404). send({message:`${request.url} does not exist`})
})

// handling errors
app.use((err,request,response,next)=>{
  response.status(500). send({message:err.message})
})




// assign port number
const PORT= process.env.PORT || 5000 
app.listen(PORT,()=>console.log(`Http server is running ...on ${PORT}`))