const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {getAllProducts, getProductById, createProduct, updateProduct, deleteProduct} = require("../controllers/productController");

const { protect, isAdmin } = require("../middleware/auth");

router.get("/allproduct", getAllProducts);
router.get("/singleproduct/:id", getProductById);

router.post("/createproduct", protect, isAdmin, upload.array("images", 5), createProduct);
router.put("/updateproduct/:id", protect, isAdmin, upload.array("images", 5), updateProduct);
router.delete("/deleteproduct/:id", protect, isAdmin, deleteProduct);

module.exports = router;
