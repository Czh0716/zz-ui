import { Vue, Model } from 'vue-property-decorator'
import Component from 'vue-class-component'

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
    class toggleable extends Vue {
        @Model(event) [prop]!: any

        isActive: boolean = !!this[prop]
    }

    return toggleable
}

export default factory()
