const Session = require('../models/session');
module.exports = async (req, res)=>{
    if(
        !req.query 
        || !req.query.date 
        || !/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/.test(req.query.date)
        ) return res.status(422).send('Date is empty or is invalid');
    const unixtime = Date.parse(req.query.date)/1000;
    if(Number.isNaN(unixtime)) return res.status(422).send('Date is invalid');
    if(!req.params['id']) return res.status(422).send('Cinema ID is required');
    try {
        const sessions = await Session.getSessionsByCinemaId(req.params['id'], unixtime);
        res.json(sessions);
    } catch(ex) {
        res.status(500).send('Server Error');
    }
};