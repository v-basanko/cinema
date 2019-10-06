
const Session = require('../models/session');
module.exports = async (req, res)=>{
    const { hallId, filmId, startTime } = req.body;
    if(!hallId || !filmId || !startTime) return res.status(422).send('Hall ID, Film ID and startTime is required');
    if(typeof startTime !== 'number') return res.status(422).send('StartTime is invalid');
    const session = new Session({hallId, filmId, startTime});
    try {
        const error = await session.store();
        if(error) return res.status(422).send(error);
        res.send('Ok');
    } catch(ex) {
        res.status(500).send('Server Error');
    }
};