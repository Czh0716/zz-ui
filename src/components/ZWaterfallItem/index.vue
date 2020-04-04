<script lang="tsx">
import { Prop, Vue, Inject } from 'vue-property-decorator'
import Component, { mixins } from 'vue-class-component'
import { VNode, VNodeData } from 'vue/types/vnode'

@Component
export default class ZWaterfallItem extends Vue {
    @Prop(String) slotPosition!: string

    @Inject('arrangedColumns') arrangedColumns!: any

    get classes(): object {
        return {
            'z-waterfall-item': true
        }
    }

    get shortest(): any {
        let shortest: any = { currentHeight: Infinity }

        this.arrangedColumns.forEach((item: any, index: number) => {
            if (item.currentHeight < shortest.currentHeight) {
                shortest = item
            }
        })

        return shortest
    }

    mounted(): void {
        const dom: HTMLElement = this.$refs.dom as HTMLElement
        const height: number = dom.clientHeight
        const target: any = this.shortest
        const vnode: VNode = this.$slots.default![0]

        if (this.slotPosition) {
            const slotTarget = this.arrangedColumns.find(
                (item: any) => item.position === this.slotPosition
            )
            slotTarget.currentHeight = height
            slotTarget.slotHeight = height
            slotTarget.list.push(vnode)

            return
        }

        if (target.children) {
            let minChild = target.children.reduce((acc: any, curr: any) =>
                curr.currentHeight < acc.currentHeight ? curr : acc
            )
            let maxChild = target.children.reduce((acc: any, curr: any) =>
                curr.currentHeight > acc.currentHeight ? curr : acc
            )
            minChild.currentHeight += height
            // 当前的合并列高度等于插槽高度加上最高子列高度
            target.currentHeight = maxChild.currentHeight + target.slotHeight
            minChild.list.push(vnode)
        } else {
            target.currentHeight += height
            target.list.push(vnode)
        }
    }
    render() {
        const data: VNodeData = {
            class: this.classes
        }
        return (
            <div {...data} ref="dom">
                {this.$slots.default}
            </div>
        )
    }
}
</script>

<style lang="scss">
.z-waterfall-item {
    visibility: hidden;
}
</style>