import { ObjectId } from "mongodb";
import db from "./../db.js"

export async function getGame(req, res) {
    const { id } = req.params;
    try {
        const game = await db.collection('games').findOne({ _id: new ObjectId(id) });
        if (!game) return res.status(404).send("Jogo não encontrado");
        res.status(200).send(game);
    } catch (e) {
        res.sendStatus(500);
    }
}