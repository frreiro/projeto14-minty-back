import db from "../db.js";
import Joi from "joi";
import { ObjectId } from "mongodb";


export async function idValidate(req, res, next) {
    const { gameId } = req.params;

    const idSchema = Joi.string().required();

    const { error } = idSchema.validate(gameId);
    if (error) return res.status(401).send("Id inválido");
    else next();
}

export async function gameValidate(req, res, next) {
    const { gameId } = req.params;

    try {
        const game = await db.collection('games').findOne({ _id: new ObjectId(gameId) })
        if (!game) return res.status(404).send("Jogo não existe");

    } catch (e) {
        console.log(e)
        return res.status(500).send("Erro ao pesquisar pelo jogos");
    }

    next();
}

export async function tokenValidate(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer', "").trim();
    if (!token) return res.sendStatus(401);
    try {
        const session = await db.collection('sessions').findOne({ token });
        if (!session) return res.status(401).send("Usuário não esta logado");

        const user = await db.collection('users').findOne({ _id: new Object(session.userId) });
        if (!user) return res.status(401).send("Usuário não existe");

        res.locals.user = user;
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }

    next();
}

export async function equalGamesValidate(req, res, next) {
    const { gameId } = req.params;
    const { user } = res.locals;

    try {
        const userCart = await db.collection('carts').findOne({ userId: user._id });
        if (userCart?.gamesIds.some(id => id === gameId)) return res.status(409).send("Jogo já adicionado");
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
    next()
}
