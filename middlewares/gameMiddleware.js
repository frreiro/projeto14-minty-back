import Joi from "joi";
import db from "../db.js";

export async function tokenValidate(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer', "").trim();
    if (!token) return res.sendStatus(401);
    try {
        const session = await db.collection('sessions').findOne({ token });
        if (!session) return res.status(401).send("Usuário não esta logado");

        const user = await db.collection('users').findOne({ _id: new Object(session.userId) });
        if (!user) return res.status(401).send("Usuário não existe");

    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

    next();
}

export async function idValidate(req, res, next) {
    const { id } = req.params;

    const idSchema = Joi.string().required();

    const { error } = idSchema.validate(id);
    if (error) return res.status(401).send("Id inválido");
    else next();
}

