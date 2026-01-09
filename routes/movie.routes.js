const express = require('express');

const Movie = require('../models/Movie');


const router = express.Router();


// Obtenemos el listado de películas
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving movies' });
  }
});

// Obtenemos una película por su ID
router.get('/id/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const movie = await Movie.findById(id);
    if (movie) {
      return res.status(200).json(movie);
    } else {
      return res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    return res.status(400).json({ message: 'Invalid movie ID' });
  }
});

//Obtenemos películas por su título
router.get('/title/:title', async (req, res) => {
  const {title} = req.params;
  try {
    const movieByTitle = await Movie.find({ title});
    return res.status(200).json(movieByTitle);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving movies' });
  }
});

// Obtenemos películas por su genero
router.get('/genre/:genre', async (req, res) => {
  const {genre} = req.params;
  try {
    const movieByGenre = await Movie.find({ genre});
    return res.status(200).json(movieByGenre);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving movies' });
  }
});

// Obtenemos películas por su año
router.get('/year/:year', async (req, res) => {
  const {year} = req.params;
  try {
    const movieByYear = await Movie.find({ 
      year: {$gte: Number(year)} 
    });
    
    return res.status(200).json(movieByYear);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving movies' });
  }
});

//Crear metodo posrt para añadir nuevas películas
router.post('/', async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        const createdMovie = await newMovie.save();
        return res.status(201).json(createdMovie);
    } catch (error) {
        return res.status(400).json({ message: 'Error creating movie', error: error.message });
    }
});

//Crear método put para modificar una pelicula

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(
            id, 
            req.body,
            { new: true, runValidators: true }
        );
        if (updatedMovie) {
            return res.status(200).json(updatedMovie);
        } else {
            return res.status(404).json({ message: 'Movie not found' });
        }
    } catch (error) {
        return res.status(400).json({ message: 'Invalid movie ID' });
    }
});

//Crear método delete para eliminar una pelicula
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedMovie = await Movie.findByIdAndDelete(id);
        if (deletedMovie) {
            return res.status(200).json({ message: 'Movie deleted successfully' });
        } else {
            return res.status(404).json({ message: 'Movie not found' });
        }
    } catch (error) {
        return res.status(400).json({ message: 'Invalid movie ID' });
    }
});

module.exports = router;