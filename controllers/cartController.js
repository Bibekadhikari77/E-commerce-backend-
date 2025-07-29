const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');
const Productmodel = require('../models/Product');

const addToCart = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).populate('cart');

    const Product = await Productmodel.findById(req.params.id);

    if (!Product) {
        return res.status(404).json({ message: "Product not found" });
    }
    
     user.cart.push(Product._id);
    await user.save();

    res.status(201).json({ message: "Product added to cart successfully", user })
  }
);

const getCart = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).populate('cart');
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ cart: user.cart });
});

const removeFromCart = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.user.email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const cart = await User.findOneAndUpdate(
    { email: req.user.email }, 
    { $pull: { cart: req.params.id } },
    { new: true })

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  } 
  res.status(200).json({ message: "Product removed from cart successfully" });
  

});



module.exports = {
  addToCart,
  removeFromCart,
  getCart
};
