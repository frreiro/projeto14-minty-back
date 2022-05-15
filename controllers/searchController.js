import db from "../db.js";

export async function searchGame(req, res) {
    const { name } = req.params
    console.log(name);

    try {
        await db.collection('games').createIndex({ title: "text" });
        const gameFound = await db.collection('games').findOne({
            $text: { $search: name }
        })
        if (!gameFound) return res.status(404).send("Jogo não encontrado");
        res.status(200).send(gameFound._id);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);

    }
}