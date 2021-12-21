module.exports=(message, statusCode,details)=>{
    const err= new Error();
    err.message=message;
    err.statusCode=statusCode;
    err.details=details;
    return err;
}