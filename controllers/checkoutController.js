import db from "../db.js"

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
        if(userCart.gamesIds.length === 0) return res.status(404).send("Carrinho vazio");
        await db.collection('carts').updateOne({ userId: user._id }, { $set: { gamesIds: [] } });
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
            await db.collection('checkouts').updateOne({ userId: user._id }, { $push: { 
                purchases: {
                    gamesIds: userCart.gamesIds,
                    total: req.sum
                }
            }})
        }
        res.status(201).send("Compra realizada com sucesso");
    } catch (e) {
        console.log(e);
        res.status(500).send("Ocorreu um erro");
    }
}

export {getCartTotal, checkout};