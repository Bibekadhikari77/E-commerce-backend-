const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: String,
  email: { 
    type: String, 
    unique: true 
  },
  password: String,
  cart: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product' 
    },
  ],
  role: { type: String, 
    enum: ['user', 'admin'],  
    default: 'user' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);