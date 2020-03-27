<script lang="ts">
import { Prop, Vue } from 'vue-property-decorator'
import Component, { mixins } from 'vue-class-component'
import { VNode } from 'vue/types/vnode'

import colorable from '@/mixins/colorable'

@Component
export default class ZBtn extends mixins(colorable) {
    @Prop({ type: String, default: 'button' }) tag!: string
    @Prop(Boolean) loading!: boolean
    @Prop(Boolean) outlined!: boolean
    @Prop(Boolean) rounded!: boolean

    click(e: MouseEvent): void {
        this.$emit('click', e)
    }

    genContent(): VNode {
        return this.$createElement(
            'span',
            {
                staticClass: 'z-btn__content'
            },
            this.$slots.default
        )
    }

    genLoading(): VNode {
        return this.$createElement(
            'span',
            {
                staticClass: 'z-btn__loading'
            },
            'loading...'
        )
    }

    get classes(): object {
        return {
            'z-btn': true,
            'z-btn--outlined': this.outlined,
            'z-btn--rounded': this.rounded
        }
    }

    get styles(): object {
        return {}
    }

    get isFlat(): boolean {
        return this.outlined
    }

    render(h: Function): VNode {
        const setColor = this.isFlat ? this.setTextColor : this.setBackgroundColor
        return h(
            this.tag,
            setColor({
                class: this.classes,
                style: this.styles,
                on: {
                    click: this.click
                }
            }),
            [this.loading ? this.genLoading() : this.genContent()]
        )
    }
}
</script>

<style lang="scss">
.z-btn {
    background-color: #f5f5f5;
    min-width: 64px;
    height: 36px;
    padding: 0 12px;
    border-radius: 4px;
    font-weight: 500;
    outline: none;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);

    &.z-btn--outlined {
        background-color: transparent !important;
        border: 1px solid currentColor;
        box-shadow: none;
    }

    &.z-btn--rounded {
        border-radius: 20px;
    }
}
</style>