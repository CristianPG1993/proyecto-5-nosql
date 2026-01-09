// Conectamos con mongoose
const mongoose = require('mongoose');


// Definimos el esquema de la colección movies
const movieSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        director: { type: String, required: true },
        year: { type: Number, required: true },
        genre: { type: String, required: true },
    },
    { 
        timestamps: true 
    }
);

// Creamos el modelo Movie
const Movie = mongoose.model('Movie', movieSchema);
// Exportamos el modelo Movie
module.exports = Movie;
