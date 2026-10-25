import { StatusCodes } from "http-status-codes";
import AppError from "./app.error.js";

/**
 * @StatusCode 401
 * @description Unauthorized Access.
 */
export default class Unauthorized extends AppError{
    constructor(message,details){
        super(message,StatusCodes.UNAUTHORIZED,details);
    }
}