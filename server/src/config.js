import dotenv from 'dotenv'
dotenv.config({path: '.env'});

const config = {
   // Cloudinary configuartion 
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,

   // MongoDB configuration
   port: process.env.PORT,
   mongodb_uri: process.env.MONGODB_URI,
   node_env: process.env.NODE_ENV,
   client: process.env.CLIENT,

   // token details
   access_token_secret: process.env.ACCESS_TOKEN_SECRET,
   refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
   access_token_expiry: process.env.ACCESS_TOKEN_EXPIRY,
   refresh_token_expiry: process.env.REFRESH_TOKEN_EXPIRY,
}

export default config;