import { StatusCodes } from "http-status-codes"

export default function BuildSuccessResponse (res,message,data) {
    return res.status(StatusCodes.OK).json({
        success:true,
        message:message ?? "success",
        data:data ?? {},
    })
}