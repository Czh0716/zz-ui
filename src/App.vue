<template>
    <div id="app">
        <z-progress-linear color="blue" loading></z-progress-linear>
        <img alt="Vue logo" src="./assets/logo.png" />
        <z-btn color="purple white--text">HELLO WORLD</z-btn>
        <div class="test"></div>
        <z-progress-circular color="pink" loading></z-progress-circular>
        <div class="wrap">
            <z-waterfall-container columnClass="my-column">
                <z-waterfall-item v-for="item in 10" :key="item">
                    <div
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

#app {
    text-align: center;
    .test {
        position: relative;
        width: 600px;
        height: 160px;
        background-color: pink;
        overflow: hidden;
        &::before {
            content: '';
            position: absolute;
            width: 100% / math.cos(10deg);
            height: 100%;
            left: 0;
            top: 100%;
            transform-origin: left top;
            transform: rotate(-10deg);
            background-color: #fafafa;
        }
    }
}
</style>
