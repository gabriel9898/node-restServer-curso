//===================
// Puerto
//===================
process.env.PORT = process.env.PORT || 3000;

//===================
// Entorno
//===================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//===================
// Vencimiento del Token
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias
//===================
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;
//===================
// SEED de Autenticacion
//===================
// se configura una variable de entorno en heroku
process.env.SEED = process.env.SEED || 'este-es-es-seed-desarrollo';
//===================
// Bade de Datos
//===================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
  urlDB = 'mongodb://localhost:27017/cafe';
} else {
  urlDB = process.env.MONGO_URL;
}
process.env.URLDB = urlDB;

//===================
// Google Client ID
//===================
process.env.CLIENT_ID =
  process.env.CLIENT_ID ||
  '957416730242-10l2tjl1vbtv8e3d6df5ke5dckadok42.apps.googleusercontent.com';
