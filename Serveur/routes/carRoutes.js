const express = require('express');
const router = express.Router();
const Car = require('../models/Car');  // Modèle Car
const Reservation = require('../models/Reservation');  // Modèle Reservation
const verifyToken = require('../middleware/authMiddleware');  // Middleware JWT pour sécuriser les routes

// Endpoint POST pour créer une voiture
router.post('/create', verifyToken, async (req, res) => {
  try {
    const { id, brand, model, year } = req.body;
    if (!id || !brand || !model || !year) {
      return res.status(400).json({ message: "Veuillez fournir tous les champs requis : id, brand, model, year" });
    }

    const newCar = new Car({ id, brand, model, year });
    await newCar.save();
    res.status(201).json({ message: 'Voiture créée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de voiture' });
  }
});

// Endpoint GET pour récupérer toutes les voitures (accessible sans authentification)
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des voitures' });
  }
});

// Endpoint DELETE pour supprimer une voiture (protégé par JWT)
router.delete('/delete', verifyToken, async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "L'ID de la voiture est requis pour la suppression" });
    }

    const result = await Car.deleteOne({ id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Aucune voiture trouvée avec cet ID" });
    }
    res.status(200).json({ message: "Voiture supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la voiture' });
  }
});

// Prix par jour de location
const PRICE_PER_DAY = 100;

// Endpoint POST pour réserver une voiture
router.post('/reserve', verifyToken, async (req, res) => {
  try {
    const { carId, userId, startDate, endDate } = req.body;

    // Vérification des données
    if (!carId || !userId || !startDate || !endDate) {
      return res.status(400).json({ message: "Veuillez fournir tous les champs requis : carId, userId, startDate, endDate" });
    }

    // Vérifier que la date de fin est après la date de début
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (end <= start) {
      return res.status(400).json({ message: "La date de fin ne peut pas être avant ou égale à la date de début." });
    }

    // Calculer la durée de la réservation en jours
    const durationInDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)); // Convertir en jours
    const totalPrice = durationInDays * PRICE_PER_DAY;

    // Créer la réservation
    const newReservation = new Reservation({
      carId,
      userId,
      startDate: start,
      endDate: end,
      durationInDays,
      totalPrice,  // Ajout du prix total
      status: 'Réservée'
    });

    // Enregistrer la réservation dans la collection "reservations"
    await newReservation.save();

    res.status(201).json({ message: 'Réservation effectuée avec succès', totalPrice });
  } catch (error) {
    console.error('Erreur lors de la réservation:', error);
    res.status(500).json({ message: 'Erreur lors de la réservation' });
  }
});

module.exports = router;
