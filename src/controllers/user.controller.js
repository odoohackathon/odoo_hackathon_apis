import { returnError, returnServerError, returnSuccess, validateIsNotUndefined } from "../Utils/utils.js";
import User from "../models/user.models.js";


export const userSignup = async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        // Validate required fields
        const isValidated = validateIsNotUndefined({ name, email, phone });
        if (!isValidated.result) {
            return returnError(res, 400, isValidated.message);
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return returnError(res, 400, 'User already exists with this email.');
        }

        // Create a new user
        const newUser = new User({ name, email, phone });
        await newUser.save();

        return returnSuccess(res, 201, 'User registered successfully.');
    } catch (error) {
        return returnServerError(res, error);
    }
}

export async function userLogin(req,res){
    try {
        const {email,password} = req.body;
        const isValidated = validateIsNotUndefined({ username, password });
        if(!isValidated.result){
            return returnError(res,400,isValidated.message)
        }
        const user = await User.findOne({ email:username });
        if (!user) {
            return returnError(res,401,"Username Not Found.!");
        }

        // Compare the provided password with the stored hashed password
        if(password===user.password){
            const payload = {
                id:user._id,
                email:user.email,
                role:"user"
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


 export async function getUsers(req,res){
    try {
        const users = await User.find({});
        return returnSuccess(res,200,"Users Fetched Successfully",undefined,users)
    } catch (error) {
        return returnServerError(res, error);

    }
 }


 export async function updateUser(req,res){
    try {
        const { userId, name, email, phone } = req.body;

        // Validate required fields
        const isValidated = validateIsNotUndefined({ userId, name, email, phone });
        if (!isValidated.result) {
            return returnError(res, 400, isValidated.message);
        }

        // Find and update the user
        const updatedUser = await User.findByIdAndUpdate(
            {_id:userId},
            { name, email, phone },
            { new: true } // Return the updated document and run validators
        );

        if (!updatedUser) {
            return returnError(res, 404, 'User not found.');
        }

        return returnSuccess(res, 200, 'User updated successfully.',undefined, updatedUser);
    
    } catch (error) {
        return returnServerError(res, error);
    }
 }


