const Hall = require('../models/hall');
module.exports = async (req, res)=>{
    const cinemaId = req.params['cinemaId'];
    console.log(cinemaId);
    try {
        const halls = await Hall.getHalls(cinemaId);
        res.json(halls);
    } catch(ex) {
        res.status(500).send('Server Error');
    }
};