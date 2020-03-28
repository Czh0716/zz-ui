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
    @Prop(Boolean) text!: boolean

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
            'z-btn--rounded': this.rounded,
            'z-btn--text': this.text
        }
    }

    get styles(): object {
        return {}
    }

    get isFlat(): boolean {
        return this.outlined || this.text
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
                },
                directives: [{ name: 'ripple' }]
            }),
            [this.loading ? this.genLoading() : this.genContent()]
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
    font-weight: 500;
    outline: none;
    @include elevation(4);
    @include elevationTransition;
    &:active {
        @include elevation(8);
    }
}

.z-btn--outlined,
.z-btn--text {
    background-color: transparent !important;
    box-shadow: none;
}

.z-btn--outlined {
    border: 1px solid currentColor;
}

.z-btn--rounded {
    border-radius: 20px;
}
</style>