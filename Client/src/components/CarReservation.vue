<template>
  <div class="car-reservation">
    <h2>Réservation de Voiture</h2>
    <form @submit.prevent="reserveCar">
      <label for="carId">ID de la voiture</label>
      <input type="text" v-model="carId" required />

      <label for="userId">ID de l'utilisateur</label>
      <input type="text" v-model="userId" required />

      <label for="startDate">Date de début</label>
      <input type="date" v-model="startDate" required @change="calculatePrice" />

      <label for="endDate">Date de fin</label>
      <input type="date" v-model="endDate" required @change="calculatePrice" />

      <div v-if="totalPrice">
        <p>Prix total : {{ totalPrice }} €</p>
      </div>

      <button type="submit">Réserver</button>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carId: '',
      userId: '',
      startDate: '',
      endDate: '',
      totalPrice: 0,
      errorMessage: '',
      successMessage: ''
    };
  },
  methods: {
    // Calculer le prix en fonction des dates sélectionnées
    calculatePrice() {
      if (this.startDate && this.endDate) {
        const start = new Date(this.startDate);
        const end = new Date(this.endDate);
        
        // Vérifier que la date de fin est après la date de début
        if (end > start) {
          const durationInDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)); // Calcul du nombre de jours
          const PRICE_PER_DAY = 100;  // Exemple de prix par jour
          this.totalPrice = durationInDays * PRICE_PER_DAY;
        } else {
          this.errorMessage = "La date de fin doit être après la date de début.";
          this.totalPrice = 0;
        }
      }
    },
    async reserveCar() {
      if (this.totalPrice === 0) {
        this.errorMessage = "Veuillez entrer des dates valides.";
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/api/cars/reserve', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            carId: this.carId,
            userId: this.userId,
            startDate: this.startDate,
            endDate: this.endDate
          })
        });

        const result = await response.json();

        if (!response.ok) {
          this.errorMessage = result.message;
        } else {
          this.successMessage = 'Réservation réussie ! Le prix total est de ' + result.totalPrice + ' €';
          this.errorMessage = '';
          this.carId = '';
          this.userId = '';
          this.startDate = '';
          this.endDate = '';
          this.totalPrice = 0;
        }
      } catch (error) {
        this.errorMessage = 'Erreur lors de la réservation.';
      }
    }
  }
};
</script>

<style scoped>
.car-reservation {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  margin: 50px auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.car-reservation h2 {
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

.car-reservation label {
  display: block;
  margin: 10px 0 5px;
}

.car-reservation input {
  border: 2px solid #ccc;
  padding: 10px;
  width: 100%;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 10px;
}

.car-reservation button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  width: 100%;
  border-radius: 4px;
}

.car-reservation button:hover {
  background-color: #218838;
}

.error {
  color: red;
  text-align: center;
}

.success {
  color: green;
  text-align: center;
}
</style>
