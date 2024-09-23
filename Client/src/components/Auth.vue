<template>
  <div class="auth">
    <h2>Connexion</h2>
    <form @submit.prevent="login">
      <label for="email">Email</label>
      <input type="email" v-model="email" required />

      <label for="password">Mot de passe</label>
      <input type="password" v-model="password" required />

      <button type="submit">Connexion</button>

      <p>Pas encore de compte ? <router-link to="/register">Inscrivez-vous ici</router-link></p>


      <p v-if="errorMessage">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        });

        if (!response.ok) {
          const result = await response.json();
          this.errorMessage = result.message;  // Afficher le message d'erreur
        } else {
          const data = await response.json();
          localStorage.setItem('token', data.token);  // Sauvegarder le token JWT
          this.$router.push('/manage-cars');  // Rediriger vers la page de gestion des voitures
        }
      } catch (error) {
        this.errorMessage = 'Erreur lors de la connexion';
      }
    }
  }
};
</script>

<style scoped>
.auth {
  background-color: #e6ffe6; /* Vert clair */
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  margin: 50px auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.auth h2 {
  color: #006600; /* Titre en vert foncé */
  text-align: center;
  margin-bottom: 20px;
}

.auth label {
  display: block;
  margin: 10px 0 5px;
  color: #006600; /* Couleur des labels */
}

.auth input {
  border: 2px solid #33cc33; /* Bordure verte pour les champs */
  padding: 10px;
  width: 100%;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 10px;
}

.auth button {
  background-color: #33cc33; /* Bouton vert */
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  width: 100%;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.auth button:hover {
  background-color: #28a745; /* Vert plus foncé au survol */
}

.auth p {
  color: red; /* Affichage des erreurs en rouge */
  text-align: center;
}
</style>
