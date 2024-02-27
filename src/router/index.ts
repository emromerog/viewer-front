import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Home from '../components/HelloWorld.vue';
//import Csv from '../components/CsvUploader.vue'; //Componente con toda la logica junta
import Csv from '../views/CsvUploaderView.vue'; //Componente con logica separada en store y view
import Enron from '../views/EnronEmailView.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/csv',
        name: 'Csv',
        component: Csv
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