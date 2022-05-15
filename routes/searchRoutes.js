import { Router } from "express";
import { searchGame } from "../controllers/searchController.js";
import { tokenValidate } from "../middlewares/gameMiddleware.js";
import { searchValidate } from "../middlewares/searchMiddleware.js";

const searchRouter = Router();
searchRouter.get("/search/:name", tokenValidate, searchValidate, searchGame);

export default searchRouter;