import { Vue } from 'vue-property-decorator'
import Component from 'vue-class-component'
import { VNode } from 'vue/types/umd'

interface Toggleable extends Vue {
    isActive?: boolean
}

@Component({
    watch: {
        isActive(val: any) {
            ;(this as any).isBooted = true
        }
    }
})
export default class bootable extends Vue {
    isBooted: boolean = false

    get contentLoaded(): boolean {
        return this.isBooted || (this as any).isActive
    }

    lazyContent(content: VNode | VNode[]): VNode | VNode[] | undefined {
        return this.contentLoaded ? content : undefined
    }
}
