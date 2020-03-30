import { Vue, Prop } from 'vue-property-decorator'
import Component from 'vue-class-component'
import { convertToUnit } from '@/util/helper'

@Component
export default class measurable extends Vue {
    @Prop([String, Number]) width!: string | number
    @Prop([String, Number]) height!: string | number
    @Prop([String, Number]) minWidth!: string | number
    @Prop([String, Number]) minHeight!: string | number
    @Prop([String, Number]) maxWidth!: string | number
    @Prop([String, Number]) maxHeight!: string | number

    get measurableStyles(): object {
        const styles: Record<string | number, string> = {}

        const width = convertToUnit(this.width)
        const height = convertToUnit(this.height)
        const minWidth = convertToUnit(this.minWidth)
        const minHeight = convertToUnit(this.minHeight)
        const maxWidth = convertToUnit(this.maxWidth)
        const maxHeight = convertToUnit(this.maxHeight)

        if (width) styles.width = width
        if (height) styles.height = height
        if (minWidth) styles.minWidth = minWidth
        if (minHeight) styles.minHeight = minHeight
        if (maxWidth) styles.maxWidth = maxWidth
        if (maxHeight) styles.maxHeight = maxHeight

        return styles
    }
}
