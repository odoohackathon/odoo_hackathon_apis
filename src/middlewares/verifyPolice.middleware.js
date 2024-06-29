
import jwt from 'jsonwebtoken';
import { returnServerError } from '../Utils/utils';

export default async function verifyPolice(req,res,next){
    try {
        const token = req.headers.Authorization;

        if (!token) {
            return returnError(res, 401, 'Access denied. No token provided.');
        }
        try {
            // Verify token
            const decoded =  jwt.verify(token, process.env.SECRET_KEY); // Replace with your actual secret key
            if(decoded.role!=="police"){
                return returnError(res, 401, 'Access denied.');
            }
            // Attach the decoded user information to the request object
            req.user = decoded;
    
            next();
        } catch (error) {
            return returnError(res, 403, 'Invalid token.');
        }
    } catch (error) {
        return returnServerError(res,error); 
    }
}