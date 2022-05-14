import db from '../db.js';
import { ObjectId } from 'mongodb';
export default async function validateCheckout(req, res, next){
    const { user } = res.locals;
    try{
        const userCart = await db.collection('carts').findOne({ userId: user._id });
    if (!userCart) return res.status(404).send("Carrinho não encontrado");

    const games = await db.collection("games").find({_id: {$in: userCart.gamesIds.map(item => ObjectId(item))}}).toArray();
    let sum = 0;
    games.forEach(game => sum += game.price);
    req.sum = sum;
    req.userCart = userCart;
    next();
    } catch (e) {
        console.log(e);
        res.status(500).send("Ocorreu um erro");
    }
}