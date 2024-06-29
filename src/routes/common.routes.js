import express from "express";
import { verifyExistance } from "../controllers/common.controller.js";
const router = express.Router();

router.post("/isExist",verifyExistance);

export default router;