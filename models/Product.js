const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    images: [String],
    discount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
