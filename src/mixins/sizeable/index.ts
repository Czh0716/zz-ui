import { Vue, Prop } from 'vue-property-decorator'
import Component from 'vue-class-component'

@Component
export default class sizeable extends Vue {
    @Prop({ type: String, default: 'normal' }) size!: string

    get sizeableClasses(): object {
        return {
            [`z-size--${this.size}`]: true
        }
    }
}
