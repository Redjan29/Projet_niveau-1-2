<template>
  <div class="register">
    <h2>Inscription</h2>
    <form @submit.prevent="register">
      <label for="email">Email</label>
      <input type="email" v-model="email" required />

      <label for="password">Mot de passe</label>
      <input type="password" v-model="password" required />

      <label for="confirmPassword">Confirmer le mot de passe</label>
      <input type="password" v-model="confirmPassword" required />

      <button type="submit">S'inscrire</button>

      <p v-if="errorMessage">{{ errorMessage }}</p>
      <p v-if="successMessage">{{ successMessage }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      errorMessage: '',
      successMessage: ''
    };
  },
  methods: {
    async register() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Les mots de passe ne correspondent pas';
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        });

        if (!response.ok) {
          const result = await response.json();
          this.errorMessage = result.message;  // Afficher l'erreur reçue
        } else {
          this.successMessage = 'Inscription réussie. Vous pouvez maintenant vous connecter.';
          this.email = '';
          this.password = '';
          this.confirmPassword = '';
        }
      } catch (error) {
        this.errorMessage = 'Erreur lors de l\'inscription';
      }
    }
  }
};
</script>

<style scoped>
.register {
  background-color: #e6ffe6; /* Fond vert clair */
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  margin: 50px auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.register h2 {
  color: #006600; /* Titre vert foncé */
  text-align: center;
  margin-bottom: 20px;
}

.register label {
  display: block;
  margin: 10px 0 5px;
  color: #006600; /* Couleur des labels */
}

.register input {
  border: 2px solid #33cc33; /* Bordure verte pour les champs */
  padding: 10px;
  width: 100%;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 10px;
}

.register button {
  background-color: #33cc33; /* Bouton vert */
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  width: 100%;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.register button:hover {
  background-color: #28a745; /* Vert plus foncé au survol */
}

.register p {
  text-align: center;
  color: red; /* Texte rouge pour les erreurs */
}

.register p.success {
  color: green; /* Texte vert pour succès */
}
</style>
