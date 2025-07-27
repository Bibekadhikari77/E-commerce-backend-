const Product = require('../models/Product');
const asyncHandler = require('../middleware/asyncHandler');
const multer = require('../middleware/multer');
const User = require('../models/User');

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  const user = await User.findOne({ email: req.user.email }).populate('cart');
  res.json({products,user});
});


const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});


const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, stock } = req.body;

  if (!name || !description || !price || !category || !stock) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "At least one image is required" });
  }

  // Convert all uploaded files to array of URLs (already uploaded by multer-storage-cloudinary)
  const imageUrls = req.files.map(file => file.path);

  const product = await Product.create({
    name,
    description,
    price,
    category,
    stock,
    images: imageUrls,   // save array of image URLs here
  });

  res.status(201).json({ message: "Product created successfully", product });
});



const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, price, stock } = req.body;

  const updateFields = {
    name,
    description,
    price,
    stock,
  };

  if (req.files && req.files.length > 0) {
    const imageUrls = req.files.map(file => file.path); 
    updateFields.images = imageUrls;
  }

  const product = await Product.findByIdAndUpdate(req.params.id, updateFields, {
    new: true,
  });

  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  res.status(200).json({ message: "Product updated", product });
});


const deleteProduct = asyncHandler(async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
    res.json(
        { 
            message: "Product deleted successfully" 
        });
});

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };