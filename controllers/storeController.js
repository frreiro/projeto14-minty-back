import db from '../db.js';

export async function getGames(req, res) {
    try {
        const games = await db.collection('games').find().toArray();
        const perPage = 20;
        const to = req.gamesCount - ((req.query.page - 1) * perPage);
        let from = req.gamesCount - (req.query.page * perPage);
        if (from < 0) from = 0;
        const gamesPaginated = games.slice(from, to);
        res.send({
            games: gamesPaginated,
            pageCount: req.pageCount
        });
    }
    catch (e) {
        res.status(500).send('Algo deu errado');
        console.log(e);
    }
}

export async function getRecentGames(req, res) {
    try {
        const lastGames = await db.collection('games').find({}).sort({ release_date: -1 }).toArray();
        res.status(200).send(lastGames.reverse().slice(-6).reverse());
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }


} 
