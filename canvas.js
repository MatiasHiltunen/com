import { box, text } from "./componentTypes.js"

import { alignCenter, alignStart, getScreenSize, row } from "./size.js"


function createCanvas() {

    const canvas = document.createElement('CANVAS')
    const size = getScreenSize()

   
    canvas.style.width = size.width + 'px'
    canvas.style.height = size.height + 'px'
    canvas.style.objectFit = 'contain'

    const dpr = window.devicePixelRatio
    canvas.width = size.width * dpr
    canvas.height = size.height * dpr
    
    const context = canvas.getContext('2d',{ alpha: false })
    context.scale(dpr, dpr)
    context.imageSmoothingEnabled = false
    
    context.textRendering = "geometricPrecision";
    return { canvas, context }
}

const { canvas, context } = createCanvas()

export function draw({ children: components }) {

    context.reset()

    const size = getScreenSize()

    const dpr = window.devicePixelRatio
    canvas.width = size.width * dpr
    canvas.height = size.height * dpr
    context.scale(dpr, dpr)


    context.clearRect(...size.rectSize)
    context.fillRect(...size.rectSize)

    traverseComponents(components, size, context)

}

function traverseComponents(components, parentSize, ctx) {

    // TODO: Fix later
    const size = parentSize

  

    const childCount = components?.length
    const childSegmentHeight = size.direction === row ? size.width / childCount : size.height / childCount
    
    let offset = 0
    const center = size.getCenter()
    
    components.forEach((component, i) => {
        
        if (component?.size) {

            
            if(size.alingOnAxisY === alignCenter){
                
                const pos = size.direction === row ?
                {
                    x: (((i + 1) * (childSegmentHeight)) - childSegmentHeight / 2) + size.left,
                    y: center.y + size.top 
                }
                : {
                    x: center.x + size.left,
                    y: (((i + 1) * (childSegmentHeight)) - childSegmentHeight / 2) + size.top 
                }

                component?.size?.setPosition(pos)
            } else if(size.alingOnAxisY === alignStart){
                
                offset += size.direction === row ? component.size.width : component.size.height
                
                const pos = size.direction === row ?
                {
                    x: offset + size.left,
                    y: center.y + size.top 
                } 
                
                : {
                    x: center.x + size.left,
                    y: offset + size.top 
                }
                
                component?.size?.setPosition(pos)
                
            }
        }

        if (component.type === text) {


            ctx.fillStyle = "white"
            ctx.font = `${component.fontSize ?? 12}pt serif`
            const textMetrics = ctx.measureText(component.text)

            const textWidth = textMetrics.actualBoundingBoxRight + textMetrics.actualBoundingBoxLeft

            const [left, top, rigth, bottom] = size.bounds

            ctx.fillText(component.text, Math.floor((left + ((rigth - left) / 2)) - textWidth / 2), Math.floor(textMetrics.fontBoundingBoxDescent + top + ((bottom - top) / 2)), Math.floor(rigth - left));

        }


        if (component?.type === box) {
            drawRounded(component, ctx)
        }

        if (component?.children) {
            traverseComponents(component.children, component.size, ctx)
        }
    });
}

function drawRounded(item, ctx){
   /*  ctx.clearRect(...item.size.rectSize) */

    ctx.beginPath();
    ctx.roundRect(...item.size.rectSize, [10, 10, 10, 10]);

    ctx.fillStyle = item?.fill ?? 'white'
    ctx.fill();
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