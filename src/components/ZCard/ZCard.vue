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

    get styles(): object {
        return {
            ...this.measurableStyles
        }
    }

    render(): VNode {
        const data: VNodeData = {
            class: this.classes,
            style: this.styles
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
    @include elevation(2);
}

.z-card--text,
.z-card--title {
    padding: 16px;
}

.z-card--title {
    font-weight: 500;
    font-size: 1.25rem;
    line-height: 2rem;
    + .z-card--text {
        padding-top: 0;
    }
}
</style>