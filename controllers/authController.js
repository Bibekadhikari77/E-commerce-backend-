const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");


 const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
    
    }

    if (role == 'admin' && role.length>1){
      return res.status(400).json({ message: 'cannot be multiple' });
    }

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
        if (err) {
            return res.status(500).json({ message: 'Error hashing password' });
        }
        const user = await User.create({ name, email, password: hash, role: role || 'user' });
        res.status(201).json({message: 'User registered successfully', user})
    });
});
}
);


const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if(!user) {
    return res.status(401).json({ message: 'Email and Password is incorrect' });
  }

  const result = await bcrypt.compare(password, user.password)
    
    if (result) {
      
      const token = generateToken(user._id,email,user.role);
      res.cookie("token",token)
      return res.status(200).json({ message: 'Login successful',
        user
      });
    }
    else {  
      return res.status(401).json({ message: 'Email and Password is incorrect' });
    }
  
});


module.exports = {
  registerUser,
    loginUser
};
