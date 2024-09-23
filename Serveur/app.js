const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const carRoutes = require('./routes/carRoutes');
const authRoutes = require('./routes/authRoutes');  

const app = express();
const PORT = 3000;
const DB_URI = 'mongodb://127.0.0.1:27017/Voiture';

app.use(express.json());
app.use(cors());  // Permettre au frontend de communiquer avec le backend

// Connexion à MongoDB
mongoose.connect(DB_URI, {
  
})
  .then(() => console.log('MongoDB connecté'))
  .catch((err) => console.error('Erreur de connexion MongoDB:', err));

// Utilisation des routes
app.use('/api/cars', carRoutes);  // Routes des voitures et réservations
app.use('/api/auth', authRoutes);  // Routes d'authentification

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
