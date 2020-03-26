<template>
    <div class="z-btn"></div>
</template>

<script>
import { Prop, Vue } from 'vue-property-decorator'
import Component, { mixins } from 'vue-class-component'
import colorable from '@/mixins/colorable'

@Component
export default class ZBtn extends mixins(colorable) {
    tests = [
        'red',
        'pink',
        'purple',
        'blue',
        'indigo',
        'cyan',
        'teal',
        'green',
        'yellow',
        'orange',
        'brown',
        'grey'
    ]
}
</script>

<style lang="sass">
    .z-btn

</style>