<script lang="tsx">
import { Prop, Vue } from 'vue-property-decorator'
import Component, { mixins } from 'vue-class-component'
import { VNode } from 'vue/types/vnode'

import colorable from '@/mixins/colorable'
import sizeable from '@/mixins/sizeable'
import measurable from '@/mixins/measurable'

@Component
export default class ZBtn extends mixins(colorable, sizeable, measurable) {
    @Prop({ type: String, default: 'button' }) tag!: string
    @Prop(Boolean) loading!: boolean
    @Prop(Boolean) outlined!: boolean
    @Prop(Boolean) rounded!: boolean
    @Prop(Boolean) text!: boolean
    @Prop(Boolean) threeD!: boolean
    @Prop(Boolean) disabled!: boolean

    click(e: MouseEvent): void {
        this.$emit('click', e)
    }

    genContent(): VNode[] {
        const normalContent: VNode[] = [<span class="z-btn__content">{this.$slots.default}</span>]

        const threeDContent: VNode[] = [
            <span
                {...this.setTextColor({
                    staticClass: 'z-btn--threeD__top',
                    directives: [{ name: 'ripple' }]
                })}
            >
                {this.$slots.default}
            </span>,
            <span class="z-btn--threeD__middle"></span>,
            <span class="z-btn--threeD__bottom"></span>,
            ...normalContent
        ]
        return this.threeD ? threeDContent : normalContent
    }

    genLoading(): VNode[] {
        return [<div class="z-btn__loading">loading...</div>]
    }

    get classes(): object {
        return {
            'z-btn': true,
            'z-btn--outlined': this.outlined,
            'z-btn--rounded': this.rounded,
            'z-btn--text': this.text,
            'z-btn--disabled': this.disabled,
            'z-btn--threeD': this.threeD,
            ...this.sizeableClasses
        }
    }

    get styles(): object {
        return {
            ...this.measurableStyles
        }
    }

    get isFlat(): boolean {
        return this.outlined || this.text
    }

    render(h: Function): VNode {
        const setColor = this.isFlat ? this.setTextColor : this.setBackgroundColor
        const directives = []
        if (!this.threeD) directives.push({ name: 'ripple' })
        const Tag = this.tag

        return (
            <Tag
                {...setColor({
                    class: this.classes,
                    style: this.styles,
                    on: {
                        click: this.click
                    },
                    directives
                })}
            >
                {this.loading ? this.genLoading() : this.genContent()}
            </Tag>
        )
    }
}
</script>

<style lang="scss">
@import '@/styles/main.sass';

.z-btn {
    position: relative;
    background-color: #f5f5f5;
    min-width: 64px;
    height: 36px;
    padding: 0 12px;
    border-radius: 4px;
    letter-spacing: 1.4px;
    font-weight: 500;
    font-size: 14px;
    outline: none;
    @include elevation(4);

    &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        border-radius: inherit;
        background-color: currentColor;
        opacity: 0;
        transition: 0.3s;
    }
    &:not(.z-btn--text):not(.z-btn--outlined) {
        @include elevationTransition;
        &:active {
            @include elevation(8);
        }
    }

    &.z-btn--disabled {
        pointer-events: none;
        background-color: rgba(0, 0, 0, 0.12) !important;
        color: rgba(0, 0, 0, 0.26) !important;
    }

    &.z-size--large {
        font-size: 16px;
        height: 44px;
        min-width: 96px;
        padding: 0 18px;
    }

    &.z-size--small,
    &.z-size--mini {
        font-size: 12px;
    }

    &.z-size--small {
        height: 28px;
    }

    &.z-size--mini {
        height: 24px;
        padding: 0 8px;
    }
}

.z-btn--outlined,
.z-btn--text {
    background-color: transparent !important;
    box-shadow: none;
    &:hover:before {
        opacity: 0.1;
    }
}

.z-btn--outlined {
    border: 1px solid currentColor;
}

.z-btn--rounded {
    border-radius: 20px;
}

.z-btn--threeD {
    box-shadow: none !important;
    border-radius: 6px !important;

    .z-btn--threeD__top,
    .z-btn--threeD__middle {
        border: 2px solid rgb(147, 66, 66);
    }
    .z-btn--threeD__top,
    .z-btn--threeD__middle,
    .z-btn--threeD__bottom {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        border-radius: inherit;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.4s;
    }
    .z-btn--threeD__top {
        transform: translateY(-8px);
        background-color: #fff;
        z-index: 1;
        &::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: currentColor;
            opacity: 0.08;
            transition: 0.3s;
        }
    }
    .z-btn--threeD__bottom {
        z-index: -1;
        transform: translateY(8px);
        background-color: inherit;
        opacity: 0.15;
    }
    .z-btn__content {
        visibility: hidden;
    }

    &:hover {
        .z-btn--threeD__top {
            transform: translateY(-6px);
            &::before {
                opacity: 0.3;
            }
        }
        .z-btn--threeD__bottom {
            transform: translateY(6px);
        }
    }

    &:active {
        .z-btn--threeD__top,
        .z-btn--threeD__bottom {
            transform: translateY(0);
        }
    }
}
</style>