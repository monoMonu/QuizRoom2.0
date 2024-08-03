export default function errorHandler(error, req, res, next) {
   // console.error(error);

   const statusCode = error.statusCode || 500;
   const message = error.message || 'Internal Server Error';
   const stack = process.env.NODE_ENV === 'production' ? null : error.stack;

   return res
      .status(statusCode)
      .json({
         success: false,
         statusCode,
         message,
         stack,
      });
}
