const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  carId: { type: String, required: true },
  userId: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  durationInDays: { type: Number, required: true },  // Durée de la réservation en jours
  totalPrice: { type: Number, required: true },  // Prix total de la réservation
  status: { type: String, default: 'Réservée' }
});

module.exports = mongoose.model('Reservation', ReservationSchema);
