import ZBtn from './ZBtn/index.vue';
const components = [
    ZBtn
]

const install = function(Vue : any) {
    components.forEach((component) => {
        Vue.component(component.name, component)
    })
}

export default {
    install
}