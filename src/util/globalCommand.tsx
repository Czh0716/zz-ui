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
    confirm(
        options: any = {
            title: 'Confirm Window',
            content: '请确定是否继续？',
            hiddenOperation: false,
            confirmText: '确定',
            cancelText: '取消'
        }
    ) {
        if (confirm) {
            confirm.isActive = !confirm.isActive
        } else {
            confirm = new Vue({
                methods: {
                    confirm() {
                        this.closeDialog()
                        ;(this as any).options.confirmCallback()
                    },
                    cancel() {
                        this.closeDialog()
                        ;(this as any).options.cancelCallback()
                    },
                    closeDialog() {
                        this.isActive = false
                    }
                },
                data() {
                    return {
                        isActive: true,
                        options: {}
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
                    const { title, content, confirmText, cancelText } = this
                        .options as any
                    return (
                        <z-dialog {...dialogData}>
                            <z-card color="white">
                                <z-card-title>{title}</z-card-title>
                                <z-card-text>{content}</z-card-text>
                                <z-card-action>
                                    <z-btn
                                        color="green white--text"
                                        on={{ click: this.confirm }}
                                    >
                                        {confirmText}
                                    </z-btn>
                                    <z-btn
                                        color="red white--text"
                                        on={{ click: this.cancel }}
                                    >
                                        {cancelText}
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

        confirm.options = options

        return new Promise(resolve => {
            confirm.options.confirmCallback = function() {
                options.confirmCallback?.()
                resolve()
            }

            confirm.options.cancelCallback = function() {
                options.cancelCallback?.()
            }
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
