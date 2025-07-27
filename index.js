const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/error');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

dotenv.config();
connectDB();

const app = express();
//app.use(cors({
  //origin: 'http://localhost:5173',
  //credentials: true,
//}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser())

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));