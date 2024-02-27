import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Home from '../components/HelloWorld.vue';
import Enron from '../views/EnronEmailView.vue'; //Componente con logica separada en store y view

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/enron',
        name: 'Enron',
        component: Enron
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router;