const jwt = require('jsonwebtoken');
const JWT_SECRET = 'votre_secret_jwt';  // Utilisez la même clé secrète que celle dans authRoutes

// Middleware pour protéger les routes
function verifyToken(req, res, next) {
  // Récupérer le token depuis les en-têtes HTTP
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Un token est requis pour accéder à cette ressource' });
  }

  try {
    // Vérifier et décoder le token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;  // Ajouter les informations de l'utilisateur au req
    next();  // Passer à la route suivante
  } catch (error) {
    return res.status(401).json({ message: 'Token invalide' });
  }
}

module.exports = verifyToken;
