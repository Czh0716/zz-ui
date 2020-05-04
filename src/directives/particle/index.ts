import html2canvas from 'html2canvas'
import chance from 'chance'
import './particle.sass'
const chanceInstance = new chance()

class particle {
    private canvasCount: number = 35
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
                const pixelArr = imgData.data
                this.createBlankImageData(imgData)

                for (let i = 0; i < pixelArr.length; i += 4) {
                    let p = Math.floor((i / pixelArr.length) * this.canvasCount)
                    let a = this.imageDataArray[this.weightedRandomDistrib(p)]
                    a[i] = pixelArr[i]
                    a[i + 1] = pixelArr[i + 1]
                    a[i + 2] = pixelArr[i + 2]
                    a[i + 3] = pixelArr[i + 3]
                }

                for (let i = 0; i < this.canvasCount; i++) {
                    let c = this.newCanvasFromImageData(
                        this.imageDataArray[i],
                        canvas.width,
                        canvas.height
                    )
                    c.classList.add('dust')
                    document.body.append(c)
                }

                resolve()
            })
        })
    }
    createBlankImageData(imgData: ImageData) {
        for (let i = 0; i < this.canvasCount; i++) {
            let arr = new Uint8ClampedArray(imgData.data)
            arr = arr.map(() => 0)
            this.imageDataArray.push(arr)
        }
    }
    weightedRandomDistrib(peak: number) {
        const canvasCount = this.canvasCount
        var prob = [],
            seq = []
        for (let i = 0; i < canvasCount; i++) {
            prob.push(Math.pow(canvasCount - Math.abs(peak - i), 3))
            seq.push(i)
        }
        return chanceInstance.weighted(seq, prob)
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
                particle.style.transition = `${800 + index * 110}ms ${index *
                    70}ms cubic-bezier(.91,-0.04,.98,.83)`
                particle.style.transform = `translate3d(100px,-100px,0) rotate(${chanceInstance.integer(
                    { min: -15, max: 15 }
                )}deg)`
                particle.style.opacity = '0'
                particle.style.filter = 'blur(0.8px)'
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
