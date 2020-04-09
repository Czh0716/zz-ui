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
        if (confirm) {
            confirm.isActive = !confirm.isActive
        } else {
            confirm = new Vue({
                methods: {
                    confirm() {
                        this.closeDialog()
                        ;(this as any).resolve()
                    },
                    cancel() {
                        this.closeDialog()
                    },
                    closeDialog() {
                        this.isActive = false
                    }
                },
                data() {
                    return {
                        isActive: true,
                        resolve: null,
                        reject: null
                    }
                },
                render() {
                    const dialogData = {
                        props: {
                            value: this.isActive,
                            'max-width': 300
                        },
                        on: {
                            input(val: boolean) {
                                ;(this as any).isActive = val
                            }
                        }
                    }
                    return (
                        <z-dialog {...dialogData}>
                            <z-card color="white">
                                <z-card-title>Confirm Window</z-card-title>
                                <z-card-text>是否继续？</z-card-text>
                                <z-card-action>
                                    <z-btn
                                        color="green white--text"
                                        on={{ click: this.confirm }}
                                    >
                                        确定
                                    </z-btn>
                                    <z-btn
                                        color="red white--text"
                                        on={{ click: this.cancel }}
                                    >
                                        取消
                                    </z-btn>
                                </z-card-action>
                            </z-card>
                        </z-dialog>
                    )
                }
            })

            const app = document.getElementById('app') || document.body
            const container = document.createElement('div')
            app.appendChild(container)
            confirm.$mount(container)
        }

        return new Promise((resolve, reject) => {
            confirm.resolve = resolve
            confirm.reject = reject
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
