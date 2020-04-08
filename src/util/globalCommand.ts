import Vue from 'vue'
import ZDialog from '@/components/ZDialog/index.vue'

const commands: Record<string, any> = {
    dialog() {
        const dialog = new Vue({
            render: h => h(ZDialog)
        })
        const app = document.getElementById('test') || document.body
        console.log(app)
        dialog.$mount(app)
    }
}

const install = function(Vue: Vue) {
    for (const key in commands) {
        if (commands.hasOwnProperty(key)) {
            ;(Vue as any).prototype[`$${key}`] = commands[key]
        }
    }
}

export default {
    install,
    ...commands
}
