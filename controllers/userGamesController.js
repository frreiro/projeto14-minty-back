import db from "../db.js";

const getUserGames = async (req, res) => {
    const { user } = res.locals;
    try {
        const userGames = await db.collection("userGames").find({
            userId: user._id
        }).toArray();
        res.send(userGames);
    }
    catch (e) {
        console.log(e);
        res.status(500).send("Ocorreu um erro");
    }
}

export default getUserGames;