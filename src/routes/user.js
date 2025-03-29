import express from "express";
import { getProfile, signin, signup } from "../controllers/userController.js";
import { valiadte } from "../validators/zordValidator.js";
import { zodSignupSchema } from "../validators/zodSignupschema.js";
import { zodSigninSchema } from "../validators/zordSigninSchema.js";
const router = express.Router()
router.use(express.json())
// app.use(express.text())
router.use(express.urlencoded({ extended: true }));
router.get('/profile',getProfile)
router.post('/signup',valiadte(zodSignupSchema),signup)
router.get('/signin',valiadte(zodSigninSchema),signin)
router.get('/home',valiadte(zodSigninSchema),signin)
export default router 
