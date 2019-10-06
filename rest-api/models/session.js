const Hall = require('./hall');
const Film = require('./film');

const Schema = mongoose.Schema({
    filmId: { type: String, required: true},
    hallId: { type: String, required: true},
    cinemaId: String,
    startTime: { type: Number, required: true},
    endTime: Number
});

const Model = mongoose.model('Session', Schema);

class Session extends Model {
    constructor(sessionObject) {
        super(sessionObject);
    }

    static getSessionsByCinemaId(cinemaId, date) {
        return new Promise((resolve, reject)=>{
            const startDate = date;
            const endDate = date + (60*60*24) - 1;
            Session.find({
                cinemaId: cinemaId,
                startTime: {
                    $lte: endDate,
                    $gte: startDate
                }
            })
            .exec((err, sessions)=>{
                if(err) return reject(err);
                resolve(sessions);
            });
        });
    }

    static getSessionsByHallId(hallId, date) {
        return new Promise((resolve, reject)=>{
            const startDate = date;
            const endDate = date + (60*60*24) - 1;
            Session.find({
                hallId: hallId,
                startTime: {
                    $lte: endDate,
                    $gte: startDate
                }
            })
            .exec((err, sessions)=>{
                if(err) return reject(err);
                resolve(sessions);
            });
        });
    }

    async store() {
        const hall = await this._getHall();
        const film = await this._getFilm();
        if(!hall || !film) return 'Hall or Film not exists';
        this.cinemaId = hall.cinemaId;
        const isValidTime = await this._isValidTime(film.duration);
        if(!isValidTime) return 'This time already used';
        await this._saveSession();
        return false;
    }

    _saveSession() {
        return new Promise((resolve,reject)=>{
            this.save((err)=>{
                if(err) return reject(err);
                resolve();
            });
        });
    }

    _getHall() {
        return new Promise((resolve)=>{
            Hall.findById(this.hallId, (err, hall)=>{
                if(err) return resolve(false);
                resolve(hall);
            });
        });
    }

    _getFilm() {
        return new Promise((resolve)=>{
            Film.findById(this.filmId, (err, film)=>{
                if(err) return resolve(false);
                resolve(film);
            });
        });
    }

    _isValidTime(duration) {
        return new Promise((resolve, reject)=>{
            this.endTime = this.startTime + (duration * 60);
            Session.find({
                hallId: this.hallId,
                startTime: {
                    $lte: this.endTime
                },
                endTime: {
                    $gte: this.startTime
                }
            })
            .exec((err, sessions)=>{
                if(err) return reject(err);
                resolve(!sessions.length);
            });
        });
    }
}

module.exports = Session;