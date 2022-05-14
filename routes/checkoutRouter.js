import { Router } from "express";
import {getCartTotal, checkout }from "../controllers/checkoutController.js";
import { tokenValidate } from "../middlewares/cartMiddleware.js";
import validateCheckout from "../middlewares/checkoutMiddleware.js";

const checkoutRouter = Router();

checkoutRouter.get("/checkout", tokenValidate, validateCheckout, getCartTotal);
checkoutRouter.post("/checkout", tokenValidate, validateCheckout, checkout);

export default checkoutRouter;