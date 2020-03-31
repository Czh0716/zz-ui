const componentsFiles: any = require.context('./', true, /\.vue$/)
const components = componentsFiles
    .keys()
    .reduce((acc: any, componentPath: any) => {
        const componentName = componentPath.replace(
            /^\.\/(.*)\/index.vue$/,
            '$1'
        )
        acc[componentName] = componentsFiles(componentPath).default
        return acc
    }, {})

const install = function(Vue: any) {
    Object.keys(components).forEach((component: any) => {
        Vue.component(component, components[component])
    })
}

export default {
    install
}
