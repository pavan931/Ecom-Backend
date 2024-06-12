import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import authRouter from './src/routers/authRouter';
import contactRouter from './src/routers/contactRouter';
import categoryRouter from './src/routers/categoryRouter';
import cartRouter from './src/routers/cartRouter'
import { addCartItem } from './src/controllers/cartController';
dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

// Serve static files from the "public" directory
app.use('/static', express.static(path.join(__dirname, 'public')));

import db from './src/db';

db.raw('select 1+1 as result')
  .then(() => {
    console.log('Database connected');
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });



  

// Routes
app.use('/api/auth', authRouter);
app.use('/api/contact', contactRouter);
app.use('/api', categoryRouter); // Use the category router
app.use('/api/cart',cartRouter)
app.use('/api/users/:userId/cart/add', addCartItem)
// app.use('/api/users',cartRouter)
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
