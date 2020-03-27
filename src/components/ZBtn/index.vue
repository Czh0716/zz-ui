<template>
    <button class="z-btn">
        <slot></slot>
    </button>
</template>

<script>
import { Prop, Vue } from 'vue-property-decorator'
import Component, { mixins } from 'vue-class-component'
import colorable from '@/mixins/colorable'

@Component
export default class ZBtn extends mixins(colorable) {}
</script>

<style lang="scss">
.z-btn {
}
</style>