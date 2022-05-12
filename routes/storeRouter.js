import { Router } from "express";
import getGames from "../controllers/storeController.js";
import validateStore from "../middlewares/storeMiddleware.js";
import { tokenValidate } from "../middlewares/gameMiddleware.js";

const storeRouter = Router();

storeRouter.get("/store", tokenValidate, validateStore, getGames);

export default storeRouter;
