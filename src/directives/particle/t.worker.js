import { fill } from 'lodash'
import chance from 'chance'
const chanceInstance = new chance()
addEventListener('message', e => {
    let { canvasCount, imageDataArray, imgData } = e.data
    const pixelArr = imgData.data

    function weightedRandomDistrib(peak) {
        var prob = [],
            seq = []
        for (let i = 0; i < canvasCount; i++) {
            prob.push(Math.pow(canvasCount - Math.abs(peak - i), 3))
            seq.push(i)
        }
        return chanceInstance.weighted(seq, prob)
    }

    for (let i = 0; i < pixelArr.length; i += 4) {
        let p = Math.floor((i / pixelArr.length) * canvasCount)
        let a = imageDataArray[weightedRandomDistrib(p)]
        a[i] = pixelArr[i]
        a[i + 1] = pixelArr[i + 1]
        a[i + 2] = pixelArr[i + 2]
        a[i + 3] = pixelArr[i + 3]
    }
    postMessage(imageDataArray)
    close()
})
