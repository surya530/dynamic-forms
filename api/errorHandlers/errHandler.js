
let errorHandler = (err,req,res,next)=>{
    let statusCode = res.statusCode ? res.statusCode : 500;

    res.status(statusCode).json({
        stack : null,
        message : err.message,
        timestamp : new Date()
    })

}

module.exports = errorHandler;
