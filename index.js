import express, { json } from "express";
import chalk from "chalk";
import cors from "cors";

import signUpRouter from "./routes/signUpRouter.js";
import loginRouter from "./routes/loginRouter.js";
import storeRouter from "./routes/storeRouter.js";
import gameRouter from "./routes/gameRouter.js";


const app = express();
app.use(json());
app.use(cors());

app.use(signUpRouter);
app.use(loginRouter)
app.use(gameRouter);
app.use(storeRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(chalk.green.bold("Server is running..."))
})