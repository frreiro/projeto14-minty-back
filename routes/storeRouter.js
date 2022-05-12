import { Router } from "express";
import getGames from "../controllers/storeController.js";
import validateStore from "../middlewares/storeMiddleware.js";

const storeRouter = Router();

storeRouter.get("/store", validateStore, getGames);

export default storeRouter;
