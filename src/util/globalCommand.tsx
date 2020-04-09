import Vue from 'vue'
import ZDialog from '@/components/ZDialog/index.vue'

let dialog: any = null
let confirm: any = null

const commands: Record<string, any> = {
    dialog() {
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
    },
    confirm() {
        console.log(confirm?.isActive)
        if (confirm) return (confirm.isActive = !confirm.isActive)

        return new Promise((resolve, reject) => {
            confirm = new Vue({
                data() {
                    return {
                        isActive: true
                    }
                },
                render() {
                    return (
                        <z-dialog value={confirm.isActive} max-width="300">
                            <z-card color="white">
                                <z-card-title>Confirm Window</z-card-title>
                                <z-card-text>是否继续？</z-card-text>
                            </z-card>
                        </z-dialog>
                    )
                }
            })

            const app = document.getElementById('app') || document.body
            const container = document.createElement('div')
            app.appendChild(container)
            confirm.$mount(container)
        })
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
