
import canvas, { draw } from "./canvas.js"
import { getClickListeners, getHoverListeners } from "./listeners.js"
import { logger } from "./log.js"
import App from './src/app.js'



function resizeHandler(){
    App.update()
    draw(App)
}

function pointerEventHandler(e){
   
    const [x,y] = [e.clientX, e.clientY]

    const listeners = getClickListeners()
    
    
    Object.values(listeners).forEach(([size, callback]) => {
        if(x >= size.left && x <= size.right && y >= size.top && y <= size.bottom){
            callback()           
            App.update()
            draw(App)
        }
    })

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

function init(){
    document.body.style.display = 'flex'
    document.body.style.margin = 0
    document.body.style.padding = 0

    document.body.append(canvas)
    draw(App)
    
    logger(App)

    //createFpsCounter()
   
}

document.addEventListener("DOMContentLoaded", init)
