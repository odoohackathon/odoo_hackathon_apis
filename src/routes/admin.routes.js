import express from "express";
import { adminLogin, changeOfficerVerificationStatus } from "../controllers/admin.controller.js";
const router = express.Router();

router.post("/login",adminLogin);
router.patch("/updateOfficerStatus",changeOfficerVerificationStatus);

export default router;