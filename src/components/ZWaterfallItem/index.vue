<script lang="tsx">
import { Prop, Vue, Inject } from 'vue-property-decorator'
import Component, { mixins } from 'vue-class-component'
import { VNode } from 'vue/types/vnode'

@Component
export default class ZWaterfallItem extends Vue {
    @Inject('arrangedVNodes') arrangedVNodes!: VNode[]

    mounted(): void {
        const dom: HTMLElement = this.$refs.dom as HTMLElement
        dom.clientHeight
    }
    render() {
        console.log(this.arrangedVNodes)
        return <div ref="dom">{this.$slots.default}</div>
    }
}
</script>

<style lang="scss">
</style>