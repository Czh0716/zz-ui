import html2canvas from 'html2canvas'
import chance from 'chance'
import './particle.sass'
const chanceInstance = new chance()
import worker from './t.worker.js'
const myWorker = new worker()

function setStyle(el: HTMLElement, style: { [key: string]: any }) {
    for (const key in style) {
        el.style[key as any] = style[key]
    }
}

class particle {
    private canvasCount: number = 32
    private status!: boolean
    private el: HTMLElement
    private imageDataArray: any[] = []
    private position: DOMRect
    private particles: HTMLCanvasElement[] = []
    private TRANSITION_DURATION: number = 1200
    private TRANSITION_DELAY: number = 1500

    constructor(el: HTMLElement) {
        this.el = el
        this.position = el.getBoundingClientRect()
    }

    init() {
        return new Promise(resolve => {
            html2canvas(this.el, {
                scale: 1,
                backgroundColor: null
            }).then((canvas: HTMLCanvasElement) => {
                const ctx: CanvasRenderingContext2D = canvas.getContext(
                    '2d'
                ) as CanvasRenderingContext2D
                const { width, height } = canvas
                const imgData = ctx.getImageData(0, 0, width, height)

                //创建空图像数据数组
                for (let i = 0; i < this.canvasCount; i++) {
                    this.imageDataArray.push(
                        ctx.createImageData(width, height).data
                    )
                }

                myWorker.postMessage({
                    canvasCount: this.canvasCount,
                    imageDataArray: this.imageDataArray,
                    imgData
                })
                myWorker.addEventListener('message', (e: MessageEvent) => {
                    const imageDataArray = e.data
                    const cs = []
                    for (let i = 0; i < this.canvasCount; i++) {
                        let c = this.newCanvasFromImageData(
                            imageDataArray[i],
                            width,
                            height
                        )
                        c.classList.add('dust')
                        cs.push(c)
                    }
                    document.body.append(...cs)
                    resolve()
                })
            })
        })
    }
    newCanvasFromImageData(arr: Uint8ClampedArray, w: number, h: number) {
        const canvas = document.createElement('canvas')
        const { left, top } = this.position
        canvas.width = w
        canvas.height = h
        canvas.style.left = `${left}px`
        canvas.style.top = `${top}px`
        let tempCtx = canvas.getContext('2d') as CanvasRenderingContext2D
        tempCtx.putImageData(new ImageData(arr, w, h), 0, 0)
        this.particles.push(canvas)
        return canvas
    }
    leave() {
        const LENGTH = this.particles.length
        const TOTAL_DURATION = this.TRANSITION_DURATION + this.TRANSITION_DELAY
        const el = this.el

        this.particles.forEach((particle, index) => {
            setTimeout(() => {
                setStyle(particle, {
                    transition: `${this.TRANSITION_DURATION}ms ${(index /
                        LENGTH) *
                        this
                            .TRANSITION_DELAY}ms cubic-bezier(.91,-0.04,.98,.83)`,
                    transform: `translate(100px,-100px) rotate(${chanceInstance.integer(
                        { min: -15, max: 15 }
                    )}deg)`,
                    opacity: '0',
                    filter: 'blur(0.8px)'
                })
            }, 0)
        })

        el.classList.add('particle-leave-to', 'particle-leave-active')
        setTimeout(() => {
            el.classList.remove('particle-leave-to', 'particle-leave-active')
            el.style.display = 'none'
            this.clearParticles()
        }, TOTAL_DURATION)
    }
    clearParticles() {
        this.particles.forEach(particle => {
            document.body.removeChild(particle)
        })
    }
}
export default {
    inserted(el: HTMLElement, { value }: { value: boolean }) {
        el.style.display = value ? '' : 'none'
        el.dataset.show = 'true'
    },
    async update(el: HTMLElement, { value }: { value: boolean }) {
        if (el.dataset.show === value.toString()) return
        el.dataset.show = value.toString()
        if (value) {
            el.style.display = ''
        } else {
            const particleInstance = new particle(el)
            await particleInstance.init()
            particleInstance.leave()
        }
    }
}
