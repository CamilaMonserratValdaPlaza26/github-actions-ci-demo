// Importa la app ya configurada
const app = require('./app');

// Usa el puerto de entorno o el 3000 por defecto
const PORT = process.env.PORT || 3000;

// Inicia el servidor y muestra el puerto
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
