<script lang="tsx">
import { Prop, Vue } from 'vue-property-decorator'
import Component, { mixins } from 'vue-class-component'
import { VNode, VNodeData } from 'vue/types/vnode'

import measurable from '@/mixins/measurable'

@Component
export default class ZCard extends mixins(measurable) {
    get classes(): object {
        return {
            'z-card': true
        }
    }

    render(): VNode {
        const data: VNodeData = {
            class: this.classes
        }

        return <div {...data}>{this.$slots.default}</div>
    }
}
</script>

<style lang="scss">
@import '@/styles/main.sass';

.z-card {
    position: relative;
    border-radius: 4px;
}
</style>