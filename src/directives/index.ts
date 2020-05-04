import ripple from './ripple'
import particle from './particle'
interface directiveOptions {
    [key: string]: object
}
const directives: directiveOptions = {
    ripple,
    particle
}

const install = function(Vue: any): void {
    Object.keys(directives).forEach(key => {
        Vue.directive(key, directives[key])
    })
}

export default {
    install
}
