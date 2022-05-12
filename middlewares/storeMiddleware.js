import gameDb from '.././gameDb.js';

const validateStore = async (req, res, next) => {
    const page = parseInt(req.query.page);
    try {
        const perPage = 20;
        const gamesCount = await gameDb.collection('games').count();
        const pageCount = Math.ceil(gamesCount / perPage);

        if (page < 1) return res.status(400).send('Número da página inválido');
        if (page > pageCount) return res.status(400).send('Não existe essa página');

        req.gamesCount = gamesCount;
        req.pageCount = pageCount;
    }
    catch (e) {
        res.status(500).send('Algo deu errado **');
        console.log(e);
    }

    next();
}

export default validateStore;