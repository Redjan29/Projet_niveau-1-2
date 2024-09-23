import { createRouter, createWebHistory } from 'vue-router';
import Auth from '../components/Auth.vue';
import ManageCars from '../components/ManageCars.vue';
import Register from '../components/Register.vue';  
import CarReservation from '../components/CarReservation.vue'; 

const routes = [
  {
    path: '/login',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/manage-cars',
    name: 'ManageCars',
    component: ManageCars
  },
  {
    path: '/register',  // Route pour l'inscription
    name: 'Register',
    component: Register
  },
  {
    path: '/reserve',
    name: 'CarReservation',
    component: CarReservation
  },
];

// Crée le routeur
const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;
