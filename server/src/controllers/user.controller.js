import userModel from "../model/user.model.js";
import Notfound from "../shared/error/NotFound.js";
import BuildSuccessResponse from "../shared/utils/BuildSuccessResponse.js";

export const getMeController = async  (req,res) => {
    const user = await userModel.findById(req.user.id).select('-password');

    if(!user) throw new Notfound("User not found");

    BuildSuccessResponse(res,"user data fetched successfully",user);
}

