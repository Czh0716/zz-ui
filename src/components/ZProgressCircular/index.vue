<script lang="tsx">
import { Prop, Vue } from 'vue-property-decorator'
import Component, { mixins } from 'vue-class-component'
import { VNode, VNodeData } from 'vue/types/vnode'

import colorable from '@/mixins/colorable'

@Component
export default class ZProgressCircular extends mixins(colorable) {
    @Prop({ type: [Number, String], default: 100 }) value!: number | string
    @Prop({ type: [Number, String], default: 4 }) width!: number | string
    @Prop({ type: [Number, String], default: 18 }) radius!: number | string
    @Prop({ type: Boolean, default: false }) loading!: boolean

    realRadius: number = 20

    get classes(): object {
        return {
            'z-progress-circular': true,
            'z-progress-circular--loading': this.loading
        }
    }

    get styles(): object {
        return {
            width: `${2 * +this.radius}px`,
            height: `${2 * +this.radius}px`
        }
    }

    genCircular(): VNode {
        const radius: number = this.realRadius
        const perimeter: number = 2 * 3.1415 * radius
        const size: number = 2 * radius + +this.width
        const data = {
            attrs: {
                r: radius,
                cx: size / 2,
                cy: size / 2
            }
        }
        const background: VNode = <circle class="background" stroke="#ddd" {...data}></circle>

        return (
            <svg
                class="z-progress-circular__content"
                fill="none"
                viewBox={`0 0 ${size} ${size}`}
                stroke-width={this.width}
            >
                {!this.loading && background}
                <circle
                    class="current"
                    stroke="currentColor"
                    fill="none"
                    stroke-dasharray={perimeter}
                    stroke-dashoffset={(perimeter * (100 - +this.value)) / 100}
                    {...data}
                ></circle>
            </svg>
        )
    }

    genInfoContent(): VNode | undefined {
        return this.$slots.default ? (
            <div class="z-progress-circular__info">{this.$slots.default}</div>
        ) : (
            undefined
        )
    }

    render(): VNode {
        const data: VNodeData = {
            class: this.classes,
            style: this.styles
        }

        return (
            <div {...this.setTextColor(data)}>
                {this.genCircular()}
                {this.genInfoContent()}
            </div>
        )
    }
}
</script>

<style lang="scss">
.z-progress-circular {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
}
.z-progress-circular__content {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
}

$perimeter: 2 * 3.1415 * 20;
.z-progress-circular--loading {
    .current {
        animation: circular-loading 1.5s linear infinite;
        transform-origin: center center;
        stroke-dasharray: $perimeter - 20 $perimeter;
        stroke-linecap: round;
    }
}

@keyframes circular-loading {
    from {
        stroke-dashoffset: $perimeter - 20;
        transform: rotate(0deg);
    }
    to {
        stroke-dashoffset: -$perimeter;
        transform: rotate(360deg);
    }
}
</style>