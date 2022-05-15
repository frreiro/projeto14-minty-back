import db from "../db.js";
import { ObjectId } from "mongodb";

const getUserGames = async (req, res) => {
    const { user } = res.locals;
    try {
        const userGames = await db.collection("userGames").find({
            userId: user._id
        }).toArray();

        const games = [];
        userGames.forEach(userGame => {
            userGame.gamesIds.forEach(gameId => {
                games.push(gameId);
            });
        });

        const gamesInfo = await db.collection("games").find({
            _id: { $in: games.map(item => ObjectId(item)) }
        }).toArray();

        res.send(gamesInfo);
    }
    catch (e) {
        console.log(e);
        res.status(500).send("Ocorreu um erro");
    }
}

export default getUserGames;