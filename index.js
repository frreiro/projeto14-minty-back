import express, { json } from "express";
import chalk from "chalk";
import cors from "cors";

import signUpRouter from "./routes/signUpRouter.js";
import loginRouter from "./routes/loginRouter.js";


const app = express();
app.use(json());
app.use(cors());

app.get("/store", (req, res) => {
    res.send('OK')

});

app.use(signUpRouter);
app.use(loginRouter)

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(chalk.green.bold("Server is running..."))
})