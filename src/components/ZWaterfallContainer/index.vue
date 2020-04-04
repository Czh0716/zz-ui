<script lang="tsx">
import { Prop, Vue, Provide } from 'vue-property-decorator'
import Component, { mixins } from 'vue-class-component'
import { VNode, VNodeData } from 'vue/types/vnode'

interface arrangedColumnMap {
    currentHeight: number
    slotHeight?: number
    position: string
    list: VNode[]
    children?: arrangedColumnMap[]
}

function initArrangedColumns(columns: number | string, mergeColumns: any): arrangedColumnMap[] {
    const arrangedColumns: arrangedColumnMap[] = Array.from({
        length: +columns
    }).map((item, index) => {
        return { position: `column-${index + 1}`, currentHeight: 0, list: [] }
    })

    if (Array.isArray(mergeColumns)) {
        mergeColumns.forEach((range: any) => {
            const [leftRange, rightRange] = range
            const length = rightRange - leftRange + 1

            arrangedColumns.splice(leftRange - 1, length, {
                position: `column-${leftRange}-${rightRange}`,
                currentHeight: 0,
                slotHeight: 0,
                list: [],
                children: Array.from({ length }).map((item, index) => {
                    return {
                        position: `column-${leftRange + index}`,
                        currentHeight: 0,
                        list: []
                    }
                })
            })
        })
    }
    return arrangedColumns
}

@Component
export default class ZWaterfallContainer extends Vue {
    @Prop({ type: [Number, String], default: 3 }) columns!: number | string
    @Prop({ type: String, default: '' }) containerClass!: string
    @Prop({ type: String, default: '' }) columnClass!: string
    @Prop() mergeColumns!: any

    @Provide('arrangedColumns') arrangedColumns: arrangedColumnMap[] = initArrangedColumns(
        this.columns,
        this.mergeColumns
    )

    first: boolean = true

    get classes(): object {
        return {
            'z-waterfall-container': true,
            [this.containerClass]: !!this.containerClass
        }
    }

    genContent(): VNode[] | VNode | undefined {
        //判断是否插入内容， 如果this.$slots.default为undefined无内容，直接出入，如果有则判断是否已排列好，再渲染排列好的元素

        if (this.first) {
            // default为关键字，不能用于命名，所以用别名d要解构$slots
            const { default: d, ...other } = this.$slots
            // 将所有非默认插槽抽出去使用z-water-item组件进行初始渲染计算高度，slotPosition这个Prop属性与插入时的位置名称一样
            // slotPosition这个属性主要用于判断该内容是不是用于渲染插槽内容，和插槽的位置
            const slotContent = Object.keys(other).map(pos => {
                return <z-waterfall-item slotPosition={pos}>{other[pos]}</z-waterfall-item>
            })
            this.first = false
            return (
                <div>
                    {slotContent}
                    {d}
                </div>
            )
        }

        return this.arrangedColumns.map((col: any) => {
            const data: any = {
                class: {
                    'z-waterfall--column': true,
                    // 'z-waterfall--mergeColumn': col.children,
                    [this.columnClass]: !!this.columnClass
                },
                style: {}
            }
            let mergeContent: any = undefined

            // 判断该列是否含有子列，然后合并列
            if (col.children) {
                const childCols = col.children.map((child: any) => {
                    return <div {...data}>{child.list}</div>
                })
                mergeContent = <div class="z-waterfall--mergeContent">{childCols}</div>
                data.style.flex = col.children.length
            }

            return (
                <div {...data}>
                    {col.list}
                    {mergeContent}
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

.z-waterfall--mergeContent {
    display: flex;
}
</style>