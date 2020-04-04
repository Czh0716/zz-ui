const componentsFiles: any = require.context(
    './',
    true,
    /\w+\/index\.(vue|ts)$/
)
console.log(componentsFiles.keys())
const components = componentsFiles
    .keys()
    .reduce((acc: any, componentPath: any) => {
        const componentName = componentPath.replace(
            /^\.\/(.*)\/index\.(vue|ts)$/,
            '$1'
        )
        const files = componentsFiles(componentPath).default
        if (typeof files === 'object') {
            acc = { ...acc, ...files }
        } else {
            acc[componentName] = files
        }

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
