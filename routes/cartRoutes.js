const express = require('express');
const router = express.Router();
const {addToCart, getCart,removeFromCart,} = require('../controllers/cartController');
const {isLoggedIn} = require('../middleware/isLoggedIn');

// Add product to cart
router.get('/addcart/:id', isLoggedIn, addToCart);

router.get('/getallcart/:id', isLoggedIn, getCart);
// Remove product from cart
router.delete('/removecart/:id', isLoggedIn, removeFromCart);

module.exports = router;
