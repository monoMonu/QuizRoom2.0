
export default function asyncHandler(request){
   return async (req, res, next) => {
      try{
         await (request(req, res, next));
      }
      catch(error){ 
         next(error);
      }
   } 
}