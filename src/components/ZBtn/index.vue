<template>
    <div class="z-btn">yes</div>
</template>

<script>
import { Prop, Vue } from 'vue-property-decorator'
import Component, { mixins } from 'vue-class-component'
import colorable from '@/mixins/colorable'

@Component
export default class ZBtn extends mixins(colorable) {
    mounted() {
        console.log(this.color)
    }
}
</script>

<style lang="sass">
    .z-btn
</style>