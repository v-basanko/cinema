const Schema = mongoose.Schema({
    name: { type: String, required: true},
    year: { type: Number, required: true},
    duration: { type: Number, required: true} //minutes
});

const Model = mongoose.model('Film', Schema);

class Film extends Model {
    constructor(filmObject) {
        super(filmObject);
    }

    static getFilms() {
        return new Promise((resolve, reject)=>{
            Film.find({}, (err, films)=>{
                if(err) return reject(err);
                resolve(films.map(Film._toFilmObject));
            });
        });
    }

    static _toFilmObject(row) {
        return {
            id: row._id,
            name: row.name,
            year: row.year,
            duration: row.duration
        };
    }

    store() {
        return new Promise((resolve, reject)=>{
            this.save((err)=>{
                if(err) return reject(err);
                resolve(false);
            });
        });
    }


    
}

module.exports = Film;