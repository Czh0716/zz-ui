import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class colorable extends Vue {
    read() {
        console.log('this color');
    }
}