import config from './config.js'
import connectDB from './database/index.js';
import app from './app.js';
// configuring environment variables

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

