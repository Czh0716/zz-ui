import Vue from 'vue'
import App from './App.vue'

import ZUI from '@/components'
Vue.use(ZUI)

import directives from '@/directives'
Vue.use(directives)
import '@/styles/main.sass'

Vue.config.productionTip = false

new Vue({
    render: h => h(App)
}).$mount('#app')
