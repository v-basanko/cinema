const Schema = mongoose.Schema({
    city: { type: String, required: true},
    name: { type: String, required: true}
});

const Model = mongoose.model('Cinema', Schema);

class Cinema extends Model {
    constructor(cinemaObject) {
        super(cinemaObject);
    }

    static getCinemas() {
        return new Promise((resolve, reject)=>{
            Cinema.find({}, (err, cinema)=>{
                if(err) return reject(err);
                resolve(cinema.map(Cinema._toCinemaObject));
            });
        });
    }

    static _toCinemaObject(row) {
        return {
            name: row.name,
            city: row.city,
            id: row._id
        };
    }

    async store() {
        const cinema = await this._existsCinema();
        if(cinema) return 'Cinema already exists';
        await this._saveCinema();
        return false;
    }

    _saveCinema() {
        return new Promise((resolve,reject)=>{
            this.save((err)=>{
                if(err) return reject(err);
                resolve();
            });
        });
    }

    _existsCinema() {
        return new Promise((resolve, reject)=>{
            Cinema.findOne({
                name: this.name,
                city: this.city
            }).exec((err, cinema)=>{
                if(err) return reject(err);
                resolve(!!cinema);
            });
        });
    }
}

module.exports = Cinema;