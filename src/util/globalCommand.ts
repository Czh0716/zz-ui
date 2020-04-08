import Vue from 'vue'
import ZDialog from '@/components/ZDialog/index.vue'

let dialog: any = null

const commands: Record<string, any> = {
    dialog() {
        console.log(dialog?.visible)
        if (dialog) return (dialog.visible = !dialog.visible)
        dialog = new Vue({
            data() {
                return {
                    visible: true
                }
            },
            render: h =>
                h(
                    ZDialog,
                    {
                        props: {
                            value: dialog.visible
                        },
                        on: {
                            input(val: boolean) {
                                dialog.visible = val
                            }
                        }
                    },
                    [
                        h(
                            'z-card',
                            {
                                props: {
                                    color: 'yellow white--text'
                                }
                            },
                            [
                                h('z-card-title', 'This title'),
                                h('z-card-text', 'Content!')
                            ]
                        )
                    ]
                )
        })

        // dialog.isActive = true
        const app = document.getElementById('app') || document.body
        const container = document.createElement('div')
        app.appendChild(container)
        dialog.$mount(container)
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
