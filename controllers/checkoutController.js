import db from "../db.js"
import Joi from "joi";

const getCartTotal = async (req, res) => {
    try {
        res.send({ total: req.sum.toFixed(2) });
    } catch (e) {
        console.log(e);
        res.status(500).send("Ocorreu um erro");
    }
}

const paymentSchema = Joi.object().keys({
    payment: Joi.string().valid("cartao","boleto").required()
})

const checkout = async (req, res) => {
    const { error } = paymentSchema.validate(req.body);
    const { user } = res.locals;
    const userCart = req.userCart;
    try {
        if (error) return res.status(422).send(error.details.map(detail => detail.message));
        if (userCart.gamesIds.length === 0) return res.status(404).send("Carrinho vazio");
        const userPurchases = await db.collection('checkouts').findOne({ userId: user._id });
        const gamesPurchased = [];
        userPurchases.purchases.forEach(purchase => {
            gamesPurchased.push(...purchase.gamesIds);
        });

        if (userCart.gamesIds.some(gameId => gamesPurchased.includes(gameId))) {
            return res.status(409).send("Existem produtos no carrinho que já foram comprados, remova-os para continuar");
        }

        await db.collection('carts').updateOne({ userId: user._id }, { $set: { gamesIds: [] } });


        userCart.gamesIds.forEach(async (gameId) => {
            const userGames = await db.collection('userGames').findOne({ userId: user._id });
            if (!userGames) {
                await db.collection('userGames').insertOne({
                    userId: user._id,
                    gamesIds: [gameId]
                });
            } else {
                await db.collection('userGames').updateOne({ userId: user._id }, { $push: { gamesIds: gameId } })
            }
        });

        if (!userPurchases) {
            await db.collection('checkouts').insertOne({
                userId: user._id,
                purchases: [
                    {
                        gamesIds: userCart.gamesIds,
                        total: req.sum,
                        payment: req.body.payment
                    }
                ]
            });
        } else {
            await db.collection('checkouts').updateOne({ userId: user._id }, {
                $push: {
                    purchases: {
                        gamesIds: userCart.gamesIds,
                        total: req.sum,
                        payment: req.body.payment
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

export { getCartTotal, checkout };