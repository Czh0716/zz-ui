import ripple from './ripple'
interface directiveOptions {
    [key: string]: object
}
const directives: directiveOptions = {
    ripple
}

const install = function(Vue: any): void {
    Object.keys(directives).forEach(key => {
        Vue.directive(key, directives[key])
    })
}

export default {
    install
}
