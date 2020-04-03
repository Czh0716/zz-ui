<script lang="tsx">
import { Prop, Vue, Inject } from 'vue-property-decorator'
import Component, { mixins } from 'vue-class-component'
import { VNode, VNodeData } from 'vue/types/vnode'

@Component
export default class ZWaterfallItem extends Vue {
    @Inject('arrangedColumns') arrangedColumns!: any

    get classes(): object {
        return {
            'z-waterfall-item': true
        }
    }

    get shortest(): any {
        let minIdx = 0
        let minHeight = Infinity

        this.arrangedColumns.forEach((item: any, index: number) => {
            if (item.currentHeight < minHeight) {
                minIdx = index
                minHeight = item.currentHeight
            }
        })

        return this.arrangedColumns[minIdx]
    }

    mounted(): void {
        const dom: HTMLElement = this.$refs.dom as HTMLElement
        const height: number = dom.clientHeight
        const target = this.shortest

        target.list.push(this.$slots.default![0])
        target.currentHeight += height
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