import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../views/MainPage.vue';
import FlowerPage from '../views/FlowerPage.vue';
import Flower from '../views/Flower.vue';

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
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
