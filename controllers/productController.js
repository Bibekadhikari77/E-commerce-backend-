const Product = require('../models/Product');
const asyncHandler = require('../middleware/asyncHandler');
const multer = require('../middleware/multer');

// Get all products
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json({ products });
});

// Get product by ID
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
});

// Create product
const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description, discount, category } = req.body;

  if (!name || !price || !description || !category) {
    return res.status(400).json({ message: "Name, price, description, and category are required" });
  }

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "At least one image is required" });
  }

  const imageUrls = req.files.map(file => file.path);

  const product = await Product.create({
    name,
    price,
    description,
    discount: discount || 0,
    images: imageUrls,
    category,
  });

  res.status(201).json({
    message: "Product created successfully",
    product
  });
});

// Update product
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, discount, category } = req.body;

  const updateFields = {
    name,
    price,
    description,
    discount,
    category,
  };

  if (req.files && req.files.length > 0) {
    const imageUrls = req.files.map(file => file.path);
    updateFields.images = imageUrls;
  }

  const product = await Product.findByIdAndUpdate(req.params.id, updateFields, {
    new: true,
  });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json({ message: "Product updated successfully", product });
});

// Delete product
const deleteProduct = asyncHandler(async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted successfully" });
});

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
