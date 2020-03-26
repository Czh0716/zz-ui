<template>
    <div class="color-test">
        <div class="wrap">
            <div class="list" v-for="item in tests" :key="item">
                <div class="item" :class="`${item}`"></div>
                <div
                    class="item"
                    v-for="n in 5"
                    :key="n"
                    :class="{[item]: true, [`lighten-${n}`]: true}"
                ></div>
                <div
                    class="item"
                    v-for="n in 5"
                    :key="n"
                    :class="{[item]: true, [`darken-${n}`]: true}"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
import { Prop, Vue } from 'vue-property-decorator'
import Component, { mixins } from 'vue-class-component'

@Component
export default class ColorTest extends Vue {
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
    .color-test
        .wrap 
            display: flex
            flex-wrap: wrap
        .list
            width: 20%
        .item 
            height: 30px

</style>