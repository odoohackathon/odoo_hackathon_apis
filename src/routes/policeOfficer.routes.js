import express from "express";
import { getPoliceOfficers, policeLogin, setFcmToken } from "../controllers/police.controller";
import verifyPolice from "../middlewares/verifyPolice.middleware";
import verifyUser from "../middlewares/verifyUser.middleware";

const router = express.Router();

router.post("/login",policeLogin);
router.get("/getAllOfficers",verifyUser,getPoliceOfficers);
router.patch("/setFcmToken",verifyPolice,setFcmToken);

export default router;