import express from "express";
const router = express.Router();
import { currentUser, loginUser, registerUser } from "../controllers/userController.js";
import validateToken from "../middlewares/validateToken.js";
import test from "../middlewares/test.js"
router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/current").get(validateToken, currentUser);

export default router;