const Cinema = require('./cinema');

const Schema = mongoose.Schema({
    name: { type: String, required: true},
    seats: { type: Number, required: true},
    cinemaId: { type: String, required: true}
});

const Model = mongoose.model('Hall', Schema);

class Hall extends Model {
    constructor(hallObject) {
        super(hallObject);
    }

    static getHalls(cinemaId) {
        return new Promise((resolve, reject)=>{
            Hall.find({cinemaId:cinemaId}, (err, halls)=>{
                if(err) return reject(err);
                resolve(halls.map(Hall._toHallObject));
            });
        });
    } 

    static _toHallObject(row) {
        return {
            id: row._id,
            name: row.name,
            cinemaId: row.cinemaId,
            seats: row.seats
        };
    }

    async store() {
        const existsCinema = await this._existsCinema();
        if(!existsCinema) return "Cinema not exists";
        const existsHall = await this._existsHall();
        if(existsHall) return "Hall already exists";
        await this._saveHall();
        return false;
    }

    _saveHall() {
        return new Promise((resolve,reject)=>{
            this.save((err)=>{
                if(err) return reject(err);
                resolve();
            });
        });
    }

    _existsCinema() {
        return new Promise((resolve)=>{
            Cinema.findById(this.cinemaId, (err, cinema)=>{
                if(err) return resolve(false);
                resolve(!!cinema);
            });
        });
    }

    _existsHall() {
        return new Promise((resolve, reject)=>{
            Hall.findOne({
                name: this.name,
                cinemaId: this.cinemaId
            }).exec((err, hall)=>{
                if(err) return reject(err);
                resolve(!!hall);
            });
        });
    }

}

module.exports = Hall;