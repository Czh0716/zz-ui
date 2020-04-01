<script lang="tsx">
import { Prop, Vue, Provide } from 'vue-property-decorator'
import Component, { mixins } from 'vue-class-component'
import { VNode, VNodeData } from 'vue/types/vnode'

@Component
export default class ZWaterfallList extends Vue {
    @Provide('arrangedVNodes') arrangedVNodes: VNode[] = []

    get classes(): object {
        return {
            'z-waterfall-list': true
        }
    }

    genContent(): VNode[] | undefined {
        //判断是否插入内容， 如果this.$slots.default为undefined无内容，直接出入，如果有则判断是否已排列好，再渲染排列好的元素
        if (!this.$slots.default || this.arrangedVNodes.length !== this.$slots.default!.length) {
            return this.$slots.default
        }
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
</style>