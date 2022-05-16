import { ObjectId } from "mongodb";
import db from "../db.js"

export async function addCart(req, res) {
    const { gameId } = req.params;
    const { user } = res.locals;

    try {
        const userCart = await db.collection('carts').findOne({ userId: user._id })
        if (!userCart) {
            await db.collection('carts').insertOne({
                userId: user._id,
                gamesIds: [gameId]
            });
        } else {
            await db.collection('carts').updateOne({ userId: user._id }, { $push: { gamesIds: gameId } })
        }
        res.status(201).send("Produto adicionado ao carrinho");
    } catch (e) {
        console.log(e)
        return res.status(500).send("Ocorreu um erro");
    }
}


export async function getCart(req, res) {
    const { user } = res.locals;

    try {
        const userCart = await db.collection('carts').findOne({ userId: user._id });
        if (!userCart) return res.status(404).send("Carrinho não encontrado");

        let sum = 0;
        const gamesAwait = await userCart.gamesIds.map(async (id) => {
            const game = await db.collection('games').findOne({ _id: new ObjectId(id) });
            sum += await game.price
            return game;
        });

        const games = await Promise.all(gamesAwait);

        res.status(200).send({ userCart: games, total: sum.toFixed(2) });


    } catch (e) {
        console.log(e);
        return res.status(500).send("Ocorreu um erro");
    }
}


export async function deleteGame(req, res) {
    const { gameId } = req.params;
    const { user } = res.locals;

    try {
        const gameCart = await db.collection('carts').findOne({
            gamesIds: gameId
        })

        if (!gameCart) return res.status(404).send("Jogo não existe no carrinho")

        await db.collection('carts').updateOne({ userId: user._id }, {
            $pull: { gamesIds: gameId }
        })
        res.status(200).send("Jogo deletado do carrinho")
    } catch (e) {
        res.sendStatus(500);
    }
}

export async function getCartNumber(req, res) {
    const { user } = res.locals;
    console.log(user)

    try {
        const userCart = await db.collection('carts').findOne({ userId: user._id });
        if (!userCart) return res.status(404).send("Carrinho não encontrado");
        console.log(userCart)
        res.status(200).send(userCart.gamesIds);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}
