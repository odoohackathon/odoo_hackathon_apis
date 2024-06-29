import { returnError, returnServerError, returnSuccess, validateIsNotUndefined } from "../Utils/utils.js";
import PoliceOfficer from "../models/policeOfficer.models.js";

export async function policeLogin(req,res){
    try {
        const {email,password} = req.body;
        const isValidated = validateIsNotUndefined({ email, password });
        if(!isValidated.result){
            return returnError(res,400,isValidated.message)
        }
        const policeOfficer = await PoliceOfficer.findOne({ username });
        if (!policeOfficer) {
            return returnError(res,401,"Email Not Found.!");
        }

        // Compare the provided password with the stored hashed password
        if(password===policeOfficer.password){
            const payload = {
                id:policeOfficer._id,
                email:policeOfficer.email,
                role:"policeOfficer"
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

export async function getPoliceOfficers(req, res) {
    try {
        const { status } = req.query;

        // Validate the status filter
        const allowedStatuses = ["verified", "rejected", "pending"];
        const filterConditions = {};

        if (status) {
            if (!allowedStatuses.includes(status)) {
                return returnError(res, 400, "Invalid status value.");
            }
            filterConditions.status = status;
        }

        const policeOfficers = await PoliceOfficer.find(filterConditions);
        return returnSuccess(res, 200, "Police Officers Fetched Successfully", undefined, policeOfficers);
    } catch (error) {
        return returnServerError(res, error);
    }
}

export const setFcmToken = async (req, res) => {
    try {
      const { fcmToken } = req.body;
      if (!fcmToken) {
        return returnError(res,400,"Please Provide FCM TOKEN")
      }
      const user = await PoliceOfficer.findOneAndUpdate(
        { _id: req.user.id },
        { token: fcmToken },
        { new: true }
      );

      return returnSuccess(res,200,"FCM Token Registered");
       
    } catch (error) {
      return returnServerError(res,error);
  }}