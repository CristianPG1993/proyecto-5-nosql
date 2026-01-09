// Solicitamos express
const express = require('express');
// Importar la función de conexión a la base de datos
const { connect } = require('./utils/db');
// Conectar a la base de datos
connect();

// Puerta del servidor
const PORT = 3000;
const server = express();

// Importamos las rutas de películas
const movieRoutes = require('./routes/movie.routes');

// Middleware para parsear JSON. Sin esto, no podremos recibir JSON en las peticiones
server.use(express.json());

// Usamos el router en la aplicación
server.use('/movies', movieRoutes);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
