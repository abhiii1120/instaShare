const errorMiddleware = (err,req,res,next) => {
    if(err.code === 11000){
        const field = Object.keys(err.keyValue || {})[0];

        return res.status(409).json({
            success:false,
            message:`${field} already exists`,
        });
    }

    const statusCode = err.statusCode || 500;
    const message = statusCode === 500 ? "Internal server error" : err.message;

    return res.status(statusCode).json({
        success:false,
        message:message
    })
}

export default errorMiddleware;