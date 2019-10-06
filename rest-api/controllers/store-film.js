const Film = require('../models/film');
module.exports = async (req, res)=>{
    const { name, year, duration } = req.body;
    if(!name || !year || !duration) return res.status(422).send('Name, Year and Duration is required');
    if(typeof year !== 'number' || typeof duration !== 'number') return res.status(422).send('Year or Duration is invalid');
    const film = new Film({name, year, duration});
    try {
        const error = await film.store();
        if(error) return res.status(422).send(error);
        res.send('Ok');
    } catch(ex) {
        res.status(500).send('Server Error');
    }
};