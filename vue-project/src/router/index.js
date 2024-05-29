import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../views/MainPage.vue';
import FlowerPage from '../views/FlowerPage.vue';
import Flower from '../views/Flower.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

const routes = [
    {
        path: '/',
        name: 'MainPage',
        component: MainPage,
        meta: { showNavbar: true },
    },
    {
        path: '/FlowerPage',
        name: 'FlowerPage',
        component: FlowerPage,
        meta: { showNavbar: true },

    },
    {
        path: '/FlowerPage/Flower',
        name: 'Flower',
        component: Flower,
        props: true,
        meta: { showNavbar: false },
    },
    {
        path: '/Login',
        name: 'Login',
        component: Login,
        meta: { showNavbar: true }
    },
    {
        path: '/Register',
        name: 'Register',
        component: Register,
        meta: { showNavbar: true }
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
