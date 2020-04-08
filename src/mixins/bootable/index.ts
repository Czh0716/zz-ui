import { Vue } from 'vue-property-decorator'
import Component from 'vue-class-component'
import { VNode } from 'vue/types/umd'
@Component({
    watch: {
        isActive(val: any) {
            this.isBooted = true
        }
    }
})
export default class bootable extends Vue {
    isBooted: boolean = false

    get contentLoaded(): boolean {
        return this.isBooted || this.isActive
    }

    lazyContent(content: VNode | VNode[]): VNode | VNode[] | undefined {
        return this.contentLoaded ? content : undefined
    }
}
