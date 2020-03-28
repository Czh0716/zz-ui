<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png" />
        <z-btn :loading="loading" color="pink" class="white--text">HELLO WORLD</z-btn>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator'
import HelloWorld from './components/HelloWorld.vue'

@Component({
    components: {
        HelloWorld
    }
})
export default class App extends Vue {
    @Provide() test = this
    loading: boolean = false
    change() {
        console.log('hah')
        this.loading = !this.loading
    }
    haha() {}
}
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
