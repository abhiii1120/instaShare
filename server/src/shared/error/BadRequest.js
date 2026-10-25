import {StatusCodes} from 'http-status-codes';
import AppError from './app.error.js';

/**
 * @StatusCode 400
 * @description Bad Request - The server cannot process the request due to invalid input.
 */
export default class BadRequest extends AppError{
    constructor(message,details){
        super(message,StatusCodes.BAD_REQUEST,details);
    }
}