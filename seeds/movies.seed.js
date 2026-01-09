// Requerimos conexión a la base de datos y el modelo Movie
const mongoose = require('mongoose');
const Movie = require('../models/Movie');

// Definimos la colección de películas a insertar
const movies = [
  {
    title: 'The Matrix',
    director: 'Hermanas Wachowski',
    year: 1999,
    genre: 'Acción',
  },
  {
    title: 'The Matrix Reloaded',
    director: 'Hermanas Wachowski',
    year: 2003,
    genre: 'Acción',
  },
  {
    title: 'Buscando a Nemo',
    director: 'Andrew Stanton',
    year: 2003,
    genre: 'Animación',
  },
  {
    title: 'Buscando a Dory',
    director: 'Andrew Stanton',
    year: 2016,
    genre: 'Animación',
  },
  {
    title: 'Interestelar',
    director: 'Christopher Nolan',
    year: 2014,
    genre: 'Ciencia ficción',
  },
  {
    title: '50 primeras citas',
    director: 'Peter Segal',
    year: 2004,
    genre: 'Comedia romántica',
  },
];

//Convertimos los objetos a documentos de mongoose
const movieDocuments = movies.map((movie) => new Movie(movie));

// Conectamos con la base de datos y añadimos las películas
mongoose
  .connect('mongodb://localhost:27017/proyecto5-movies')
  .then(async () => {
    const allMovies = await Movie.find();
        if (allMovies.length){
        await Movie.collection.drop();
        }
    })
    .then(async () => {
        await Movie.insertMany(movieDocuments);
    })
    .catch((err) => console.log('Error seeding data: ', err))
    .finally(() => mongoose.disconnect());
    