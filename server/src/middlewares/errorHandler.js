
export default function errorHandler(error, req, res, next){
   return res.status(error.statusCode).json(error)
}