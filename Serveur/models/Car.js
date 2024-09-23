const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true }
});

module.exports = mongoose.model('Car', CarSchema);
