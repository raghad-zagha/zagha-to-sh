// Put Your Code Here
const User = require('../models/userModel')
const mongoose = require("mongoose");

exports.addToCart = async (req, res) => {
  try {
    const { proId, quan } = req.body;
    // const userId = req.user._id; 
    const userId ="664f470fe5659ab8f5aeab83"
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const existingCartItemIndex = user.cart.findIndex(item => item.product.toString() === proId);
    if (existingCartItemIndex !== -1) {
    
      user.cart[existingCartItemIndex].quantity += quan;
    } else {
     
      user.cart.push({ product: proId, quantity: quan });
    }

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};