import db from "../db.js"
import { ObjectId } from "mongodb";

const getCartTotal = async (req, res) => {
    try {
        res.send({ total: req.sum.toFixed(2) });
    } catch (e) {
        console.log(e);
        res.status(500).send("Ocorreu um erro");
    }
}

const checkout = async (req, res) => {
    const { user } = res.locals;
    const userCart = req.userCart;
    try {
        if (userCart.gamesIds.length === 0) return res.status(404).send("Carrinho vazio");
        await db.collection('carts').updateOne({ userId: user._id }, { $set: { gamesIds: [] } });
        userCart.gamesIds.forEach(async (gameId) => {
            const userGameList = await db.collection('userGames').findOne({ userId: user._id });
            if(!userGameList) {
                await db.collection('userGames').insertOne({
                    userId: user._id,
                    gamesIds: [gameId]
                });
            }
            else if (userGameList.gamesIds.includes(gameId)) {
                const game = await db.collection('games').findOne({ _id: new ObjectId(gameId) });
                return res.status(400).send({ message: `Você já possui o jogo ${game.title}` });
            }
            else {
                let jogo = await db.collection('userGames').updateOne({ userId: user._id }, { $push: { gamesIds: gameId } })
                console.log(jogo)
            }
        });  
        const userPurchases = await db.collection('checkouts').findOne({ userId: user._id });
        if (!userPurchases) {
            await db.collection('checkouts').insertOne({ 
                userId: user._id,
                purchases: [
                    {
                        gamesIds: userCart.gamesIds,
                        total: req.sum
                    }
                ]
            });
        } else {
            await db.collection('checkouts').updateOne({ userId: user._id }, {
                $push: {
                    purchases: {
                        gamesIds: userCart.gamesIds,
                        total: req.sum
                    }
                }
            })
        }
        res.status(201).send("Compra realizada com sucesso");
    } catch (e) {
        console.log(e);
        res.status(500).send("Ocorreu um erro");
    }
}

export { getCartTotal, checkout};