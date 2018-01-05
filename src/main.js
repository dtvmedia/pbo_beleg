import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App.vue'
import Navbar from './components/Navbar.vue'
import Header from './components/Header.vue'
import Process from './pages/Process.vue'
import Stakeholder from './pages/Stakeholder.vue'
import Location from './pages/Location.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import VueRouter from 'vue-router'

Vue.use( VueRouter );
Vue.use( BootstrapVue );

Vue.component('app-navbar', Navbar );
Vue.component('app-header', Header );
//Vue.use( Process );
//Vue.use( Stakeholder );
//Vue.use( Location );

// 2. Define some routes
const routes = [
    { path: '/', component: Process },
    { path: '/stakeholders', component: Stakeholder },
    { path: '/locations', component: Location }
];

// 3. Create the router instance and pass the `routes` option
const router = new VueRouter( {
    routes: routes
} );

let Application = new Vue( {
    el: '#app',
    router: router,
    render: h => h( App )
} ).$mount('#app');
