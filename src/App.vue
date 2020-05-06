<template>
    <div id="app">
        <z-progress-linear color="blue" loading></z-progress-linear>
        <z-progress-circular color="pink" loading></z-progress-circular>
        <z-btn @click="particle = !particle">Test</z-btn>
        <div style="padding: 10px;width:600px" v-particle="particle">
            <h4 style="color: #000; ">Hello world!</h4>
            <p
                style="color:skyblue"
            >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut, non.</p>
            <p
                style="color:hotpink"
            >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo corporis, eos enim provident consectetur laboriosam beatae, eaque illum in maiores quo ullam commodi assumenda voluptatem qui similique doloremque dolorum eius?</p>
            <img class="logo" width="200" src="./assets/logo.png" />
        </div>
        <div class="wrap" id="wrap">
            <z-dialog v-model="dialog" persistent max-width="400px">
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
import html2canvas from 'html2canvas'
@Component
export default class App extends Vue {
    @Provide() test = 13
    loading: boolean = false
    dialog: boolean = false
    particle: boolean = true
    async change() {
        await (this as any).$confirm()
    }
}
</script>

<style lang="scss">
@use "sass:math";

.test {
    width: 200px;
    height: 200px;
    cursor: pointer;
    margin: auto;
    background: url('https://images.pexels.com/photos/3989821/pexels-photo-3989821.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')
        no-repeat center center/cover;
}

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

.logo {
    display: block;
    margin: auto;
}
body {
}
</style>
