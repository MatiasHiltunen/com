import { box, text } from "./componentTypes.js"
import { clearListeners, setClickListener } from "./listeners.js"
import { logger } from "./log.js"

import { Size, getScreenSize } from "./size.js"


function createCanvas() {

    const canvas = document.createElement('CANVAS')
    const { x, y } = getScreenSize()
    const dpr = window.devicePixelRatio
    canvas.style.width = x
    canvas.style.height = y
    canvas.width = x * dpr
    canvas.height = y * dpr

    const context = canvas.getContext('2d')

    context.scale(dpr, dpr)
    context.imageSmoothingEnabled = false
    


    return { context, canvas }
}

const { context, canvas } = createCanvas()

export function draw({ children: components }) {
    context.reset()
    context.textRendering = "geometricPrecision";

    const size = getScreenSize()

    canvas.width = size.width
    canvas.height = size.height

    context.clearRect(...size.rectSize)
    context.fillRect(...size.rectSize)

    traverseComponents(components, size, context)

}

function traverseComponents(components, parentSize, ctx) {

    // TODO: Fix later
    const size = parentSize

    const ySegmentCount = components?.length ?? 1

    const ySegmentHeight = size.height / ySegmentCount

    const center = size.getCenter()

    components.forEach((component, i) => {

        if (component?.size) {
            component?.size?.setPosition({
                x: center.x,
                y: ((i + 1) * (ySegmentHeight)) - ySegmentHeight / 2
            })
        }

        if (component.type === text) {
           
            
                        ctx.fillStyle = "white"
                        ctx.font = `${component.fontSize ?? 12}pt serif`
            const textMetrics = ctx.measureText(component.text)

            const textWidth = textMetrics.actualBoundingBoxRight + textMetrics.actualBoundingBoxLeft


            const [left, top, rigth, bottom] = size.bounds
            logger(textMetrics.fontBoundingBoxAscent)
            ctx.fillText(component.text, Math.floor((left + ((rigth - left) / 2)) - textWidth / 2), Math.floor(textMetrics.fontBoundingBoxDescent + top + ((bottom - top) / 2)), Math.floor(rigth - left));

        }


        if (component?.type === box) {
            drawBox(component, ctx)
        }

        if (component?.children) {
            traverseComponents(component.children, component.size, ctx)
        }
    });
}

function drawBox(item, ctx) {
    ctx.clearRect(...item.size.rectSize)
    ctx.fillStyle = item?.fill ?? 'white'
    ctx.fillRect(...item.size.rectSize)

    ctx.strokeStyle = item?.color ?? 'blue'
    ctx.lineWidth = item?.border ?? 2
    ctx.strokeRect(...item.size.rectSize)
}

export default canvas