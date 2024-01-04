import { box, column, text } from "./componentTypes.js"

import { alignCenter, alignStart, getScreenSize, row } from "./size.js"

let offScreenCanvasInUse = false
let worker 



function createCanvas() {

    const canvas = document.createElement('CANVAS')
    const size = getScreenSize()

   

    canvas.style.objectFit = 'contain'

    const dpr = window.devicePixelRatio
  
    /*
    if(window.Worker && window.OffscreenCanvas){    
        offScreenCanvasInUse = true
        worker = new Worker('worker.js')
        console.log("using offscreen canvas with worker")
        const offScreen = canvas.transferControlToOffscreen()   

        worker.postMessage({canvas:offScreen}, [offScreen])
        return {canvas, context:{}}
    } */

    const context = canvas.getContext('2d',{ alpha: false })
 

 
    return { canvas, context }
}

const { canvas, context } = createCanvas()

export function draw(app) {
    

    /*if(offScreenCanvasInUse && worker){
        console.log(size)
        worker.postMessage({app:components, size})
        return
    }*/

    context.reset()


    const dpr = window.devicePixelRatio
    canvas.style.width = app.size.width + 'px'
    canvas.style.height = app.size.height  + 'px'

    canvas.width = app.size.width 
    canvas.height = app.size.height 
    //context.scale(dpr, dpr)
    context.imageSmoothingEnabled = false
    
    context.textRendering = "geometricPrecision";

    context.clearRect(...app.size.rectSize)
    context.fillRect(...app.size.rectSize)
    traverseComponents(app.children, app.size, context)

}



function traverseComponents(components, size, ctx) {

    
    components.forEach((component, i) => {
        
    


        if (component.type === text) {


            ctx.fillStyle = "white"
            ctx.font = `${component.fontSize ?? 12}pt serif`
            const textMetrics = ctx.measureText(component.text)

            const textWidth = textMetrics.actualBoundingBoxRight + textMetrics.actualBoundingBoxLeft

            const [left, top, right, bottom] = size.bounds

            ctx.fillText(component.text, Math.floor((left + ((right - left) / 2)) - textWidth / 2), Math.floor(textMetrics.fontBoundingBoxDescent + top + ((bottom - top) / 2)), Math.floor(right - left));

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


    
    ctx.clearRect(...item.size.rect)
    ctx.fillStyle = item?.fill ?? 'white'
    ctx.fillRect(...item.size.rect)

    ctx.strokeStyle = item?.color ?? 'blue'
    ctx.lineWidth = item?.border ?? 2
    ctx.strokeRect(...item.size.rect)
}

export default canvas