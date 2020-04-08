import { Vue, Model } from 'vue-property-decorator'
import Component, { mixins } from 'vue-class-component'

import bootable from '@/mixins/bootable'

export function factory(prop: 'value' = 'value', event = 'input') {
    @Component({
        watch: {
            [prop](val: any) {
                ;(this as any).isActive = !!(this as any)[prop]
            },
            isActive(val: any) {
                val !== (this as any)[prop] && this.$emit(event, val)
            }
        }
    })
    class toggleable extends mixins(bootable) {
        @Model(event) [prop]!: any

        isActive: boolean = !!(this as any)[prop]
    }

    return toggleable
}

export default factory()
