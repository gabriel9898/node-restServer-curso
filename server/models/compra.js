const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let categoriaSchema = new Schema({
  objeto: { type: Object }
});

module.exports = mongoose.model('Compra', categoriaSchema);
