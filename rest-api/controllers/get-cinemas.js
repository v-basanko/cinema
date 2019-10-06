const Cinema = require('../models/cinema');
module.exports = async (req, res)=>{
    try {
        const cinemas = await Cinema.getCinemas();
        res.json(cinemas);
    } catch(ex) {
        res.status(500).send('Server Error');
    }
};