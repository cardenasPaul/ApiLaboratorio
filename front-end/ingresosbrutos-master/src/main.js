/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
// Importamos VueRouter
import VueRouter from 'vue-router';
// Importacion de componentes propios
import inicio from './components/Inicio'
import listarIIBB from './components/ListarIIBB'


// Creamos nuestros componentes
Vue.component('inicio-item', inicio);
Vue.component('listarIIBB-item', listarIIBB);



// uso de vue-router
Vue.use(VueRouter);

// definimos las rutas
const routes = [
  {path:'/', component:inicio},
  {path:'/inicio', component:inicio},
  {path:'/listarIIBB/:id/:cuit', component:listarIIBB, name:'listarIIBB', props: true}
]

//creamos el objeto router para usarlo en Vue
const router =  new VueRouter({
  routes,
  mode:'history'
})

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
