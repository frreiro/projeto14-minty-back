import db from "../db.js"

export async function addCart(req, res) {
    const { gameId } = req.params;
    const { user } = res.locals;

    try {
        const userCart = await db.collection('cart').findOne({ userId: user._id })
        if (!userCart) {
            await db.collection('cart').insertOne({
                userId: user._id,
                gamesIds: [gameId]
            });
        } else {
            await db.collection('cart').updateOne({ userId: user._id }, { $push: { gamesIds: gameId } })
        }
        res.status(201).send("Produto adicionado ao carrinho");
    } catch (e) {
        console.log(e)
        return res.status(500).send("Ocorreu um erro");
    }
}
