<script setup>
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const router = useRouter();

// Fonction pour la déconnexion
function logout() {
  // Supprimer le token JWT du localStorage
  localStorage.removeItem('token');

  // Rediriger l'utilisateur vers la page de connexion
  router.push('/login');
}

// Vérifier si l'utilisateur est authentifié (token présent dans localStorage)
const isAuthenticated = computed(() => !!localStorage.getItem('token'));
</script>

<template>
  <div id="app">
    <header class="app-header">
      <div class="nav-buttons">
        <button @click="$router.push('/register')">Inscription</button>
        <button @click="$router.push('/login')">Connexion</button>
        <!-- Bouton de déconnexion visible seulement si l'utilisateur est connecté -->
        <button @click="logout" v-if="isAuthenticated">Déconnexion</button>
      </div>
      <h1>Bienvenue dans l'application</h1>
    </header>

    <main>
      <!-- Affiche le contenu de la route actuelle -->
      <router-view />
    </main>
  </div>
</template>

<style scoped>
/* Styles pour le bouton et la navigation */
body {
  font-family: Arial, sans-serif;
  background-color: #e6ffe6;
  color: #006600;
}

h1 {
  color: #009900;
}

button {
  background-color: #33cc33;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #28a745;
}

header {
  text-align: center;
  padding: 10px;
  background-color: #99ff99;
  position: relative;
}

.nav-buttons {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
}

main {
  padding: 20px;
  background-color: #f2fff2;
}
</style>
