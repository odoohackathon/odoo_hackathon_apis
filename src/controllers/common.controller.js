import { generateToken, returnError, returnServerError, returnSuccess, validateIsNotUndefined } from "../Utils/utils.js";
import PoliceOfficer from "../models/policeOfficer.models.js";
import User from "../models/user.models.js";

export async function verifyExistance(req,res){
    try {
        const {credential,userType} = req.body;
        const isValidated = validateIsNotUndefined({credential,userType});
        if(!isValidated.result){
            return returnError(res,400,"Select Your User Type");
        }
        if(userType==="police_officer"){
            const policeOfficer = await PoliceOfficer.findOne({
                $or: [
                    { email: credential },
                    { phone: credential }
                ]
            });

            if (!policeOfficer) {
                return returnError(res, 404, "Police officer not found");
            }

            const payload = {
                id:policeOfficer._id,
                role:"police",
                email:policeOfficer.email
            }
            const token = generateToken(payload,"24h");

            return returnSuccess(res, 200, "Police officer found", token); 
       }
        else{
            const user = await User.findOne({
                $or: [
                    { email: credential },
                    { phone: credential }
                ]
            });

            if (!user) {
                return returnError(res, 404, "Police officer not found");
            }

            const payload = {
                id:user._id,
                role:"user",
                email:user.email
            }
            const token = generateToken(payload,"24h");

            return returnSuccess(res, 200, "User found", token); 
        }
    } catch (error) {
        return returnServerError(res,error);
    }
}