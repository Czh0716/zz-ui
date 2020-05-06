import html2canvas from 'html2canvas'
import chance from 'chance'
import SWorker from 'simple-web-worker'
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
    private canvasCount: number = 25
    private el: HTMLElement
    private imageDataArray: any[] = []
    private position: DOMRect
    private particles: HTMLCanvasElement[] = []

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
                const imgData = ctx.getImageData(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                )
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
                            canvas.width,
                            canvas.height
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
        this.particles.forEach((particle, index) => {
            setTimeout(() => {
                setStyle(particle, {
                    transition: `${800 + index * 110}ms ${index *
                        70}ms cubic-bezier(.91,-0.04,.98,.83)`,
                    transform: `translate3d(100px,-100px,0) rotate(${chanceInstance.integer(
                        { min: -15, max: 15 }
                    )}deg)`,
                    opacity: '0',
                    filter: 'blur(0.8px)'
                })
            }, 0)
        })
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
    },
    async update(el: HTMLElement, { value }: { value: boolean }) {
        const delay: number = 7000
        if (value) {
            el.style.display = ''
        } else {
            const particleInstance = new particle(el)
            await particleInstance.init()
            particleInstance.leave()
            el.classList.add('particle-leave-to', 'particle-leave-active')
            setTimeout(() => {
                el.classList.remove(
                    'particle-leave-to',
                    'particle-leave-active'
                )
                el.style.display = 'none'
                particleInstance.clearParticles()
            }, delay)
        }
    }
}
