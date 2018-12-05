import Vue from 'vue';
import VueFire from 'vuefire';
import firebase from 'firebase';
import ElementUI from 'element-ui';
import VueLocalStorage from 'vue-localstorage';

import App from './App.vue';
import config from './key.json';

Vue.use(ElementUI);
Vue.use(VueLocalStorage, { name: 'ls' });
Vue.use(VueFire);
firebase.initializeApp(config);

const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
