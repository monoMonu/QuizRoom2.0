class ApiError extends Error {
   constructor(
     statusCode = 500,
     message="Somehing went wrong!!",
     errors = [],
     stack = ""
   ) { 
     super();
     this.statusCode = statusCode;
     this.message = message;
     this.data = null;
     this.errors = errors;
     this.success = false;
 
     if(stack){
       this.stack = stack;
     } else {
       Error.captureStackTrace(this, this.constructor);
     }
   }
 }

export default ApiError;