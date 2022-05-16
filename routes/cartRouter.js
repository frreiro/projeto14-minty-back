import { Router } from "express";
import { addCart, deleteGame, getCart, getCartNumber } from "../controllers/cartController.js";
import { equalGamesValidate, gameValidate, idValidate, tokenValidate } from "../middlewares/cartMiddleware.js";

const cartRouter = Router();

cartRouter.post("/cart/:gameId", idValidate, gameValidate, tokenValidate, equalGamesValidate, addCart);
cartRouter.get("/cart", tokenValidate, getCart);
cartRouter.delete("/cart/:gameId", idValidate, gameValidate, tokenValidate, deleteGame)
cartRouter.get("/cart/number", tokenValidate, getCartNumber);
export default cartRouter;