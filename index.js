import express, { json } from "express";
import chalk from "chalk";
import cors from "cors";


const app = express();
app.use(json());
app.use(cors())

app.post("/login", (req, res) => {
    res.send('OK')

});

app.get("/store", (req, res) => {
    res.send('OK')

});

app.post("/signUp", (req, res) => {
    res.send('OK')
})

app.listen(5000, () => {
    console.log(chalk.green.bold("Server is running..."))
})