import express, { json } from "express";
import chalk from "chalk";
import cors from "cors";

import signUpRouter from "./routes/signUpRouter.js";


const app = express();
app.use(json());
app.use(cors())

app.post("/login", (req, res) => {
    res.send('OK')

});

app.get("/store", (req, res) => {
    res.send('OK')

});

app.use(signUpRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(chalk.green.bold("Server is running..."))
})