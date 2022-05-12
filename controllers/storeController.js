import gameDb from '.././gameDb.js';

const getGames = async (req, res) => {
    try{
        const games = await gameDb.collection('games').find().toArray();
        const perPage = 20;
        const to = req.gamesCount - ((req.query.page - 1 ) * perPage);
        const from = req.gamesCount - (req.query.page * perPage);
        if(from<0) return res.status(400).send('Número da página inválido');
        const gamesPaginated = games.slice(from, to);
        res.send(gamesPaginated);
    }
    catch(e){
        res.status(500).send('Algo deu errado');
        console.log(e);
    }
}

export default getGames;