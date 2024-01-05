import { draw } from "./canvas.js";

import { getClickListeners } from "./listeners.js";
import { Size } from "./size.js";

import appInstance from "./src/app.js";


const offscreenCanvas = new OffscreenCanvas(100,100)
const context = offscreenCanvas.getContext("2d")
let previousSize = null


function pointerEventHandler([x,y]) {


    const listeners = getClickListeners()


    Object.values(listeners).forEach(([size, callback]) => {
        if (x >= size.left && x <= size.right && y >= size.top && y <= size.bottom) {
            callback()
       
        }
    })

}


function render({width, height}){
  


    appInstance.update({
        size: new Size({
            width,
            height,
        })
    })

    draw(appInstance, offscreenCanvas, context)

    const bitmap = offscreenCanvas.transferToImageBitmap()
    self.postMessage({bitmap:bitmap}, null, [bitmap]);

   
}

onmessage = (e) => {


    if(e.data.screenSize){
        appInstance.update({
            size: new Size({
                width: e.data.screenSize.width,
                height: e.data.screenSize.height,
            }),
            activeClickPoint: e.data.cursor
        })
    
        draw(appInstance, offscreenCanvas, context)
    
        const bitmap = offscreenCanvas.transferToImageBitmap()
        self.postMessage({bitmap:bitmap}, null, [bitmap]);
    }



}
