import { generateToken, returnError, returnServerError, returnSuccess, validateIsNotUndefined } from "../Utils/utils.js"
import Admin from "../models/admin.models.js";

export async function adminLogin(req,res){
    try {
        const {username,password} = req.body;
        const isValidated = validateIsNotUndefined({ username, password });
        if(!isValidated.result){
            return returnError(res,400,isValidated.message)
        }
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return returnError(res,401,"Username Not Found.!");
        }

        // Compare the provided password with the stored hashed password
        if(password===admin.password){
            const payload = {
                id:admin._id,
                username:admin.username,
                role:"admin"
            }
            const token = generateToken(payload,"24h");
            return returnSuccess(res,200,"Loggedin Successfully",token);
        }
        else{
            return returnError(res,401,"Incorrect Password.!");
        }

      } catch (error) {
        return returnServerError(res,error);
    }
}


export async function changeOfficerVerificationStatus(req,res){
    try {
        const { policeId, status } = req.body;

        // Validate required fields
        const isValidated = validateIsNotUndefined({ policeId, status });
        if (!isValidated.result) {
            return returnError(res, 400, isValidated.message);
        }

        // Find and update the police officer
        const updatedPoliceOfficer = await PoliceOfficer.findOneAndUpdate(
            { _id:policeId },
            { isVerified:status },
            { new: true } // Return the updated document
        );

        if (!updatedPoliceOfficer) {
            return returnError(res, 404, 'Police officer not found.');
        }

        return returnSuccess(res, 200, 'Police officer updated successfully.',undefined, updatedPoliceOfficer);

    } catch (error) {
        return returnServerError(res,error);
    }
}