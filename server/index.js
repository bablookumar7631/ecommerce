import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from "helmet";
import connectDB from './db/index.js';
import userRoutes from './routes/user.routes.js';
import categoryRoutes from './routes/category.routes.js';
import productRoutes from './routes/product.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import contactUserRoutes from './routes/contactUser.routes.js';


dotenv.config();

const app = express();

// Helmet setup with CSP to allow necessary scripts
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                "default-src": ["'self'"],
                "script-src": [
                    "'self'", // Allow scripts from the same origin
                    "https://m.stripe.network", // Allow scripts from Stripe
                    // If you need to allow inline scripts, add the correct hash
                    "'sha256-5+YTmTcBwCYdJ8Jetbr6kyjGp0Ry/H7ptpoun6CrSwQ='", // Example hash for inline script
                    // OR use 'unsafe-inline' (not recommended)
                ],
                "object-src": ["'none'"], // Disallow object elements
                "upgrade-insecure-requests": [], // Ensures all HTTP requests are upgraded to HTTPS
            },
            reportOnly: true, // To ensure it only reports the violations without blocking resources in production
        },
    }),
);

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

const corsOptions = {
    origin: 'https://ecommerce-frontend-dmo2.onrender.com',
    // origin: 'http://localhost:5173',
    credentials: true,
};
app.use(cors(corsOptions));


// routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/contactUser', contactUserRoutes);



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