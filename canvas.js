import { box, text } from "./componentTypes.js"

export function draw(app, canvas, context) {
    
    



    canvas.width = app.size.width 
    canvas.height = app.size.height 

    context.imageSmoothingEnabled = false
    
    context.textRendering = "geometricPrecision";

    context.clearRect(...app.size.rectSize)
    context.fillRect(...app.size.rectSize)
    traverseComponents(app.children, app.size, context)

}


export function traverseComponents(components, size, ctx) {

    
    components.forEach((component, i) => {
        
        if (component.type === text) {

            console.log("text",component.text)

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

