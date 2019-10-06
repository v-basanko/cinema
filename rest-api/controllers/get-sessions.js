const Session = require('../models/session');
module.exports = async (req, res)=>{
    
    try {
        const sessions = await Session.getSessions();
        res.json(sessions);
    } catch(ex) {
        res.status(500).send('Server Error');
    }
};