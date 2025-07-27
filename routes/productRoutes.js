const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const {getAllProducts, getProductById, createProduct, updateProduct, deleteProduct,} = require('../controllers/productController');
const upload = require('../middleware/multer'); // Cloudinary multer config
const { isLoggedIn } = require('../middleware/isLoggedIn');
const { isAdmin } = require('../middleware/isAdmin');



// Public routes
router.get('/allproduct',isLoggedIn, getAllProducts);

router.get('/singleproduct/:id', isLoggedIn,  getProductById);

// Protected routes (admin only)
router.post('/createproduct', isLoggedIn, upload.array('images', 5), createProduct);

router.put("/updateproduct/:id", isLoggedIn,upload.array("images", 5),updateProduct);

router.delete('/deleteproduct/:id', isLoggedIn , deleteProduct);

module.exports = router;
