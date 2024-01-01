
import canvas, { draw } from "./canvas.js"
import { getClickListeners } from "./listeners.js"
import { logger } from "./log.js"
import { Size } from "./size.js"



let app = {
    children: [
        {
            type: 'box',
            fill: 'white',
            color: 'green',
            border: 2,
            size: new Size({width: 100, height: 50}),
            onClick(){
                logger("CLICCCK")
          
                app.children[0].color = 'blue'
                app.children[0].size = new Size({width: 200, height: 100})

            },
            children: [
                {
                    type: 'text',
                    text: 'eka nappi!'
                }
            ]
        },
        {
            type: 'box',
            fill: 'white',
            color: 'red',
            border: 1,
            state: {
                clickCount: 0
            },
            size: new Size({width: 100, height: 50}),
               onClick(){
                
                if(app.children[1].state.clickCount % 2 === 0){

                    
                    app.children[1].color = 'blue'
                    app.children[1].fill = 'black'
                } else {
                    app.children[1].color = 'red'
                    app.children[1].fill = 'white'

                }
                app.children[1].state.clickCount++
                
                logger("CLICCCK", app.children[1].state.clickCount)
            },
            children: [
                {
                    type: 'text',
                    text: 'eka nappi!'
                }
            ]
        }
    ]
}


function resizeHandler(){
    
 

    draw(app)
}



function pointerEventHandler(e){
   
    const [x,y] = [e.clientX, e.clientY]

    getClickListeners().forEach(([size, callback]) => {
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
    draw(app)
}

document.addEventListener("DOMContentLoaded", init)
