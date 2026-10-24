import {statusCodes} from 'http-status-codes';
import AppError from './app.error.js';

export default class BadRequest extends AppError{
    constructor(message,details){
        super(message,statusCodes.BAD_REQUEST,details);
    }
}