import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/index.js';
import userRoutes from './routes/user.routes.js';
import categoryRoutes from './routes/category.routes.js';
import productRoutes from './routes/product.routes.js';


dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};
app.use(cors(corsOptions));


// routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/products', productRoutes);



const PORT = process.env.PORT || 7000;


connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO DB connection failed !!! ", err);
})