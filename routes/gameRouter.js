import { Router } from "express";

import { idValidate, tokenValidate } from "../middlewares/gameMiddleware.js";
import { getGame } from "./../controllers/gameController.js"

const gameRouter = Router();

gameRouter.get("/game/:id", tokenValidate, idValidate, getGame);

export default gameRouter;
