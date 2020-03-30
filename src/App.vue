<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png" />
        <z-btn :loading="loading" color="yellow white--text">HELLO WORLD</z-btn>

        <div class="wrap haha">
            <div class="content"></div>
        </div>
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
        this.loading = !this.loading
    }
    haha() {}
}
</script>

<style lang="scss">
#app {
    text-align: center;
    margin-top: 60px;
    .wrap {
        width: 100px;
        height: 100px;
        background-color: green;
        border: 1px solid transparent;
        .content {
            width: 100px;
            height: 50px;
            background-color: inherit;
            margin-top: -4px;
            filter: blur(1px);
        }
    }
}
</style>
