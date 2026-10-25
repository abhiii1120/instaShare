import { StatusCodes } from "http-status-codes";
import AppError from "./app.error.js";

//status code = 404
export default class Notfound extends AppError {
    constructor(message,details){
        super(message,StatusCodes.NOT_FOUND,details)
    }
}