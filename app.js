// Importa el framework Express
const express = require('express');

// Crea la aplicacion Express
const app = express();

// Permite recibir cuerpos en formato JSON
app.use(express.json());

// Ruta GET /health: responde el estado de la API
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' }); // Codigo 200 y JSON de estado
});

// Ruta GET /users: devuelve una lista fija de usuarios
app.get('/users', (req, res) => {
  res.status(200).json([ // Codigo 200 y arreglo JSON
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ]);
});

// Exporta la app para server.js y las pruebas
module.exports = app;
}

