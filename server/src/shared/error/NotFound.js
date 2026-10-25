import { StatusCodes } from "http-status-codes";
import AppError from "./app.error.js";

/**
 * @StatusCode 404
 * @description Not Found.
 */
export default class Notfound extends AppError {
    constructor(message,details){
        super(message,StatusCodes.NOT_FOUND,details)
    }
}