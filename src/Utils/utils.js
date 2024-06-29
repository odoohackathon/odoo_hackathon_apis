import jwt from 'jsonwebtoken';


export function returnServerError(res,error){
    console.log("Internal Server Error",error);
    return res.status(500).json({
        result:false,
        message:"Internal Server Error"
    })
}


export function returnError(res,status,message){
    return res.status(status).json({
        result:false,
        message:message
    })
}

export function returnSuccess(res, status, message, token,data) {
    const response = {
        result: true,
        message: message
    };
    
    if (token) {
        response.token = token;
    }
    if(data){
        response.data = data
    }

    return res.status(status).json(response);
}
export function validateIsNotUndefined(fields) {
    for (let [fieldName, fieldValue] of Object.entries(fields)) {
        if (!fieldValue) {
            return {
                message: `${fieldName} is required`,
                result: false,
                field: fieldName
            };
        }
    }

    return {
        message: `All fields are validated`,
        result: true
    };
}

export function generateToken(payload, expiresIn = '1h') {
    const secretKey = process.env.SECRET_KEY;
    return jwt.sign(payload, secretKey, { expiresIn });
}