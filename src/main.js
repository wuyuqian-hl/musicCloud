import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import router from './Router/router'
import axios from 'axios'
import Directive from './components/WindowHeight/directive'
Vue.use(Directive);
Vue.prototype.$http = axios;
Vue.config.productionTip = false
Vue.use(Vant);
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
