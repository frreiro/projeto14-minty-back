import { Router } from "express";
import { tokenValidate } from "../middlewares/cartMiddleware.js";
import getUserGames from "../controllers/userGamesController.js";

const userGamesRouter = Router();

userGamesRouter.get("/userGames", tokenValidate, getUserGames);

export default userGamesRouter;