<template>
    <div class="z-btn">yes</div>
</template>

<script>
import { Prop, Vue } from 'vue-property-decorator'
import Component, { mixins } from 'vue-class-component'

@Component
export default class ZBtn extends mixins() {}
</script>

<style lang="sass">
    .z-btn
</style>