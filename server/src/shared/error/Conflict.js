import { StatusCodes } from "http-status-codes";
import AppError from "./app.error.js";

/**
 * @StatusCode 409
 * @description Conflict
 */
export default class Conflict extends AppError {
  constructor(message, details) {
    super(message, StatusCodes.CONFLICT, details);
  }
}
