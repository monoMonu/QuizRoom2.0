import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import errorHandler from './middlewares/errorHandler.js';
const app = express();

// Middlewares
app.use(express.json()); 
app.use(express.static('public'));
app.use(cookieParser());

app.use(cors({
   credentials: true,
   origin: ['http://127.0.0.1:3000', 'http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:5173', 'https://quizroom.vercel.app'],
   methods: ['GET', 'POST', 'PUT', 'PATCH','DELETE'],
   optionsSuccessStatus: 200,
}));

// Routes
import userRouter from  './routes/user.route.js';
import statsRouter from './routes/stats.route.js';

// User Route
app.use('/api/v1/user', userRouter);

// Statistics Route
app.use('/api/v1/stats', statsRouter);

// Error Handler Middleware
app.use(errorHandler);


export {app};