const Hall = require('../models/hall');
module.exports = async (req, res)=>{
    const { name, seats, cinemaId } = req.body;
    if(!name || !seats || !cinemaId) return res.status(422).send('Name, Cinema ID and Seats is required');
    if(typeof seats !== 'number') return res.status(422).send('Seats is invalid');
    const hall = new Hall({name, seats, cinemaId});
    try {
        const error = await hall.store();
        if(error) return res.status(422).send(error);
        res.send('Ok');
    } catch(ex) {
        res.status(422).send('Server Error');
    }
};