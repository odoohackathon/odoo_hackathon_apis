// controllers/crimeController.mjs
import { validateIsNotUndefined } from '../Utils/utils.js';
import Crime from '../models/crime.models.js';
import { returnServerError, returnError, returnSuccess } from '../Utils/utils.js';
import PoliceOfficer from '../models/policeOfficer.models.js';


export async function reportCrime(req, res) {
    try {
        const { user } = req;
        const {
            crimeTitle,
            crimeDescription,
            crimePhoto,
            crimeVideo,
            crimeDate,
            crimeTime,
            latitude,
            longitude,
            pincode
        } = req.body;

        // Validate required fields
        const isValidated = validateIsNotUndefined({
            crimeTitle,
            crimeDescription,
            crimeDate,
            crimeTime,
            latitude,
            longitude,
            pincode
        });

        if (!isValidated.result) {
            return returnError(res, 400, isValidated.message);
        }

        // Create a new crime report
        const newCrime = new Crime({
            user: user.id,
            crimeTitle,
            crimeDescription,
            crimePhoto,
            crimeVideo,
            crimeDate,
            crimeTime,
            latitude,
            longitude,
            pincode,
            status: "reported"
        });

        await newCrime.save();

        const policeOfficeTokens = await PoliceOfficer.find((token))

        return returnSuccess(res, 201, "Crime reported successfully.",undefined ,newCrime);
    } catch (error) {
        return returnServerError(res, error);
    }
}


export async function updateCrimeStatus(req, res) {
    try {
        const { crimeId } = req.params;
        const { status } = req.body;

        // Validate the status field
        const isValidated = validateIsNotUndefined({ status });
        if (!isValidated.result) {
            return returnError(res, 400, "Status is required.");
        }

        // Ensure the status is one of the allowed values
        const allowedStatuses = ["reported", "under_investigation", "resolved"];
        if (!allowedStatuses.includes(status)) {
            return returnError(res, 400, "Invalid status value.");
        }

        // Find and update the crime status
        const updatedCrime = await Crime.findByIdAndUpdate(
            {_id:crimeId},
            { status, updatedAt: Date.now() },
            { new: true }
        );

        if (!updatedCrime) {
            return returnError(res, 404, "Crime not found.");
        }

        return returnSuccess(res, 200, "Crime status updated successfully.", undefined,updatedCrime);
    } catch (error) {
        return returnServerError(res, error);
    }
}

export async function getAllCrimes(req, res) {
    try {
        const { status } = req.query;

        let filter = {};
        if (status) {
            const allowedStatuses = ["reported", "under_investigation", "resolved"];
            if (!allowedStatuses.includes(status)) {
                return returnError(res, 400, "Invalid status value.");
            }
            filter.status = status;
        }

        const crimes = await Crime.find(filter).populate('user', 'name email');

        return returnSuccess(res, 200, "Crimes retrieved successfully.", undefined,crimes);
    } catch (error) {
        return returnServerError(res, error);
    }
}

export async function getCrimesByUser(req, res) {
    try {
        const { user } = req;

        const crimes = await Crime.find({ user: user.id }).populate('user', 'name email');

        return returnSuccess(res, 200, "Crimes reported by the user retrieved successfully.", undefined,crimes);
    } catch (error) {
        return returnServerError(res, error);
    }
}