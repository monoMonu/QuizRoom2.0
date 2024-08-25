import express from 'express'
import serverless from 'serverless-http';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import errorHandler from './middlewares/errorHandler.js';
import config from './config.js';
import connectDB from './database/index.js';

const app = express();
const port = config.port || 3000;

// Connecting to mongoDB
connectDB()
   .then(() => {
      if (config.node_env !== 'production') {
         // Only run the server locally
         app.listen(port, () => {
            console.log(`Listening on port ${port}`);
         });

         app.get('/', (req, res) => {
            res.send('Quizroom');
         });
      } else {
         console.log('Connected to database');
      }
   })

   .catch((error) => {
      console.log(`Error connecting to database: ${error}`);
   });



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

export const handler = serverless(app);
export default app;