
import canvas, { draw } from "./canvas.js"
import { getClickListeners } from "./listeners.js"
import { logger } from "./log.js"
import {app} from './src/app.js'

function resizeHandler(){
    draw(app)
}

function pointerEventHandler(e){
   
    const [x,y] = [e.clientX, e.clientY]

    getClickListeners().forEach(([id, size, callback]) => {
        if(size.hasPoint({x,y})){
            callback()           
        }
    })

    draw(app)
}

window.addEventListener('resize', resizeHandler)
window.addEventListener('click', pointerEventHandler)

function init(){
    document.body.style.display = 'flex'
    document.body.style.margin = 0
    document.body.style.padding = 0

    document.body.append(canvas)

    logger(app)
    draw(app)
}

document.addEventListener("DOMContentLoaded", init)
