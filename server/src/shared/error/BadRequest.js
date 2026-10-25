import {StatusCodes} from 'http-status-codes';
import AppError from './app.error.js';

//status code = 400
export default class BadRequest extends AppError{
    constructor(message,details){
        super(message,StatusCodes.BAD_REQUEST,details);
    }
}