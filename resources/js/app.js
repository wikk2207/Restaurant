/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import 'bootstrap';
import Vue from 'vue'
import Vuetify from 'vuetify';
import vuetifyPL from 'vuetify/lib/locale/pl';
import vuetifyEn from 'vuetify/lib/locale/en';
import 'vuetify/dist/vuetify.min.css'
import Toasted from 'vue-toasted';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'

require('./bootstrap');

window.Vue = require('vue');


const opts = {
    iconfont: 'md, mdi',
    breakpoint: {
        thresholds: {
            xs: 360,
            sm: 500,
            md: 839,
            lg: 1024,
            xl: 1199,
        },
        scrollbarWidth: 10,
    },
    theme: {
        light: true,
        themes: {
            light: {
                primary: '#00311D',
                accent: '#FF4081',
                secondary: '#DEBFA1',
                success: '#4CAF50',
                info: '#2196F3',
                warning: '#FB8C00',
                error: '#FF5252'
            },
        }
    },
    lang: {
        locales: {vuetifyPL, vuetifyEn},
        current: 'vuetifyPL',
    },
};

Vue.use(Vuetify,{
    iconfont: 'md, mdi',
});
const Options = {
    position: 'top-center',
};
Vue.use(Toasted, Options);


/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('chat', require('./components/chat.vue').default);
Vue.component('homepage', require('./components/homepage.vue').default);

//PARTIALS
Vue.component('ui-header', require('./components/partials/ui-header').default);
Vue.component('ui-footer', require('./components/partials/ui-footer').default);

//AUTH
Vue.component('login-form', require('./components/auth/login-form').default);
Vue.component('reset-password-form', require('./components/auth/reset-password-form').default);
Vue.component('loginpage', require('./components/auth/loginpage').default);
Vue.component('registerpage', require('./components/auth/registerpage').default);
Vue.component('forgot-password-mail', require('./components/auth/forgot-password-mail').default);


//RESERVATION

Vue.component('user-create-reservation', require('./components/reservation/user-create-reservation').default);
Vue.component('user-index-reservation', require('./components/reservation/user-index-reservation').default);
Vue.component('user-show-reservation', require('./components/reservation/user-show-reservation').default);
Vue.component('waiter-create-reservation', require('./components/reservation/waiter-create-reservation').default);
Vue.component('waiter-index-reservation', require('./components/reservation/waiter-index-reservation').default);


//MENU

Vue.component('user-menu', require('./components/menu/user-menu').default);
Vue.component('admin-menu', require('./components/menu/admin-menu').default);
Vue.component('edit-dish', require('./components/menu/edit-dish').default);
Vue.component('create-dish', require('./components/menu/create-dish').default);

//TABLES
Vue.component('admin-tables-index', require('./components/tables/admin-tables-index').default);
Vue.component('waiter-tables-index', require('./components/tables/waiter-tables-index').default);
Vue.component('waiter-show', require('./components/tables/waiter-show').default);

//USERS
Vue.component('my-account', require('./components/users/myAccount').default);

//CONTACT
Vue.component('contact-page', require('./components/contact/contact').default);

//WORKERS
Vue.component('workers-index', require('./components/workers/workers-index').default);
Vue.component('workers-create', require('./components/workers/workers-create').default);
Vue.component('workers-edit', require('./components/workers/workers-edit').default);

//DISH CATEGORIES
Vue.component('dish-category-index', require('./components/dishCategories/dish-category-index').default);


//ORDERS
Vue.component('worker-order-index', require('./components/orders/worker-order-index').default);
Vue.component('worker-order-create', require('./components/orders/worker-order-create').default);
Vue.component('worker-order-edit', require('./components/orders/worker-order-edit').default);
Vue.component('customer-order', require('./components/orders/customer-order').default);
Vue.component('customer-my-orders', require('./components/orders/customer-my-orders').default);
Vue.component('order-show', require('./components/orders/order-show').default);

const app = new Vue({
    el: '#app',
    vuetify: new Vuetify(opts)
});


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
