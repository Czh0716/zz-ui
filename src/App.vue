<template>
    <div id="app">
        <z-progress-linear color="blue" loading></z-progress-linear>
        <img alt="Vue logo" src="./assets/logo.png" />
        <div class="test"></div>
        <z-progress-circular color="pink" loading></z-progress-circular>

        <div class="wrap" id="wrap">
            <z-dialog persistent max-width="400px">
                <template #activator="{on}">
                    <z-btn color="purple white--text" @click="on">HELLO WORLD</z-btn>
                </template>

                <template #default="{on}">
                    <z-card class="mx-auto" max-width="600" corner color="blue white--text">
                        <z-card-title>Title</z-card-title>
                        <z-card-text>asd</z-card-text>
                        <z-card-text>
                            <z-btn color="red white--text" @click="on">CLOSE</z-btn>
                        </z-card-text>
                    </z-card>
                </template>
            </z-dialog>

            <!-- <z-waterfall-container columnClass="my-column" columns="4" :mergeColumns="[[2,3]]">
                <template #column-1>
                    <div
                        style="height:200px;backgroundColor: skyblue;marginBottom:20px"
                    >custom content</div>
                </template>
                <template #column-2-3>
                    <div style="height:400px;backgroundColor: pink;marginBottom:20px">custom content</div>
                </template>
                <z-waterfall-item v-for="item in 20" :key="item">
                    <div
                        class="item"
                        :style="{height: `${Math.max(10, parseInt(Math.random()*30))*10}px`,
                backgroundColor:`#${Math.random().toString(16).slice(-6)}`}"
                    >{{item}}</div>
                </z-waterfall-item>
            </z-waterfall-container>-->
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator'

@Component
export default class App extends Vue {
    @Provide() test = 13
    loading: boolean = false
    dialog: boolean = true
    change() {
        this.loading = !this.loading
    }
}
</script>

<style lang="scss">
@use "sass:math";

.mx-auto {
    margin-left: auto;
    margin-right: auto;
}

.wrap {
    padding: 0 30px;
    text-align: left;
}

.my-column + .my-column {
    margin-left: 30px;
}
.item {
    margin-bottom: 20px;
}

#app {
    text-align: center;
}
</style>
