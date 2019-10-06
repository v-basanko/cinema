const Film = require('../models/film');
module.exports = async (req, res)=>{
    try {
        const films = await Film.getFilms();
        res.json(films);
    } catch(ex) {
        res.status(500).send('Server Error');
    }
};