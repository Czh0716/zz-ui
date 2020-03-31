import { Vue, Prop } from 'vue-property-decorator'
import Component from 'vue-class-component'
import { VNodeData } from 'vue/types/vnode'
function isCssColor(color: string): boolean {
    return !!color && !!color.match(/^(#|var\(--|(rgb|hsl)a?\()/)
}
@Component
export default class colorable extends Vue {
    @Prop(String) color!: string

    setBackgroundColor(data: VNodeData = {}): VNodeData {
        const color: string = this.color
        if (isCssColor(color)) {
            data.style = {
                ...(data.style as object),
                'background-color': color,
                'border-color': color
            }
        } else {
            data.class = {
                ...data.class,
                [color]: true
            }
        }
        return data
    }

    setTextColor(data: VNodeData = {}): VNodeData {
        const color: string = this.color
        if (isCssColor(color)) {
            data.style = {
                ...(data.style as object),
                color: color,
                'caret-color': color
            }
        } else {
            const [colorName, colorModifier] = color.trim().split(' ', 2)
            data.class = {
                ...data.class,
                [`${colorName}--text`]: true
            }
            if (colorModifier) {
                data.class[colorModifier] = true
            }
        }
        return data
    }
}
