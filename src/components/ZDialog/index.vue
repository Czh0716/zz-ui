<script lang="tsx">
import { Prop, Watch, Vue } from 'vue-property-decorator'
import Component, { mixins } from 'vue-class-component'
import { VNode, VNodeData } from 'vue/types/vnode'

@Component
export default class ZDialog extends Vue {
    @Prop() value!: any
    @Prop({ type: [String, Boolean], default: 'dialog' }) transition!: string | boolean

    isActive = !!this.value
    activatorNode: VNode[] | undefined = []

    get classes(): object {
        return {
            'z-dialog__container': true
        }
    }

    @Watch('value')
    handleVisibilityChanged(val: any) {
        this.isActive = !!val
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
        const nodes =
            this.$scopedSlots.activator &&
            this.$scopedSlots.activator({
                on: () => (this.isActive = !this.isActive)
            })

        this.activatorNode = nodes

        return nodes
    }

    genContent(): VNode {
        const data: VNodeData = {
            staticClass: 'z-dialog__content',
            ref: 'content'
        }
        const node =
            this.$scopedSlots.default &&
            this.$scopedSlots.default({
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
.z-overlay {
    background-color: rgba(0, 0, 0, 0.2);
}

.z-dialog__content {
    width: 100%;
}
</style>