import bcrypt from "bcrypt";

import db from "../db.js";


export async function signUp(req, res) {
    const { name, email, password } = req.body;

    const securePassword = bcrypt.hashSync(password, 10);
    try {
        await db.collection('users').insertOne({ name, email, password: securePassword });
        res.status(201).send("Usuário cadastrado com sucesso");
    } catch (e) {
        res.send(500);
    }
}