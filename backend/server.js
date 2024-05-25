const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const imag=require('./models/productModel')
const mongoose = require("mongoose");
const db=require('./config/db')
const productsRouter=require('./routes/productRoutes')
const getAllProuduct=require('./routes/productRoutes')
const getProuductPricehightolow=require('./routes/productRoutes')
const getProuductPricelowtohigh=require('./routes/productRoutes')
const getProuductPopularity=require('./routes/productRoutes')
const getCake=require('./routes/productRoutes');
const toCartRouter=require('./routes/productRoutes')
const _PORT = 5000;
const cors = require("cors")
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000', 
  }));
app.use(express.json());
const path =  require('path');

app.use("/api/toCart",toCartRouter)
app.use("/api/products", productsRouter);
app.use("/api/products/getAllProduct",getAllProuduct);
app.use("/api/products/getCake",getCake);
 app.use("/api/products/getProuductPricehightolow",getProuductPricehightolow);
 app.use("/api/products/getProuductPricelowtohigh",getProuductPricelowtohigh);
app.use("/api/products/getProuductPopularity",getProuductPopularity);

//connect to mongo
db();

app.listen(5000,()=>{
    console.log(`Server started in port ${_PORT}`)
})

