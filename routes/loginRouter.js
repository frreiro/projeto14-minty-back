import { Router } from "express";
import login from "../controllers/loginController.js";
import { loginValidate } from "../middlewares/loginMiddleware.js";

const loginRouter = Router();

loginRouter.post("/login", loginValidate, login);

export default loginRouter;