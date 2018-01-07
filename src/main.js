import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App.vue'
import Process from './pages/Process.vue'
import Stakeholder from './pages/Stakeholder.vue'
import Location from './pages/Location.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import VueRouter from 'vue-router'

Vue.use( VueRouter );
Vue.use( BootstrapVue );

// Create the router instance and pass the `routes` option
const AppName = 'PBO Beleg';
const router = new VueRouter( {
    routes: [
        { path: '/', component: Process, meta: { title: 'Process' } },
        { path: '/stakeholders', component: Stakeholder, meta: { title: 'Stakeholders' } },
        { path: '/locations', component: Location, meta: { title: 'Locations' } }
    ]
} );

router.beforeEach( ( to, from, next ) => {
    document.title = to.meta.title + ' - ' + AppName;
    next()
} );

let Application = new Vue( {
    el: '#app',
    router: router,
    render: h => h( App )
} );
