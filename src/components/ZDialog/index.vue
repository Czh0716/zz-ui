<script lang="tsx">
import { Prop, Watch, Vue } from 'vue-property-decorator'
import Component, { mixins } from 'vue-class-component'
import { VNode, VNodeData } from 'vue/types/vnode'

import measurable from '@/mixins/measurable'

@Component
export default class ZDialog extends mixins(measurable) {
    @Prop() value!: any
    @Prop({ type: [String, Boolean], default: 'dialog' }) transition!: string | boolean
    @Prop({ type: Boolean, default: false }) persistent!: string | boolean

    isActive: boolean = !!this.value
    activatorNode: VNode[] | undefined = []
    shock: boolean = false

    get classes(): object {
        return {
            'z-dialog__container': true
        }
    }

    @Watch('value')
    handleOutsideChanged(val: any) {
        this.isActive = !!val
    }

    @Watch('isActive')
    handleInsideChanged() {
        if (this.isActive === this.value) return
        this.$emit('input', this.isActive)
    }

    genOverlay(): VNode {
        const data: VNodeData = {
            staticClass: 'z-overlay',
            directives: [{ name: 'show', value: this.isActive }],
            ref: 'overlay'
        }
        const overlay = <div {...data}></div>
        if (this.transition) {
            return <transition {...{ props: { name: 'overlay' } }}>{overlay}</transition>
        }
        return overlay
    }

    genActivator() {
        const nodes = this.$scopedSlots.activator?.({
            on: () => (this.isActive = !this.isActive)
        })

        this.activatorNode = nodes

        return nodes
    }

    genContent(): VNode {
        const data: VNodeData = {
            staticClass: 'z-dialog__content',
            class: {
                'z-dialog__content--shock': this.shock
            },
            style: {
                ...this.measurableStyles
            },
            ref: 'content'
        }
        const node = this.$scopedSlots.default?.({
            on: () => (this.isActive = !this.isActive)
        })

        return <div {...data}>{node}</div>
    }

    mounted() {
        const app: HTMLElement = document.getElementById('app') || document.body
        const dialog: HTMLElement = this.$el as HTMLElement

        app.insertBefore(this.$refs.overlay as Node, app.firstChild)
        if (this.activatorNode) {
            this.$nextTick(() => {
                const activatorNode = Array.isArray(this.activatorNode)
                    ? this.activatorNode
                    : [this.activatorNode]
                const target =
                    this.$el.parentNode?.firstChild === this.$el ? this.$el : this.$el.nextSibling

                activatorNode.forEach((node: any) => {
                    if (!node.elm) return
                    if (!this.$el.parentNode) return
                    this.$el.parentNode.insertBefore(node.elm, target)
                })

                app.appendChild(dialog as Node)
            })
        }
    }

    render(): VNode {
        const data: VNodeData = {
            class: this.classes,
            on: {
                click: (e: MouseEvent) => {
                    if (e.target !== e.currentTarget) return
                    if (this.persistent) {
                        !this.shock &&
                            setTimeout(() => {
                                this.shock = false
                            }, 250)

                        this.shock = true
                        return
                    }
                    this.isActive = false
                }
            },
            directives: [{ name: 'show', value: this.isActive }],
            ref: 'dialog'
        }

        const dialog = (
            <div {...data}>
                {this.genOverlay()}
                {this.genActivator()}
                {this.genContent()}
            </div>
        )

        if (this.transition) {
            const transitionData: VNodeData = {
                props: {
                    name: this.transition
                }
            }
            return <transition {...transitionData}>{dialog}</transition>
        }

        return dialog
    }
}
</script>

<style lang="scss">
.z-dialog__container,
.z-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 202;
}
.z-dialog__container {
    pointer-events: noen;
}
.z-overlay {
    background-color: rgba(0, 0, 0, 0.2);
}

.z-dialog__content {
    width: 100%;
}
.z-dialog__content--shock {
    animation: shock 0.25s;
    @keyframes shock {
        0%,
        100% {
            transform: scale(1);
        }

        50% {
            transform: scale(1.1);
        }
    }
}
</style>