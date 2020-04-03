<template>
    <div id="app">
        <z-progress-linear color="blue" loading></z-progress-linear>
        <img alt="Vue logo" src="./assets/logo.png" />
        <z-btn color="purple white--text">HELLO WORLD</z-btn>
        <div class="test"></div>
        <z-progress-circular color="pink" loading></z-progress-circular>
        <div class="wrap">
            <z-waterfall-container columnClass="my-column" columns="4">
                <template #column-1>
                    <div>custom content</div>
                </template>
                <template #column-2>
                    <div>custom content</div>
                </template>
                <z-waterfall-item v-for="item in 20" :key="item">
                    <div
                        class="item"
                        :style="{height: `${Math.max(10, parseInt(Math.random()*30))*10}px`,
                backgroundColor:`#${Math.random().toString(16).slice(-6)}`}"
                    >{{item}}</div>
                </z-waterfall-item>
            </z-waterfall-container>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator'

@Component
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
@use "sass:math";

.wrap {
    padding: 0 30px;
}

.my-column + .my-column {
    margin-left: 30px;
}
.item {
    margin-bottom: 20px;
}

#app {
    text-align: center;
    .test {
        position: relative;
        width: 600px;
        height: 160px;
        margin: 0 auto;
        border-radius: 4px;
        overflow: hidden;
    }
}
</style>
