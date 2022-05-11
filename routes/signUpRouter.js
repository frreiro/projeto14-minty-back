import { Router } from "express";
import { signUp } from "../controllers/signUpController.js";
import { emailExist, signUpValidate } from "../middlewares/signUpMiddleware.js";

const signUpRouter = Router();

signUpRouter.post("/signUp", signUpValidate, emailExist, signUp);

export default signUpRouter;