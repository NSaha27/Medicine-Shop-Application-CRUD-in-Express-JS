function errorHandler(err, req, res, next){
  if(res.headersSent){
    next("header already sent to the client!");
  }else{
    if(err.message){
      next(err.message);
    }else{
      next("internal server error!");
    }
  }
}

export default errorHandler;