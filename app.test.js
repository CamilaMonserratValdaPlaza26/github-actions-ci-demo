// Supertest simula peticiones HTTP a la app
const request = require('supertest');

// Importa la app que se va a probar
const app = require('./app');

// Agrupa las pruebas de la API
describe('API Tests', () => {
  // Prueba de la ruta /health
  test('GET /health debe retornar status ok', async () => {
    const res = await request(app).get('/health'); // Llama GET /health
    expect(res.statusCode).toBe(200); // Verifica codigo 200
    expect(res.body.status).toBe('ok'); // Verifica body { status: 'ok' }
  });

  // Prueba de la ruta /users
  test('GET /users debe retornar una lista de usuarios', async () => {
    const res = await request(app).get('/users'); // Llama GET /users
    expect(res.statusCode).toBe(200); // Verifica codigo 200
    expect(Array.isArray(res.body)).toBe(true); // Verifica que sea un arreglo
    expect(res.body.length).toBe(2); // Verifica que tenga 2 usuarios
  });
});
