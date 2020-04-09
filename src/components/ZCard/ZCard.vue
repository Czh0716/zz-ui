<script lang="tsx">
import { Prop, Vue } from 'vue-property-decorator'
import Component, { mixins } from 'vue-class-component'
import { VNode, VNodeData } from 'vue/types/vnode'

import measurable from '@/mixins/measurable'
import colorable from '@/mixins/colorable'

@Component
export default class ZCard extends mixins(measurable, colorable) {
    @Prop(Boolean) corner!: boolean

    genCorner(): VNode {
        return (
            <span class="corner" {...this.setTextColor()}>
                <span
                    {...this.setBackgroundColor({
                        style: {
                            opacity: this.color ? 0.15 : 1
                        }
                    })}
                    class="bg"
                ></span>
            </span>
        )
    }

    get classes(): object {
        return {
            'z-card': true,
            'z-card--corner': this.corner
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

        return (
            <div {...this.setBackgroundColor(data)}>
                {this.corner && this.genCorner()}
                {this.$slots.default}
            </div>
        )
    }
}
</script>

<style lang="scss">
@import '@/styles/main.sass';

.z-card {
    position: relative;
    border-radius: 4px;
    @include elevation(2);
    overflow: hidden;
}

.z-card--text,
.z-card--title,
.z-card--action {
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

.z-card--corner {
    .corner {
        width: 40px;
        height: 40px;
        position: absolute;
        right: 0;
        border-bottom-left-radius: 4px;
        box-shadow: 0 0 16px rgba(0, 0, 0, 0.2);
        background-color: #fff;
        color: white;
        .bg {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: #f8f8f8;
        }
        &::before {
            content: '';
            position: absolute;
            z-index: 1;
            left: 0;
            top: 0;
            width: 0;
            height: 0;
            border: 20px solid transparent;
            border-left-color: currentColor;
            border-bottom-color: currentColor;
            border-bottom-left-radius: 4px;
        }
    }
}

.z-card--action {
    .z-btn + .z-btn {
        margin-left: 16px;
    }
}
</style>