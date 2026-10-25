import { StatusCodes } from "http-status-codes";

const errorMiddleware = (err,req,res,next) => {
    console.error(err)
    if(err.code === 11000){
        const field = Object.keys(err.keyValue || {})[0];

        return res.status(409).json({
            success:false,
            message:`${field} already exists`,
        });
    }

    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = statusCode === 500 ? "Internal server error" : err.message;

    return res.status(statusCode).json({
        success:false,
        message:message
    })
}

export default errorMiddleware;