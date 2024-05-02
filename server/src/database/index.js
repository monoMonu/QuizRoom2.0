import mongoose from 'mongoose'

// Environment Variables
import config from '../config.js'


const connectDB = async () =>{
   try {
      const db = await mongoose.connect(`${config.mongodb_uri}/quizRoom`);
      console.log("Succesfully connected to mongoDB");

   } catch (error) {
      console.log('Error connecting to MongoDB:', error.message);
      process.exit(1);
   }

}

export default connectDB;