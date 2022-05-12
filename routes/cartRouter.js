import { Router } from "express";
import { addCart } from "../controllers/cartController.js";
import { gameValidate, idValidate, tokenValidate } from "../middlewares/cartMiddleware.js";

const cartRouter = Router();

cartRouter.post("/cart/:gameId", idValidate, gameValidate, tokenValidate, addCart);

export default cartRouter;