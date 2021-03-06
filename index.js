import express, { json } from "express";
import chalk from "chalk";
import cors from "cors";

import signUpRouter from "./routes/signUpRouter.js";
import loginRouter from "./routes/loginRouter.js";
import cartRouter from "./routes/cartRouter.js";
import storeRouter from "./routes/storeRouter.js";
import gameRouter from "./routes/gameRouter.js";
import searchRouter from "./routes/searchRoutes.js";
import checkoutRouter from "./routes/checkoutRouter.js";
import userGamesRouter from "./routes/userGamesRouter.js";

const app = express();
app.use(json());
app.use(cors());

app.use(signUpRouter);
app.use(loginRouter)

app.use(cartRouter)
app.use(gameRouter);
app.use(storeRouter);
app.use(checkoutRouter);
app.use(userGamesRouter)

app.use(searchRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(chalk.green.bold("Server is running..."))
})