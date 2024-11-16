import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import connectToDB from './utils/db.js'

const app = express();

// Connect to DB
connectToDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true
}));
app.use(morgan('dev'));

// Routes Imports
import cartRoutes from './routes/cart.routes.js';

// Routes
app.use('/api/v1/cart', cartRoutes);

// Welcome Route
app.get('/', (_, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to Ecommerce Cart API'
    })
})

// Server
app.listen(process.env.PORT || 3004, () => {
    console.log(`⚙️  Server is listening on port ${process.env.PORT || 3004}`)
})