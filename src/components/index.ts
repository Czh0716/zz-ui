import ZBtn from './ZBtn/index.vue'
import ZProgressLinear from './ZProgressLinear/index.vue'
const components = [ZBtn, ZProgressLinear]

const install = function(Vue: any) {
    components.forEach(component => {
        Vue.component(component.name, component)
    })
}

export default {
    install
}
