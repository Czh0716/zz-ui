<template>
    <div id="app">
        <z-progress-linear color="blue" loading></z-progress-linear>
        <img alt="Vue logo" src="./assets/logo.png" />
        <z-btn threeD color="purple white--text">HELLO WORLD</z-btn>
        <div class="test" v-ripple="{color: 'yellow'}"></div>
        <test></test>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator'
import Test from './components/Test.vue'

@Component({
    components: {
        Test
    }
})
export default class App extends Vue {
    @Provide() test = 13
    loading: boolean = false
    change() {
        this.loading = !this.loading
    }
    haha() {}
}
</script>

<style lang="scss">
#app {
    text-align: center;
    .test {
        width: 600px;
        height: 160px;
        background-color: pink;
    }
}
</style>
