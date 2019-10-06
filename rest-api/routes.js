const bodyParser = require('body-parser');
const {
    storeCinema,
    getCinemas,
    storeHall,
    getHalls,
    storeFilm,
    getFilms,
    storeSession,
    getSessionsByHall,
    getSessionsByCinema
} = require('./controllers');

module.exports = (express)=>{
    const router = express.Router();
    router.use(bodyParser());
   
    router.post('/cinema', storeCinema);
    router.get('/cinema', getCinemas);

    router.post('/hall', storeHall);
    router.get('/hall/:cinemaId', getHalls);

    router.post('/film', storeFilm);
    router.get('/film', getFilms);

    router.post('/session', storeSession);
    router.get('/session/hall/:id', getSessionsByHall);
    router.get('/session/cinema/:id', getSessionsByCinema);

    return router;
};