const Cinema = require('../models/cinema');
module.exports = async (req, res)=>{
    const { name, city } = req.body;
    if(!name || !city) return res.status(422).end('Name and City is required');
    const cinema = new Cinema({name, city});
    try {
        const error = await cinema.store();
        if(error) return res.status(422).send(error);
        res.send('Ok');
    } catch(ex) {
        res.status(500).send('Server Error');
    }
};