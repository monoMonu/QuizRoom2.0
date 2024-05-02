import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import errorHandler from './middlewares/errorHandler.js';
const app = express();

// Middlewares
app.use(express.json());
app.use(express.static('public'));
app.use(express.json( { limit: "16kb" })); 
app.use(cookieParser());
app.use(cors({
   origin: ['https://monomonu.github.io', 'http://localhost:3000',  'http://127.0.0.1:3000'],
   methods: ['GET', 'POST', 'PUT', 'PATCH','DELETE'],
   optionsSuccessStatus: 200
}));

// Routes
import userRouter from  './routes/user.route.js';
import statsRouter from './routes/stats.route.js'

app.get("/monu", (req, res) =>{
   res.json({
      "name":"Monu"
   })
})

// User Route
app.use('/api/v1/user', userRouter);

// Statistics Route
app.use('/api/v1/stats', statsRouter);

// Error Handler Middleware
app.use(errorHandler);


export {app};