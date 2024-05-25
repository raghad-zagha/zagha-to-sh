// Put Your Code Here
const mongoose = require("mongoose");
const Product = require('../models/productModel')
const multer  = require('multer')
// const User = require('../models/userModel')

const createNewProduct= async (req, res) => {
    const { name, price, description,quantity,category ,productType} = req.body;
    const imageName = req.file.filename;
      try {
        const newProduct = await Product.create({
          name,
          price,
          description,
          image: imageName,
          quantity,
          category,
          productType:"normal product",
        });
    
        res.status(200).json({ message: 'Product created successfully!', product: newProduct });
      } catch (error) {
        console.error('Error creating product:', error.message);
        res.status(500).json({ message: 'Error creating product' });
      }
  }
  const getProuduct=async (req,res)=>{
    const product = await  Product.find();
      res.json(product)
  }
  const editProduct=async (req, res) => {
    const { id } = req.params;
    const { field, value } = req.body; 
  
    if (!field || !['price', 'quantity'].includes(field)) {
      return res.status(400).send('Invalid update field');
    }
  
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, {
        [field]: value, 
      }, { new: true }); 
  
      if (!updatedProduct) {
        return res.status(404).send('Product not found');
      }
  
      res.send(updatedProduct); 
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }
//masa
async function getCake(req, res) {
  // Extract the cakeId from the request parameters
  const id = req.params.cakeId;

  try {
    // Find the cake by its id in the database
    const cake = await Product.findById(id);

    // If the cake is not found, return a 404 response
    if (!cake) {
      return res.status(404).send("Cake not found");
    }

    // If the cake is found, return it as a JSON response
    return res.json(cake);
  } catch (error) {
    // If there's an error while retrieving the cake, log the error and return a 500 response
    console.error('Error while reading cake of id', id, error);
    return res.status(500).send("Error: " + error.message);
  }
}
  //raghad
  const getAllProuduct=async (req,res)=>{
    try{
      const getAllProuduct = await  Product.find();
      res.json(getAllProuduct)

    } catch (error) {
      res.status(500).send(error.message);
  }
}
  const getProuductPricehightolow =async (req,res)=>{
    try{
      const getProuductPricehightolow = await  Product.find().sort( {price : -1});
      res.json(getProuductPricehightolow)

    } catch (error) {
      res.status(500).send('Internal server error');
  }
  }
  const getProuductPricelowtohigh =async (req,res)=>{
    try{
      const getProuductPricelowtohigh = await  Product.find().sort( {price : 1});
      res.json(getProuductPricelowtohigh)

    } catch (error) {
      res.status(500).send('Internal server error');
  }
  }
  const getProuductPopularity = async (req,res) => {
    try{
        const getProuductPopularity = await Product.find().sort({avgRating: -1}); 
    
        res.status(200).json(getProuductPopularity);
    }
    catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }
  //raghad and masa 
  //cart
  // const addToCart= async (req,res)=>{
  //   const {proId,quan}=req.body;
  //   try {
  //     let toCart = await User.findOne();
  //     if (!toCart){
  //       toCart= new User({cart :[]})
  //     }
  //     const indexPro=toCart.cart.findIndex(item => item.product.toString()===proId)
  //     if (indexPro >-1){
       
  //      toCart.cart[indexPro].quantity+=quan;

  //     }
  //     else {
  //       toCart.cart.push({product :proId ,quan})

  //     }
  //     await toCart.save();
  //     res.status(201).json(toCart);

  //   }catch(error){
  //     console.error('error adding',error.message)
  //     res.status(500).jason({error:'error adding'})
  //   }
  // }
  //second
  // const UserCart = asyncHandler(async(req,res)=>{
  //   const {User}=req.body;
  //   const {_id}=req.User;
  //   validateMongoDbId(_id);
  //   try{
  //     const user =await User.findById(_id);
  //     const alreadyExistCart =await User.findOne({orderby :user._id})
  //     if(alreadyExistCart){
  //       alreadyExistCart.remove();
  //     }
      
  //   }catch(error){
  //     console.log("error",error)
  //   }
  // })
  module.exports = { createNewProduct,getProuduct,editProduct, getCake,getAllProuduct,getProuductPricehightolow,getProuductPricelowtohigh,getProuductPopularity,}