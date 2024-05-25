const express = require("express");
const router = express.Router();
const app = express();
const path = require('path');
const multer  = require('multer')
//const f=require('../../frontend/src/proimage')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '../../frontend/src/proimage') );
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + file.originalname);
    },
  });
  const upload = multer({ storage: storage })


const {createNewProduct,getProuduct,editProduct,getCake,getAllProuduct,getProuductPricehightolow,getProuductPricelowtohigh,getProuductPopularity}=require('../controllers/productController')
router.post("/addProduct", upload.single("image"), async (req, res) => {
    createNewProduct(req, res);
  });
  router.patch("/Product/:id", async (req, res) => {
    editProduct(req, res);
  });
  router.get("/getProduct", async (req, res) => {
    getProuduct(req, res);
  });
  router.get("/getCake/:cakeId", async(req,res)=>{
    getCake(req,res);
  });
  
  router.get("/getAllProuduct", async(req, res)=> {
    getAllProuduct(req,res)
  });
  router.get("/getProuductPricehightolow", async(req, res)=> {
    getProuductPricehightolow(req,res);
  });
  router.get("/getProuductPricelowtohigh", async(req, res)=> {
    getProuductPricelowtohigh(req,res);
  });
  router.get("/getProuductPopularity", async(req, res)=> {
    getProuductPopularity(req,res);
  });
  router.patch("/getAllProuduct" , async(req, res)=> {
    getAllProuduct(req,res);
  });
  //raghad and masa (add to product)
  // router.post('/toCart',async(req, res)=> {
  //   toCart(req,res);
  // });
  const userController = require('../controllers/userController');
router.post('/toCart', userController.addToCart);

module.exports = router;

  module.exports = router;