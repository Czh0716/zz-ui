import './ripple.sass'

interface rippleOptions {
    color?: string
}

function transform(el: HTMLElement, value: string) {
    el.style['transform'] = value
    el.style['webkitTransform'] = value
}

function opacity(el: HTMLElement, value: string | number) {
    el.style['opacity'] = value as string
}

function isTouchEvent(e: MouseEvent | TouchEvent): e is TouchEvent {
    return e.constructor.name === 'TouchEvent'
}

function calculate(e: MouseEvent | TouchEvent) {
    const el: HTMLElement = e.currentTarget as HTMLElement
    const {
        top,
        left
    }: { top: number; left: number } = el.getBoundingClientRect()
    const targetEvent = isTouchEvent(e) ? e.touches[e.touches.length - 1] : e
    const x: number = targetEvent.clientX - left
    const y: number = targetEvent.clientY - top
    const width: number = el.clientWidth
    const height: number = el.clientHeight
    const radius: number = Math.sqrt(width ** 2 + height ** 2) / 2
    const centerX = radius - width / 2
    const centerY = radius - height / 2

    return { x, y, centerX, centerY, radius }
}

function rippleShow(
    rippleOptionsOrEvent: rippleOptions | MouseEvent | TouchEvent = {}
): any {
    function realFunc(e: MouseEvent | TouchEvent): void {
        const el: HTMLElement = e.currentTarget as HTMLElement

        const { x, y, radius, centerX, centerY } = calculate(e)
        const container: HTMLElement = document.createElement('span')
        const ripple: HTMLElement = document.createElement('span')
        const options: rippleOptions = rippleOptionsOrEvent as rippleOptions
        el.appendChild(container)
        container.appendChild(ripple)

        container.className = 'z-ripple__container'
        ripple.className = 'z-ripple'
        if (options.color) ripple.style.backgroundColor = options.color
        // 记录点击时的时间点，用于判断点击结束时，进入动画是否也结束再remove元素
        ripple.dataset.activated = String(performance.now())
        ripple.style.width = ripple.style.height = `${2 * radius}px`
        transform(
            ripple,
            `translate(${x - radius}px,${y - radius}px) scale(0.3)`
        )
        opacity(ripple, 0.3)

        setTimeout(() => {
            transform(ripple, `translate(${-centerX}px,${-centerY}px) scale(1)`)
        }, 0)
    }
    if ((<MouseEvent | TouchEvent>rippleOptionsOrEvent).target)
        realFunc(rippleOptionsOrEvent as MouseEvent | TouchEvent)
    else return realFunc
}

function rippleHidden(e: MouseEvent | TouchEvent): void {
    const el: HTMLElement = e.currentTarget as HTMLElement
    const ripples: NodeList = el.querySelectorAll('.z-ripple')

    if (ripples.length === 0) return

    const ripple: HTMLElement = ripples[ripples.length - 1] as HTMLElement
    const diff: number = performance.now() - Number(ripple.dataset.activated)
    // 300 => 为动画的持续时间， diff为时间差，如不足300则等待动画结束后再remove
    const delay: number = Math.max(300 - diff, 0)
    setTimeout(() => {
        opacity(ripple, 0)
        setTimeout(() => {
            const parent: Node = ripple.parentNode as Node
            el.contains(parent) && el.removeChild(parent)
        }, 300)
    }, delay)
}

function rippleHoverHidden(e: MouseEvent | TouchEvent): void {
    const el: HTMLElement = e.currentTarget as HTMLElement
    const ripples: NodeList = el.querySelectorAll('.z-ripple')
    const ripple: HTMLElement = ripples[0] as HTMLElement

    const { x, y, radius } = calculate(e)
    transform(ripple, `translate(${x - radius}px,${y - radius}px) scale(0)`)
    setTimeout(() => {
        const parent: Node = ripple.parentNode as Node
        el.contains(parent) && el.removeChild(parent)
    }, 300)
}

export default {
    inserted(
        el: HTMLElement,
        { arg, value = {} }: { arg: string; value: rippleOptions | undefined }
    ) {
        const { position } = getComputedStyle(el)
        if (position === 'static') el.style.position = 'relative'
        const options: rippleOptions = {
            color: value.color
        }

        if (arg !== 'hover') {
            el.addEventListener('mousedown', rippleShow)
            el.addEventListener('mouseup', rippleHidden)
            el.addEventListener('mouseleave', rippleHidden)

            el.addEventListener('touchstart', rippleShow)
            el.addEventListener('touchend', rippleHidden)
        } else {
            el.addEventListener('mouseenter', rippleShow(options))
            el.addEventListener('mouseleave', rippleHoverHidden)
        }
    }
}
