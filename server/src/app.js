import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import errorHandler from './middlewares/errorHandler.js';
import config from './config.js';
const app = express();

// Middlewares
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

app.use(cors({
   credentials: true,
   origin: [config.client],
   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
   optionsSuccessStatus: 200,
}));

// Routes
import userRouter from './routes/user.route.js';
import statsRouter from './routes/stats.route.js';

// User Route
app.use('/api/v1/user', userRouter);

// Statistics Route
app.use('/api/v1/stats', statsRouter);

// Error Handler Middleware
app.use(errorHandler);


export { app };