import Vue from "vue";
import App from "./App.vue";

import ZUI from '@/components';
Vue.use(ZUI)

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
