import express from "express";
import { getUsers, userSignup } from "../controllers/user.controller.js";
const router = express.Router();

router.post('/signUp',userSignup )

router.get("/getUsers",getUsers);


export default router;

