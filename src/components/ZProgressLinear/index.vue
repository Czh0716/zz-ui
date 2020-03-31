<script lang="tsx">
import { Vue, Prop } from 'vue-property-decorator'
import Component, { mixins } from 'vue-class-component'
import { VNode } from 'vue/types/vnode'

import colorable from '@/mixins/colorable'
import sizeable from '@/mixins/sizeable'
import measurable from '@/mixins/measurable'

@Component
export default class zProgressLinear extends mixins(colorable, measurable) {
    @Prop({ type: [Number, String], default: 100 }) value!: number | string
    @Prop(Boolean) loading!: boolean
    @Prop(Boolean) rounded!: boolean

    genContent(): VNode[] {
        const data = this.setBackgroundColor()
        const background: VNode = <div class="z-progress-linear__background" {...data}></div>
        const loadingChildren: VNode[] = [
            <div class="long" {...data}></div>,
            <div class="short" {...data}></div>
        ]
        const current: VNode = (
            <div class="z-progress-linear__current" style={{ width: `${this.value}%` }}>
                {this.loading && loadingChildren}
            </div>
        )

        return [background, current]
    }

    get classes(): object {
        return {
            'z-progress-linear': true,
            'z-progress-linear--rounded': true,
            'z-progress-linear__loading': this.loading
        }
    }

    get styles(): object {
        return {
            height: '4px',
            ...this.measurableStyles
        }
    }

    render(): VNode {
        const data = {
            class: this.classes,
            style: this.styles
        }

        return <div {...data}>{...this.genContent()}</div>
    }
}
</script>

<style lang="scss">
.z-progress-linear {
    position: relative;
    overflow: hidden;
}
.z-progress-linear__background {
    width: 100%;
    height: 100%;
    opacity: 0.3;
}

.z-progress-linear__current {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    border-radius: inherit;
}

.z-progress-linear--rounded {
    border-radius: 4px;
}

.z-progress-linear__loading .z-progress-linear__current {
    background-color: transparent !important;
    .long,
    .short {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        transform: translate(-100%);
        animation: loading 3s infinite;
        transform-origin: right center;
        border-radius: inherit;
    }

    .long {
        width: 130%;
        animation-delay: 1.5s;
    }
}

@keyframes loading {
    50%,
    100% {
        transform: translate(10%) scaleX(0.1);
    }
}
</style>