
import RendererWorker from './worker.js?worker&inline'

const canvas: HTMLCanvasElement = document.createElement('CANVAS') as HTMLCanvasElement
canvas.style.width = window.innerWidth + 'px'
canvas.style.height = window.innerHeight + 'px'

const context = canvas.getContext("bitmaprenderer")

let worker = new RendererWorker()
if (worker && window.OffscreenCanvas) {
    

    worker.addEventListener('message', (e)=>{
        if(e.data && context){
          
            canvas.width = e.data.width
            canvas.height = e.data.height

            context.transferFromImageBitmap(e.data);
        }
    })
} else {
    console.error("Workers are not supported with this browser, falling back to main thread rendering")
}

interface RenderParams {
    screenSize?: {
        width: number,
        height: number
    } | null,
    cursor?: [number, number] | null
}

function render(data: RenderParams){
   
    data.screenSize = {
        width: window.innerWidth,
        height: window.innerHeight
    }
    
    worker.postMessage(data)
}

function resizeHandler() {
    const screenSize = {
        width: window.innerWidth,
        height: window.innerHeight
    }

   render({screenSize})
}

function pointerEventHandler(e: PointerEvent) {

    if(!worker) return

    render({cursor: [e.clientX, e.clientY]})

}
/*
function pointerMove(e){
    const [x,y] = [e.clientX, e.clientY]

    const listeners = getHoverListeners()
    
    
    Object.values(listeners).forEach(([size, callback]) => {
        if(x >= size.left && x <= size.right && y >= size.top && y <= size.bottom){
            callback(true)
            document.body.style.cursor = 'pointer'  
        } else {
            callback(false)
            document.body.style.cursor = 'default'
        }
        draw(app)
    })
}
*/
//window.addEventListener('mousemove', pointerMove)
window.addEventListener('pointerdown', pointerEventHandler)
window.addEventListener('resize', resizeHandler)

function init() {

  
   
    document.body.style.margin = 0 + 'px'
    document.body.style.padding = 0 + 'px'
    document.body.style.overflow = 'hidden'


    canvas.style.width = '100%'
    canvas.style.height = '100%'


    document.body.append(canvas)
    render({})


    //createFpsCounter()

}



document.addEventListener("DOMContentLoaded", init)
