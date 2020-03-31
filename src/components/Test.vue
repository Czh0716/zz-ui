<script lang="tsx">
import { Prop, Vue } from 'vue-property-decorator'
import Component, { mixins } from 'vue-class-component'

@Component
export default class Test extends Vue {
    attrs = {
        staticClass: 'qqq',
        class: {
            asd: true
        },
        style: {
            height: '10px'
        }
    }

    render() {
        const Tag = 'div'
        return <Tag {...this.attrs}>asd</Tag>
    }
}
</script>

<style lang="scss">
.test {
}
</style>