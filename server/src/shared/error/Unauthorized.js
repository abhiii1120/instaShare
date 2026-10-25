import { StatusCodes } from "http-status-codes";
import AppError from "./app.error.js";

//status code = 401
export default class Unauthorized extends AppError{
    constructor(message,details){
        super(message,StatusCodes.UNAUTHORIZED,details);
    }
}