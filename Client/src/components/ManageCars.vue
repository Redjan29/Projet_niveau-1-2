<template>
  <div class="manage-cars">
    <h2>Gestion des Voitures</h2>
    <form @submit.prevent="addCar">
      <label for="carId">ID de la voiture</label>
      <input type="text" v-model="carId" required />

      <label for="brand">Marque</label>
      <input type="text" v-model="brand" required />

      <label for="model">Modèle</label>
      <input type="text" v-model="model" required />

      <label for="year">Année</label>
      <input type="number" v-model="year" required />

      <button type="submit">Ajouter Voiture</button>
    </form>

    <div v-if="cars.length">
      <h3>Liste des voitures</h3>
      <ul>
        <li v-for="car in cars" :key="car.id">
          {{ car.brand }} - {{ car.model }} ({{ car.year }})
          <button @click="deleteCar(car.id)">Supprimer</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carId: '',
      brand: '',
      model: '',
      year: '',
      cars: []  // Liste des voitures récupérées de l'API
    };
  },
  methods: {
    async fetchCars() {
      const response = await fetch('http://localhost:3000/api/cars');
      this.cars = await response.json();  // Charger la liste des voitures
    },
    async addCar() {
      // Requête POST pour ajouter une voiture
      await fetch('http://localhost:3000/api/cars/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: this.carId,
          brand: this.brand,
          model: this.model,
          year: this.year
        })
      });
      this.fetchCars();  // Recharger la liste après l'ajout
    },
    async deleteCar(id) {
      // Requête DELETE pour supprimer une voiture
      await fetch('http://localhost:3000/api/cars/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      this.fetchCars();  // Recharger la liste après suppression
    }
  },
  mounted() {
    // Charger les voitures lors du montage du composant
    this.fetchCars();
  }
};
</script>

<style scoped>
.manage-cars {
  background-color: #e6ffe6; /* Fond vert clair */
  padding: 20px;
  border-radius: 10px;
  max-width: 600px;
  margin: 50px auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.manage-cars h2 {
  color: #006600; /* Titre vert foncé */
  text-align: center;
}

.manage-cars label {
  display: block;
  margin: 10px 0 5px;
  color: #006600; /* Labels en vert foncé */
}

.manage-cars input {
  border: 2px solid #33cc33; /* Bordure verte pour les champs */
  padding: 10px;
  width: 100%;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 10px;
}

.manage-cars button {
  background-color: #33cc33; /* Bouton vert */
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin: 10px 0;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.manage-cars button:hover {
  background-color: #28a745; /* Vert plus foncé au survol */
}

.manage-cars ul {
  list-style-type: none;
  padding: 0;
}

.manage-cars li {
  background-color: #f2fff2; /* Fond des éléments de liste */
  margin: 10px 0;
  padding: 10px;
  border-radius: 4px;
}

.manage-cars li button {
  background-color: #ff6666; /* Bouton rouge pour la suppression */
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
}

.manage-cars li button:hover {
  background-color: #cc0000; /* Rouge plus foncé au survol */
}
</style>
