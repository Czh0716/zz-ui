<script lang="tsx">
import { Prop, Vue, Provide } from 'vue-property-decorator'
import Component, { mixins } from 'vue-class-component'
import { VNode, VNodeData } from 'vue/types/vnode'

interface arrangedColumnMap {
    currentHeight: number
    list: VNode[]
}

@Component
export default class ZWaterfallContainer extends Vue {
    @Prop({ type: [Number, String], default: 3 }) columns!: number | string
    @Prop({ type: String, default: '' }) containerClass!: string
    @Prop({ type: String, default: '' }) columnClass!: string
    @Prop() mergeColumns!: any

    @Provide('arrangedColumns') arrangedColumns: arrangedColumnMap[] = Array.from({
        length: +this.columns
    }).map(() => {
        return { currentHeight: 0, list: [] }
    })

    first: boolean = true

    get classes(): object {
        return {
            'z-waterfall-container': true,
            [this.containerClass]: !!this.containerClass
        }
    }

    genContent(): VNode[] | undefined {
        //判断是否插入内容， 如果this.$slots.default为undefined无内容，直接出入，如果有则判断是否已排列好，再渲染排列好的元素

        if (this.first) {
            this.first = false
            return this.$slots.default
        }
        console.log(this.$slots)

        return this.arrangedColumns.map((col: any, index: any) => {
            return (
                <div
                    class={{ 'z-waterfall--column': true, [this.columnClass]: !!this.columnClass }}
                >
                    {this.$slots[`column-${index + 1}`]}
                    {col.list}
                </div>
            )
        })
    }

    render(): VNode {
        const data: VNodeData = {
            class: this.classes
        }

        return <div {...data}>{this.genContent()}</div>
    }
}
</script>

<style lang="scss">
.z-waterfall-container {
    display: flex;
    align-items: flex-start;
}
.z-waterfall--column {
    display: flex;
    flex-direction: column;
    flex: 1;
}
</style>