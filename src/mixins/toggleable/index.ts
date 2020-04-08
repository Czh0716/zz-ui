import { Vue, Model } from 'vue-property-decorator'
import Component, { mixins } from 'vue-class-component'

import bootable from '@/mixins/bootable'

export function factory(prop = 'value', event = 'input') {
    @Component({
        watch: {
            [prop](val: any) {
                this.isActive = !!this[prop]
            },
            isActive(val: any) {
                val !== this[prop] && this.$emit(event, val)
            }
        }
    })
    class toggleable extends mixins(bootable) {
        @Model(event) [prop]!: any

        isActive: boolean = !!this[prop]
    }

    return toggleable
}

export default factory()
