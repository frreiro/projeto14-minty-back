import db from "../db.js";

export async function signUp(req, res) {
    const { name, email, password } = req.body;

    try {
        await db.collection('users').insertOne({ name, email, password });
        res.status(201).send("Usuário cadastrado com sucesso");
    } catch (e) {
        res.send(500);
    }
}