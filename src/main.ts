import Vue from 'vue'
import App from './App.vue'

import ZUI from '@/components'
Vue.use(ZUI)

import directives from '@/directives'
Vue.use(directives)
import '@/styles/main.sass'

import globalCommand from '@/util/globalCommand.tsx'
Vue.use(globalCommand as any)

Vue.config.productionTip = false

new Vue({
    render: h => h(App)
}).$mount('#app')
