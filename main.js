

let worker


if (window.Worker && window.OffscreenCanvas) {
    worker = new Worker('worker.js', {
        type: "module"
    })
 
 

    worker.addEventListener('message', (e)=>{
        if(e.data.bitmap){
            canvas.width = e.data.bitmap.width
            canvas.height = e.data.bitmap.height
            canvas.style.width = e.data.bitmap.width
            canvas.style.height = e.data.bitmap.height
            context.transferFromImageBitmap(e.data.bitmap);
        }
    })
} else {
    console.error("Workers are not supported with this browser, falling back to main thread rendering")
}

const canvas = document.createElement('CANVAS')
canvas.style.width = window.innerWidth
canvas.style.height = window.innerHeight

const context = canvas.getContext("bitmaprenderer")

function render(data = {}){
   
    data.screenSize = {
        width: window.innerWidth,
        height: window.innerHeight
    }
    
    worker.postMessage(data)
}

function resizeHandler() {
   render()
}

function pointerEventHandler(e) {

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
window.addEventListener('click', pointerEventHandler)
window.addEventListener('resize', resizeHandler)

function init() {

  
    document.body.style.display = 'flex'
    document.body.style.margin = 0
    document.body.style.padding = 0

    document.body.append(canvas)
    render()


    //createFpsCounter()

}



document.addEventListener("DOMContentLoaded", init)
