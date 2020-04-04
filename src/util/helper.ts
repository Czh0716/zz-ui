import Vue from 'vue'
import { VNode, VNodeData } from 'vue/types/umd'

export function convertToUnit(
    str: string | number | null | undefined,
    unit = 'px'
): string | undefined {
    if (str == null || str === '') {
        return undefined
    } else if (isNaN(+str!)) {
        return String(str)
    } else {
        return `${Number(str)}${unit}`
    }
}

export function createSimpleFunctional(
    c: string,
    name?: string,
    tag: string = 'div'
) {
    return Vue.extend({
        name:
            name ||
            c.replace(/(^\w)|-(\w)/g, $1 => $1.toUpperCase()).replace(/-/g, ''),
        functional: true,
        render(h, context): VNode {
            const data: VNodeData = context.data
            data.staticClass = `${c} ${data.staticClass || ''}`
            return h(tag, data, context.children)
        }
    })
}
