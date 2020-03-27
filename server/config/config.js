//===================
// Puerto
//===================
process.env.PORT = process.env.PORT || 3000;

//===================
// Entorno
//===================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//===================
// Bade de Datos
//===================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
  urlDB = 'mongodb://localhost:27017/cafe';
} else {
  urlDB = 'mongodb+srv://admin:VypNtZ0qe87FVNnE@cluster0-pypvf.mongodb.net/cafe';
}
process.env.URLDB = urlDB;
