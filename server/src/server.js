import config from './config.js'
import connectDB from './database/index.js';
import {app} from  './app.js';
// configuring environment variables

const port  = config.port || 3000;

// Connecting to mongoDB
connectDB()
   .then(()=>{
      app.listen(port, ()=>{
         console.log(`Listening on port ${port}`);
      })
   })
   .catch((error)=>{
      console.log(`error connecting to database: ${error}`);
   });


   app.get('/', (req, res)=>{
      res.send("Quizroom");
    })

