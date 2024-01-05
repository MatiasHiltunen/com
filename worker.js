import { draw } from "./canvas.js";
import { Size } from "./size.js";

import appInstance from "./src/app.js";


const offscreenCanvas = new OffscreenCanvas(100,100)
const context = offscreenCanvas.getContext("2d")

let isRendering = false

onmessage = (e) => {


    if(e.data.screenSize && !isRendering){
        isRendering = true
        appInstance.update({
            size: new Size({
                width: e.data.screenSize.width,
                height: e.data.screenSize.height,
            }),
            activeClickPoint: e.data.cursor
        })
    
        draw(appInstance, offscreenCanvas, context)
    
        const bitmap = offscreenCanvas.transferToImageBitmap()
        self.postMessage(bitmap, [bitmap]);
        isRendering = false
      
    }



}
