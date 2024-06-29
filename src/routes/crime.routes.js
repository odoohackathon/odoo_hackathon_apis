import express from "express";
import verifyUser from "../middlewares/verifyUser.middleware.js";
import { getAllCrimes, getCrimesByUser, reportCrime, updateCrimeStatus } from "../controllers/crime.controller.js";
const router = express.Router();


router.post("/report",verifyUser,reportCrime);
router.patch('/update-status/:crimeId', verifyUser, updateCrimeStatus);
router.get('/getAllCrimes', verifyUser, getAllCrimes);
router.get('/my-crimes', verifyUser, getCrimesByUser); // New route for fetching user's reported crimes


export default router;