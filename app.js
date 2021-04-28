const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config'); 
//const authJwt = require('./helper/jwt');
//const errorHandler = require('./helper/error-handler')

// const Api = require('amazon-pa-api50')
// const Config = require('amazon-pa-api50/lib/config')
// // Optional for different resources
// const resources = require('amazon-pa-api50/lib/options').Resources
// // for product condition
// const condition = require('amazon-pa-api50/lib/options').Condition
// // Optional for different country
// const country = require('amazon-pa-api50/lib/options').Country
// // for Search Index
// const searchIndex = require('amazon-pa-api50/lib/options').SearchIndex

// let myConfig = new Config();

app.use(cors());
app.options("*", cors());

// Middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
//app.use(authJwt());
//app.use(errorHandler);



const got = require('got');
const {Product} = require('./models/product');
 
// const apifake = () => {
//   return new Promise((resolve, reject) => {
//     got('https://fakestoreapi.com/products', { json: true }).then(response => {
//       resolve(response.body);
//     }).catch(error => {
//       reject(error.response.body) ;
//     })
//   })
// }

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function democompare() {
 

//   // Sleep in loop
//   for (;;) {
 
//       await sleep(1000);
//       //mongo db product
//       const productList = await Product.find( ).select('name price description category  image -_id').populate('category');
//       // fake store data
//       const fakedata = await apifake()
//       .then(data => {return data ;})
//       .catch(err => console.error(err))

//       // compare logic for a notification for certain condition (may be just hard code condition for proof of concept)
//       // need to do some research about how to send a notification to frontend actively
//       // maybe just fronted periodically http get certain new mongo schema which indicates notification?
//       console.log(fakedata);
//       console.log(productList);
//   }
// }

//democompare();

 

//Routes
const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
//const usersRoutes = require("./routes/users");
//const ordersRoutes = require("./routes/orders");

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
//app.use(`${api}/users`, usersRoutes);
//app.use(`${api}/orders`, ordersRoutes);

 

mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop-database'
})
.then(()=>{
    console.log('database connection success')
})
.catch((err)=>{
    console.log(err);
});

let port = process.env.PORT || 3000;
 
app.listen(port,()=>{
 
  console.log("server running);
});
